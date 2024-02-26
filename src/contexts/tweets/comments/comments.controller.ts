import { Router } from 'express';
import userOnly from '../../../guards/userOnly.guard';
import commentsService from './comments.service';

const commentsController = Router();

/**
 * Create comment
 */
commentsController.post(
  '/:tweetId/comments',
  userOnly,
  async (req, res, next) => {
    try {
      const authorId = req.user!.id;
      const tweetId = Number(req.params.tweetId);
      const { content } = req.body;

      const comment = await commentsService.createComment({
        authorId,
        tweetId,
        content,
      });

      res.json({ comment });
    } catch (e) {
      next(e);
    }
  }
);

/**
 * Update comment
 */
commentsController.patch(
  '/:tweetId/comments/:commentId',
  userOnly,
  async (req, res, next) => {
    try {
      const authorId = req.user!.id;
      const tweetId = Number(req.params.tweetId);
      const commentId = Number(req.params.commentId);

      const { content } = req.body;

      const comment = await commentsService.updateComment({
        authorId,
        tweetId,
        commentId,
        content,
      });

      res.json({ comment });
    } catch (e) {
      next(e);
    }
  }
);

/**
 * Delete comment
 */
commentsController.delete(
  '/:tweetId/comments/:commentId',
  userOnly,
  async (req, res, next) => {
    try {
      const authorId = req.user!.id;
      const tweetId = Number(req.params.tweetId);
      const commentId = Number(req.params.commentId);

      const deletedCommentId = await commentsService.deleteComment({
        authorId,
        tweetId,
        commentId,
      });

      res.json({ deletedCommentId });
    } catch (e) {
      next(e);
    }
  }
);

export default commentsController;
