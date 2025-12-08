import {Request,Response} from 'express'
import{RegisterUser} from '../../application/use-cases/RegisterUser'
import {User} from '../../domain/entities/User';

export class AuthController{
    constructor(private registerUserUseCase: RegisterUser){}
    async register(req:Request,res:Response){
        try{
            const userRequest : User = req.body;
            const result = await this.registerUserUseCase.execute(userRequest)
            return res.status(201).json({
                message:'user registered successfully',
                data:result
            })
        }catch(error:any){
            return res.status(400).json({error: error.message })   
        
        }
    }


}