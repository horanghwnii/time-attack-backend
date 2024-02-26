import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/env.config';
import prismaClient from '../prisma/client.prisma';

/**
 * AuthMiddleware
 */
async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  req.user = null;

  const accessToken = req.headers.authorization?.split('Bearer ')[1] as string;
  if (!accessToken) return next();

  try {
    const { sub: id } = verify(accessToken, JWT_SECRET_KEY);
    const user = await prismaClient.user.findUnique({
      where: { id: id as string },
    });

    req.user = user;
    next();
  } catch (e) {
    return next(e);
  }
}

export default authMiddleware;
