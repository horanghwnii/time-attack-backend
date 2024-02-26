import { Router } from 'express';
import userOnly from '../../guards/userOnly.guard';
import rootService from './root.service';

const rootController = Router();

/**
 * Health check
 */
rootController.get('/health-check', (req, res, next) => {
  res.json('OK');
});

/**
 * Get all bookmark list
 */
rootController.get('/bookmarks', userOnly, async (req, res, next) => {
  try {
    const userId = req.user!.id;

    const allBookmarks = await rootService.getAllBookmarks(userId);

    res.json({ allBookmarks });
  } catch (e) {
    res.json(e);
  }
});

export default rootController;
