import { Router } from "express";
import { AuthController } from "../../../presentation/controllers/AuthController";
import { RegisterUser } from "../../../application/use-cases/RegisterUser";
import { LoginUser } from "../../../application/use-cases/LoginUser"; 
import { MongoUserRepository } from "../../repositories/MongoUserRepository";
import { BcryptService } from "../../services/BcryptService";
import { JwtService } from "../../services/JwtService"; 

const authRouter = Router();

// --- Dependency Injection ---
const repository = new MongoUserRepository();
const passwordService = new BcryptService();
const tokenService = new JwtService(); // Initialize

// Initialize Use Cases
const registerUseCase = new RegisterUser(repository, passwordService);
const loginUseCase = new LoginUser(repository, passwordService, tokenService); // Inject all 3

// Initialize Controller
const controller = new AuthController(registerUseCase, loginUseCase);

// --- Routes ---
authRouter.post("/register", (req, res) => controller.register(req, res));
authRouter.post("/login", (req, res) => controller.login(req, res)); // New Route

export default authRouter;