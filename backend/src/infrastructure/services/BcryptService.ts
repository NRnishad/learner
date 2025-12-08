import bcrypt from 'bcryptjs';
import {IPasswordService} from '../../application/interfaces/IPasswordService';


export class BcryptService implements IPasswordService{
    async hash(passeord:string):Promise<string>{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(passeord,salt);
    }
    async compare(plainText:string, hashed:string):Promise<boolean>{
        return await bcrypt.compare(plainText,hashed);
}
}