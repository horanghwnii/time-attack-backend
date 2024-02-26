import { Router } from 'express';
import userOnly from '../../../../guards/userOnly.guard';
import userProfileService from './userProfile.service';

const userProfileController = Router();

/**
 * Update user profile
 */
userProfileController.put('/', userOnly, async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const { nickname, description } = req.body;

    const updatedUserProfile = await userProfileService.updateUserProfile({
      userId,
      nickname,
      description,
    });

    res.json({ updatedUserProfile });
  } catch (e) {
    next(e);
  }
});

/**
 * Profile page
 */
userProfileController.get('/:userId', userOnly, async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const userProfile = await userProfileService.getUserPage(userId);

    res.json({ userProfile });
  } catch (e) {
    next(e);
  }
});

/**
 * User followings
 */
userProfileController.get(
  '/:userId/followings',
  userOnly,
  async (req, res, next) => {
    try {
      const userId = req.params.userId;

      const userFollowings = await userProfileService.getUserFollowings(userId);

      res.json({ userFollowings });
    } catch (e) {
      next(e);
    }
  }
);

/**
 * User followers
 */
userProfileController.get(
  '/:userId/followers',
  userOnly,
  async (req, res, next) => {
    try {
      const userId = req.params.userId;

      const userFollowers = await userProfileService.getUserFollowers(userId);

      res.json({ userFollowers });
    } catch (e) {
      next(e);
    }
  }
);

export default userProfileController;
