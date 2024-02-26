import { Router } from 'express';
import userOnly from '../../guards/userOnly.guard';
import bookmarksController from './bookmarks/bookmarks.controller';
import commentsController from './comments/comments.controller';
import tweetsService from './tweets.service';
import { CreateTweetData } from './tweets.type';

const tweetsController = Router();

/**
 * Create tweet
 */
tweetsController.post('/', userOnly, async (req, res, next) => {
  const authorId = req.user!.id;
  const { title, content } = req.body;
  if (!title.trim()) throw new Error('No title');
  if (!content.trim()) throw new Error('No content');

  const createTweetData: CreateTweetData = {
    authorId,
    title,
    content,
  };

  const tweet = await tweetsService.createTweet(createTweetData);

  res.json({ tweet });
});

/**
 * Get all tweets
 */
tweetsController.get('/', async (req, res, next) => {
  try {
    const tweets = await tweetsService.getTweets();

    res.json(tweets);
  } catch (e) {
    next(e);
  }
});

/**
 * Get unique tweet
 */
tweetsController.get('/:tweetId', async (req, res, next) => {
  try {
    const tweetId = Number(req.params.tweetId);
    const tweet = await tweetsService.getTweet(tweetId);

    res.json(tweet);
  } catch (e) {
    next(e);
  }
});

/**
 * Update tweet
 */
tweetsController.patch('/:tweetId', userOnly, async (req, res, next) => {
  try {
    const tweetId = Number(req.params.tweetId);
    const { title, content } = req.body;
    const updatedTweet = await tweetsService.updateTweet(tweetId, {
      title,
      content,
    });

    res.json(updatedTweet);
  } catch (e) {
    next(e);
  }
});

/**
 * Delete tweet
 */
tweetsController.delete('/:tweetId', userOnly, async (req, res, next) => {
  try {
    const tweetId = Number(req.params.tweetId);
    const deletedTweetId = await tweetsService.deleteTweet(tweetId);

    res.json(deletedTweetId);
  } catch (e) {
    next(e);
  }
});

tweetsController.use('/', commentsController);
tweetsController.use('/', bookmarksController);

export default tweetsController;
