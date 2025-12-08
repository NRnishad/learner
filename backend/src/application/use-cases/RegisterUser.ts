import {User} from '../../domain/entities/User';
import {IUserRepository} from '../../domain/repositories/IUserRepository';
import { IPasswordService } from '../interfaces/IPasswordService';


export class RegisterUser{
    constructor(
        private userRepository:IUserRepository,
        private passwordService:IPasswordService
    ){}

    async execute(userData:User):Promise<User>{
        const existingUser = await this.userRepository.findByEmail(userData.email)
        if(existingUser){
            throw new Error('Email already registered');
        }
        if(userData.password){
            userData.password = await this.passwordService.hash(userData.password);
        }

        const newUser = await this.userRepository.create(userData);
        return newUser;

    }

    
}