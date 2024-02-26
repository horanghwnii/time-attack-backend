import { Router } from 'express';
import userOnly from '../../../guards/userOnly.guard';
import bookmarksService from './bookmarks.service';

const bookmarksController = Router();

/**
 * Save To Bookmark
 */
bookmarksController.put(
  '/:tweetId/bookmarks',
  userOnly,
  async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const tweetId = Number(req.params.tweetId);

      const savedTweet = await bookmarksService.saveToBookmark(userId, tweetId);

      res.json({ savedTweet });
    } catch (e) {
      res.json(e);
    }
  }
);

/**
 * Delete From Bookmark
 */
bookmarksController.delete(
  '/:tweetId/bookmarks',
  userOnly,
  async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const tweetId = Number(req.params.tweetId);

      const deletedId = await bookmarksService.deleteFromBookmark(
        userId,
        tweetId
      );
      res.json({ deletedId });
    } catch (e) {
      res.json(e);
    }
  }
);

export default bookmarksController;
