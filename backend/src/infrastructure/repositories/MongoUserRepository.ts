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

    async findByEmail(email:string):Promise<User|null>{
        const user = await UserModel.findOne({email})
        if(!user) return null;
        return{
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            isVerified: user.isVerified,
            createdAt: user.createdAt
            
        }
    }



    async findById(id:string):Promise<User|null>{
        const user = await UserModel.findById(id)
        if(!user) return null;
        return user as unknown as User
}
}