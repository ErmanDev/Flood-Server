
interface IPinnedArea {
    _id: string;
    latitude: number;
    longitude: number;
    address: string | null;
    timestamp: Date;
    userId: string | null;
}

// In-memory data store
const pinnedAreas: IPinnedArea[] = [];

class PinnedArea {
    static async find(query: any = {}): Promise<IPinnedArea[]> {
        return pinnedAreas;
    }

    static async create(data: any): Promise<IPinnedArea> {
        const newArea: IPinnedArea = {
            _id: Math.random().toString(36).substr(2, 9),
            latitude: data.latitude,
            longitude: data.longitude,
            address: data.address || null,
            timestamp: new Date(),
            userId: data.userId || null
        };
        pinnedAreas.push(newArea);
        return newArea;
    }

    static async findByIdAndDelete(id: string): Promise<IPinnedArea | null> {
        const index = pinnedAreas.findIndex(p => p._id === id);
        if (index !== -1) {
            const deleted = pinnedAreas[index];
            pinnedAreas.splice(index, 1);
            return deleted;
        }
        return null;
    }

    static async countDocuments(): Promise<number> {
        return pinnedAreas.length;
    }
}

export default PinnedArea;
