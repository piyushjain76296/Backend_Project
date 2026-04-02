import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isActive: true });
    if (!user || !user.password) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const payload = {
      id: user._id,
      role: user.role,
      email: user.email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    res.status(200).json({
      success: true,
      token,
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
};
