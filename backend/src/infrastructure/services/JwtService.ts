import jwt from 'jsonwebtoken';
import { ITokenService } from '../../application/interfaces/ITokenService';

export class JwtService implements ITokenService {
  private readonly secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'supersecretkey'; // Fallback for dev
  }

  generateToken(payload: object): string {
    // Expires in 1 day
    return jwt.sign(payload, this.secret, { expiresIn: '1d' });
  }

  verifyToken(token: string): object | string {
    return jwt.verify(token, this.secret);
  }
}