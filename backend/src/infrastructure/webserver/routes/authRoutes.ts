import { Router } from "express";
import { AuthController } from "../../../presentation/controllers/AuthController";
import { RegisterUser } from "../../../application/use-cases/RegisterUser";
import { MongoUserRepository } from "../../repositories/MongoUserRepository";
import { BcryptServece } from "../../services/BcryptService";


const authRoutes = Router();

const repository = new MongoUserRepository();
const passwordService = new BcryptServece();
const useCase = new RegisterUser(repository,passwordService);
const controller = new AuthController(useCase);


authRoutes.post('/register', (req, res) => controller.register(req, res));

export default authRoutes;