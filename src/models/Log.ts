
interface ILog {
    _id: string;
    type: 'sensor' | 'user_action' | 'system_event';
    data: any;
    timestamp: Date;
    source: string | null;
}

// In-memory data store for logs - initially empty
const logs: ILog[] = [];

class Log {
    static async find(query: any = {}, options: any = {}): Promise<ILog[]> {
        let result = [...logs];
        // simple filtering mock
        if (query.type) {
            result = result.filter(l => l.type === query.type);
        }
        // sort by timestamp desc by default for logs
        result.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

        if (options.limit) {
            const skip = options.skip || 0;
            result = result.slice(skip, skip + options.limit);
        }

        return result;
    }

    static async findOne(query: any): Promise<ILog | undefined> {
        return logs.find(l => l._id === query._id);
    }

    static async create(data: any): Promise<ILog> {
        const newLog: ILog = {
            _id: Math.random().toString(36).substr(2, 9),
            type: data.type,
            data: data.data,
            timestamp: new Date(),
            source: data.source || null
        };
        logs.push(newLog);
        return newLog;
    }

    static async deleteMany(query: any = {}): Promise<any> {
        if (Object.keys(query).length === 0) {
            const count = logs.length;
            logs.length = 0; // Clear array
            return { deletedCount: count };
        }
        return { deletedCount: 0 };
    }

    static async countDocuments(query: any = {}): Promise<number> {
        return logs.length;
    }
}

export default Log;
