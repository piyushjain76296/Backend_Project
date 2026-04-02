import { Request, Response, NextFunction } from 'express';

export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    
    if (!userRole || !allowedRoles.includes(userRole)) {
      res.status(403).json({ 
        success: false, 
        error: 'Access denied: Insufficient permissions.' 
      });
      return;
    }
    next();
  };
};
