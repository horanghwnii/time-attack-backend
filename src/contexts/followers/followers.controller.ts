import { Router } from 'express';
import userOnly from '../../guards/userOnly.guard';
import followersService from './followers.service';

const followersController = Router();

/**
 * Following cancel
 */
followersController.delete('/:userId', userOnly, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const playerId = req.user!.id;

    const follow = await followersService.deleteFollower(userId, playerId);

    res.json({ follow });
  } catch (e) {
    next(e);
  }
});

export default followersController;
