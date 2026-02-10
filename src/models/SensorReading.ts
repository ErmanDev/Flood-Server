
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

// In-memory store with some history
const readings: ISensorReading[] = [];

class SensorReading {
    static async find(query: any = {}, options: any = {}): Promise<ISensorReading[]> {
        let result = [...readings];
        // sort desc
        result.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

        if (options.limit) {
            result = result.slice(0, options.limit);
        }
        return result;
    }

    static async findOne(query: any = {}, options: any = {}): Promise<ISensorReading | undefined> {
        // e.g. sort: { timestamp: -1 }
        const sorted = [...readings].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        return sorted[0];
    }

    static async create(data: any): Promise<ISensorReading> {
        const newReading: ISensorReading = {
            _id: Math.random().toString(36).substr(2, 9),
            distance: data.distance,
            distance_ft: data.distance_ft,
            water_level_cm: data.water_level_cm,
            water_level_ft: data.water_level_ft,
            timestamp: new Date(),
            source: data.source || 'sensor',
            server_timestamp: new Date()
        };
        readings.unshift(newReading); // add to start
        if (readings.length > 1000) readings.pop(); // limit size
        return newReading;
    }

    static async countDocuments(): Promise<number> {
        return readings.length;
    }
}

export default SensorReading;
