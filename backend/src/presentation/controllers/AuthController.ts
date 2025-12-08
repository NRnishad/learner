import {Request,Response} from 'express'
import{RegisterUser} from '../../application/use-cases/RegisterUser'
import {User} from '../../domain/entities/User';
import { LoginUser } from "../../application/use-cases/LoginUser";

export class AuthController{
    constructor(
        private registerUserUseCase: RegisterUser,
        private loginUserUseCase: LoginUser
    ){}
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

    async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await this.loginUserUseCase.execute(email, password);

      // Set token in HTTP-Only Cookie (More secure than sending in body)
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only https in prod
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      return res.status(200).json({
        message: "Login successful",
        user: result.user,
        token: result.token, // Optional: Send in body if you prefer LocalStorage on frontend
      });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
        


}