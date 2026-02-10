import { getConnection } from '../config/db';

interface ISensorReading {
    _id: string;
    distance: number | null;
    distance_ft: number | null;
    water_level_cm: number | null;
    water_level_ft: number | null;
    timestamp: Date;
    source: string;
    server_timestamp: Date | null;
}

class SensorReading {
    static async find(query: any = {}, options: any = {}): Promise<ISensorReading[]> {
        const connection = getConnection();
        let sql = 'SELECT * FROM sensor_readings';
        const values: any[] = [];
        let paramCount = 1;
        
        sql += ' ORDER BY timestamp DESC';
        
        if (options.limit) {
            sql += ` LIMIT $${paramCount}`;
            values.push(options.limit);
        }
        
        const result = await connection.query(sql, values);
        return result.rows.map((row: any) => ({
            _id: row._id,
            distance: row.distance ? parseFloat(row.distance) : null,
            distance_ft: row.distance_ft ? parseFloat(row.distance_ft) : null,
            water_level_cm: row.water_level_cm ? parseFloat(row.water_level_cm) : null,
            water_level_ft: row.water_level_ft ? parseFloat(row.water_level_ft) : null,
            timestamp: row.timestamp,
            source: row.source || 'sensor',
            server_timestamp: row.server_timestamp
        }));
    }

    static async findOne(query: any = {}, options: any = {}): Promise<ISensorReading | undefined> {
        const connection = getConnection();
        const result = await connection.query(
            'SELECT * FROM sensor_readings ORDER BY timestamp DESC LIMIT 1'
        );
        
        if (result.rows.length === 0) {
            return undefined;
        }
        
        const row = result.rows[0];
        return {
            _id: row._id,
            distance: row.distance ? parseFloat(row.distance) : null,
            distance_ft: row.distance_ft ? parseFloat(row.distance_ft) : null,
            water_level_cm: row.water_level_cm ? parseFloat(row.water_level_cm) : null,
            water_level_ft: row.water_level_ft ? parseFloat(row.water_level_ft) : null,
            timestamp: row.timestamp,
            source: row.source || 'sensor',
            server_timestamp: row.server_timestamp
        };
    }

    static async create(data: any): Promise<ISensorReading> {
        const connection = getConnection();
        const _id = Math.random().toString(36).substr(2, 9);
        
        await connection.query(
            `INSERT INTO sensor_readings (_id, distance, distance_ft, water_level_cm, water_level_ft, source, server_timestamp)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
                _id,
                data.distance || null,
                data.distance_ft || null,
                data.water_level_cm || null,
                data.water_level_ft || null,
                data.source || 'sensor',
                new Date()
            ]
        );
        
        const result = await connection.query('SELECT * FROM sensor_readings WHERE _id = $1', [_id]);
        const row = result.rows[0];
        return {
            _id: row._id,
            distance: row.distance ? parseFloat(row.distance) : null,
            distance_ft: row.distance_ft ? parseFloat(row.distance_ft) : null,
            water_level_cm: row.water_level_cm ? parseFloat(row.water_level_cm) : null,
            water_level_ft: row.water_level_ft ? parseFloat(row.water_level_ft) : null,
            timestamp: row.timestamp,
            source: row.source || 'sensor',
            server_timestamp: row.server_timestamp
        };
    }

    static async countDocuments(): Promise<number> {
        const connection = getConnection();
        const result = await connection.query('SELECT COUNT(*) as count FROM sensor_readings');
        return parseInt(result.rows[0].count);
    }
}

export default SensorReading;
