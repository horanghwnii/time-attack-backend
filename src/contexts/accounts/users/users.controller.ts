import { Router } from 'express';
import userProfileController from './userProfile/userProfile.controller';
import usersService from './users.service';

const usersController = Router();

/**
 * SignUp
 * 회원가입 시에 이메일, 패스워드, 닉네임, 소개를 필수로 받음
 */
usersController.post('/sign-up', async (req, res, next) => {
  try {
    const { email, password, nickname, description } = req.body;
    if (!email.trim()) throw new Error('No email');
    if (!password.trim()) throw new Error('No password');
    if (password.trim().length < 8) throw new Error('Too short password');
    if (!nickname.trim()) throw new Error('No nickname');
    if (!description.trim()) throw new Error('Too short description');

    const accessToken = await usersService.signUp({
      email,
      password,
      nickname,
      description,
    });

    res.json({ accessToken });
  } catch (e) {
    next(e);
  }
});

/**
 * LogIn
 */
usersController.post('/log-in', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email.trim()) throw new Error('No email');
    if (!password.trim() || password.trim().length < 8)
      throw new Error('again password');

    const accessToken = await usersService.logIn({
      email,
      password,
    });

    res.json({ accessToken });
  } catch (e) {
    next(e);
  }
});

usersController.use('/', userProfileController);

export default usersController;
