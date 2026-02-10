import bcrypt from 'bcryptjs';
import { getConnection } from '../config/db';

class User {
    _id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    profileImage: string;
    status: 'Verified' | 'Pending Verification' | 'Rejected';
    password: string;

    constructor(data: any) {
        this._id = data._id;
        this.username = data.username;
        this.email = data.email;
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.phone = data.phone || '';
        this.address = data.address || '';
        this.profileImage = data.profileImage || '';
        this.status = data.status || 'Pending Verification';
        this.password = data.password;
    }

    async matchPassword(enteredPassword: string): Promise<boolean> {
        return await bcrypt.compare(enteredPassword, this.password);
    }

    static async findOne(query: { email?: string; username?: string }): Promise<User | null> {
        const connection = getConnection();
        let sql = 'SELECT * FROM users WHERE ';
        const conditions: string[] = [];
        const values: any[] = [];
        let paramCount = 1;
        
        if (query.email) {
            conditions.push(`email = $${paramCount}`);
            values.push(query.email);
            paramCount++;
        }
        if (query.username) {
            conditions.push(`username = $${paramCount}`);
            values.push(query.username);
            paramCount++;
        }
        
        sql += conditions.join(' OR ');
        
        const result = await connection.query(sql, values);
        return result.rows.length > 0 ? new User(result.rows[0]) : null;
    }

    static async findAll(): Promise<User[]> {
        const connection = getConnection();
        const result = await connection.query('SELECT * FROM users');
        return result.rows.map((row: any) => new User(row));
    }

    static async create(data: { username: string; email: string; password: string; firstName?: string; lastName?: string; phone?: string; address?: string; profileImage?: string }): Promise<User> {
        const connection = getConnection();
        
        // Check if user exists
        const existing = await User.findOne({ email: data.email });
        if (existing) {
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        const _id = Math.random().toString(36).substr(2, 9);

        await connection.query(
            `INSERT INTO users (_id, username, email, password, "firstName", "lastName", phone, address, "profileImage", status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [_id, data.username, data.email, hashedPassword, data.firstName || '', data.lastName || '', data.phone || '', data.address || '', data.profileImage || '', 'Pending Verification']
        );

        return await User.findOne({ email: data.email }) as User;
    }

    static async findById(id: string): Promise<User | null> {
        const connection = getConnection();
        const result = await connection.query('SELECT * FROM users WHERE _id = $1', [id]);
        return result.rows.length > 0 ? new User(result.rows[0]) : null;
    }

    static async updateStatus(id: string, status: string): Promise<User | null> {
        const connection = getConnection();
        await connection.query('UPDATE users SET status = $1 WHERE _id = $2', [status, id]);
        return await User.findById(id);
    }
}

export default User;
