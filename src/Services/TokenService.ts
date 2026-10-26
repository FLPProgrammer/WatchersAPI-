
import jwt, { SignOptions } from 'jsonwebtoken';

export class TokenService {
  generateAccessToken(userId: string): string {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET não foi definida no arquivo .env');
    }

    const expiresIn = (process.env.JWT_EXPIRES_IN ??
      '15m') as SignOptions['expiresIn'];

    return jwt.sign({}, secret, {
      subject: userId,
      expiresIn,
      algorithm: 'HS256',
    });
  }
}
