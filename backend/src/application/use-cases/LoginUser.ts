import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IPasswordService } from "../interfaces/IPasswordService";
import { ITokenService } from "../interfaces/ITokenService";

export class LoginUser {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService,
    private tokenService: ITokenService
  ) {}

  async execute(email: string, password: string): Promise<{ user: any; token: string }> {
    // 1. Find the user
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password"); // Generic message for security
    }

    // 2. Check password
    // (Note: user.password comes from the DB, password is what they just typed)
    const isPasswordValid = await this.passwordService.compare(password, user.password!);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // 3. Generate Token
    const token = this.tokenService.generateToken({
      id: user.id,
      role: user.role,
      email: user.email
    });

    // 4. Return User (without password) and Token
    const { password: _, ...userWithoutPassword } = user; // specific TS syntax to exclude password
    
    return {
      user: userWithoutPassword,
      token
    };
  }
}