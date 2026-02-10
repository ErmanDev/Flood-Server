import bcrypt from 'bcryptjs';

// In-memory data store for users
// WARNING: Data will be lost when the server restarts
const defaultPasswordHash = bcrypt.hashSync('admin123', 10);

const users: any[] = [
    {
        _id: '1',
        username: 'Admin',
        email: 'admin@gmail.com',
        firstName: 'System',
        lastName: 'Admin',
        phone: '123-456-7890',
        address: '123 Admin St, City, Country',
        profileImage: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Sunglasses&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=Hoodie&clotheColor=Red&eyeType=Happy&eyebrowType=Default&mouthType=Default&skinColor=Light',
        status: 'Verified',
        password: defaultPasswordHash,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

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
        const user = users.find((u) =>
            (query.email && u.email === query.email) ||
            (query.username && u.username === query.username)
        );
        return user ? new User(user) : null;
    }

    static async findAll(): Promise<User[]> {
        return users.map(user => new User(user));
    }

    static async create(data: { username: string; email: string; password: string; firstName?: string; lastName?: string; phone?: string; address?: string; profileImage?: string }): Promise<User> {
        // Verify unique email
        if (users.find(u => u.email === data.email)) {
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const newUser = {
            _id: Math.random().toString(36).substr(2, 9),
            username: data.username,
            email: data.email,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            phone: data.phone || '',
            address: data.address || '',
            profileImage: data.profileImage || '',
            status: 'Pending Verification',
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        users.push(newUser);
        return new User(newUser);
    }
    static async findById(id: string): Promise<User | null> {
        const user = users.find((u) => u._id === id);
        return user ? new User(user) : null;
    }

    static async updateStatus(id: string, status: string): Promise<User | null> {
        const userIndex = users.findIndex((u) => u._id === id);
        if (userIndex === -1) return null;

        users[userIndex].status = status;
        users[userIndex].updatedAt = new Date();

        return new User(users[userIndex]);
    }
}

export default User;
