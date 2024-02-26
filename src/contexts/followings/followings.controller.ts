import { Router } from 'express';
import userOnly from '../../guards/userOnly.guard';
import followingsService from './followings.service';

const followingsController = Router();

followingsController.post('/:userId', userOnly, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const playerId = req.user!.id;

    const follow = await followingsService.createFollowing(userId, playerId);

    res.json({ follow });
  } catch (e) {
    next(e);
  }
});

followingsController.delete('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const playerId = req.user!.id;

    const follow = await followingsService.deleteFollowing(userId, playerId);

    res.json({ follow });
  } catch (e) {
    next(e);
  }
});

export default followingsController;
