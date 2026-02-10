"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// In-memory data store for users
// WARNING: Data will be lost when the server restarts
const defaultPasswordHash = bcryptjs_1.default.hashSync('admin123', 10);
const users = [
    {
        _id: '1',
        username: 'Admin',
        email: 'admin@gmail.com',
        password: defaultPasswordHash,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
class User {
    constructor(data) {
        this._id = data._id;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
    }
    matchPassword(enteredPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(enteredPassword, this.password);
        });
    }
    static findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = users.find((u) => u.email === query.email);
            return user ? new User(user) : null;
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verify unique email
            if (users.find(u => u.email === data.email)) {
                throw new Error('User already exists');
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(data.password, salt);
            const newUser = {
                _id: Math.random().toString(36).substr(2, 9),
                username: data.username,
                email: data.email,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            users.push(newUser);
            return new User(newUser);
        });
    }
}
exports.default = User;
