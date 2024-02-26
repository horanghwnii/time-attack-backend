import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { JWT_SECRET_KEY } from '../../../config/env.config';
import prismaClient from '../../../prisma/client.prisma';
import { LogInData, SignUpData } from './users.type';

/**
 * SignUp
 */
const signUp = async (signUpData: SignUpData) => {
  const { email, password, nickname, description } = signUpData;

  const encryptedPassword = await hash(password, 12);

  const user = await prismaClient.user.create({
    data: { id: nanoid(), email, encryptedPassword },
  });

  await prismaClient.userProfile.create({
    data: { userId: user.id, nickname, description },
  });

  const accessToken = generatedAccessToken(user);

  return accessToken;
};

/**
 * LogIn
 */
const logIn = async (logInData: LogInData) => {
  const { email, password } = logInData;

  const user = await prismaClient.user.findUnique({ where: { email } });
  if (!user) throw new Error('No user');

  const isCorrect = await compare(password, user.encryptedPassword);
  if (!isCorrect) throw new Error('Invalid password');

  const accessToken = generatedAccessToken(user);

  return accessToken;
};

/**
 * AccessToken
 */
const generatedAccessToken = (user: User) => {
  const { email } = user;

  const accessToken = sign({ email }, JWT_SECRET_KEY, {
    subject: user.id,
    expiresIn: '2h',
  });

  return accessToken;
};

const usersService = {
  signUp,
  logIn,
};

export default usersService;
