
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error('JWT_SECRET não foi definida.');
    return res.status(500).json({
      message: 'Internal server error',
    });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Authentication token required',
    });
  }

  const token = authHeader.slice('Bearer '.length);

  try {
    const decoded = jwt.verify(token, secret, {
      algorithms: ['HS256'],
    });

    if (typeof decoded === 'string' || typeof decoded.sub !== 'string') {
      return res.status(401).json({
        message: 'Invalid authentication token',
      });
    }

    res.locals.userId = decoded.sub;

    return next();
  } catch {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
}
