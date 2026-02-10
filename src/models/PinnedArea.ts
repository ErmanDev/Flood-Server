import { getConnection } from '../config/db';

interface IPinnedArea {
    _id: string;
    latitude: number;
    longitude: number;
    address: string | null;
    timestamp: Date;
    userId: string | null;
}

class PinnedArea {
    static async find(query: any = {}): Promise<IPinnedArea[]> {
        const connection = getConnection();
        const result = await connection.query('SELECT * FROM pinned_areas ORDER BY timestamp DESC');
        return result.rows.map((row: any) => ({
            _id: row._id,
            latitude: parseFloat(row.latitude),
            longitude: parseFloat(row.longitude),
            address: row.address,
            timestamp: row.timestamp,
            userId: row.userId
        }));
    }

    static async create(data: any): Promise<IPinnedArea> {
        const connection = getConnection();
        const _id = Math.random().toString(36).substr(2, 9);
        
        await connection.query(
            `INSERT INTO pinned_areas (_id, latitude, longitude, address, "userId")
             VALUES ($1, $2, $3, $4, $5)`,
            [_id, data.latitude, data.longitude, data.address || null, data.userId || null]
        );
        
        const result = await connection.query('SELECT * FROM pinned_areas WHERE _id = $1', [_id]);
        const row = result.rows[0];
        return {
            _id: row._id,
            latitude: parseFloat(row.latitude),
            longitude: parseFloat(row.longitude),
            address: row.address,
            timestamp: row.timestamp,
            userId: row.userId
        };
    }

    static async findByIdAndDelete(id: string): Promise<IPinnedArea | null> {
        const connection = getConnection();
        const result = await connection.query('SELECT * FROM pinned_areas WHERE _id = $1', [id]);
        
        if (result.rows.length === 0) {
            return null;
        }
        
        await connection.query('DELETE FROM pinned_areas WHERE _id = $1', [id]);
        const row = result.rows[0];
        return {
            _id: row._id,
            latitude: parseFloat(row.latitude),
            longitude: parseFloat(row.longitude),
            address: row.address,
            timestamp: row.timestamp,
            userId: row.userId
        };
    }

    static async countDocuments(): Promise<number> {
        const connection = getConnection();
        const result = await connection.query('SELECT COUNT(*) as count FROM pinned_areas');
        return parseInt(result.rows[0].count);
    }
}

export default PinnedArea;
