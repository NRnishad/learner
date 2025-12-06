import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { UserModel } from "../database/models/UserModel";

export class MongoUserRepository implements IUserRepository {
    async create(user: User): Promise<User> {
        const newUser = new UserModel(user);
        const savedUser = await newUser.save();
        return {
            id: savedUser._id.toString(),
            name: savedUser.name,
            email: savedUser.email, 
            role: savedUser.role,
            isVerified: savedUser.isVerified,
            createdAt: savedUser.createdAt,
        }
    }
}