import { JwtPayload } from 'jsonwebtoken';

// Extend the Express Request to include our User payload
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        email: string;
      };
    }
  }
}
