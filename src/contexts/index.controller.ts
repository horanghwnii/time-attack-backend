import { Router } from 'express';
import accountsController from './accounts/accounts.controller';
import followersController from './followers/followers.controller';
import followingsController from './followings/followings.controller';
import rootController from './root/root.controller';
import tweetsController from './tweets/tweets.controller';

const controllers = Router();

controllers.use('/accounts', accountsController);
controllers.use('/tweets', tweetsController);
controllers.use('/followings', followingsController);
controllers.use('/followers', followersController);
controllers.use('/', rootController);

export default controllers;
