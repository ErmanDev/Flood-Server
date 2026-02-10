import { getConnection } from '../config/db';

interface ILog {
    _id: string;
    type: 'sensor' | 'user_action' | 'system_event';
    data: any;
    timestamp: Date;
    source: string | null;
}

class Log {
    static async find(query: any = {}, options: any = {}): Promise<ILog[]> {
        const connection = getConnection();
        let sql = 'SELECT * FROM logs';
        const values: any[] = [];
        let paramCount = 1;
        
        if (query.type) {
            sql += ` WHERE type = $${paramCount}`;
            values.push(query.type);
            paramCount++;
        }
        
        sql += ' ORDER BY timestamp DESC';
        
        if (options.limit) {
            sql += ` LIMIT $${paramCount}`;
            values.push(options.limit);
            paramCount++;
            
            if (options.skip) {
                sql += ` OFFSET $${paramCount}`;
                values.push(options.skip);
            }
        }
        
        const result = await connection.query(sql, values);
        return result.rows.map((row: any) => ({
            _id: row._id,
            type: row.type,
            data: row.data,
            timestamp: row.timestamp,
            source: row.source
        }));
    }

    static async findOne(query: any): Promise<ILog | undefined> {
        const connection = getConnection();
        const result = await connection.query('SELECT * FROM logs WHERE _id = $1', [query._id]);
        
        if (result.rows.length === 0) {
            return undefined;
        }
        
        const row = result.rows[0];
        return {
            _id: row._id,
            type: row.type,
            data: row.data,
            timestamp: row.timestamp,
            source: row.source
        };
    }

    static async create(data: any): Promise<ILog> {
        const connection = getConnection();
        const _id = Math.random().toString(36).substr(2, 9);
        
        await connection.query(
            `INSERT INTO logs (_id, type, data, source)
             VALUES ($1, $2, $3, $4)`,
            [_id, data.type, JSON.stringify(data.data), data.source || null]
        );
        
        const result = await connection.query('SELECT * FROM logs WHERE _id = $1', [_id]);
        const row = result.rows[0];
        return {
            _id: row._id,
            type: row.type,
            data: row.data,
            timestamp: row.timestamp,
            source: row.source
        };
    }

    static async deleteMany(query: any = {}): Promise<any> {
        const connection = getConnection();
        
        if (Object.keys(query).length === 0) {
            const countResult = await connection.query('SELECT COUNT(*) as count FROM logs');
            const count = parseInt(countResult.rows[0].count);
            await connection.query('DELETE FROM logs');
            return { deletedCount: count };
        }
        
        return { deletedCount: 0 };
    }

    static async countDocuments(query: any = {}): Promise<number> {
        const connection = getConnection();
        let sql = 'SELECT COUNT(*) as count FROM logs';
        const values: any[] = [];
        let paramCount = 1;
        
        if (query.type) {
            sql += ` WHERE type = $${paramCount}`;
            values.push(query.type);
        }
        
        const result = await connection.query(sql, values);
        return parseInt(result.rows[0].count);
    }
}

export default Log;
