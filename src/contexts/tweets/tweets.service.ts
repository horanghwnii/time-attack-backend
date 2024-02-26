import prismaClient from '../../prisma/client.prisma';
import { CreateTweetData, UpdateTweetData } from './tweets.type';

/**
 * Create Tweet
 */
const createTweet = async (createTweets: CreateTweetData) => {
  const { authorId, title, content } = createTweets;

  const tweet = await prismaClient.tweet.create({
    data: { authorId, title, content },
  });

  return tweet;
};

/**
 * Get all tweets
 */
const getTweets = async () => {
  const tweets = await prismaClient.tweet.findMany({
    orderBy: { createdAt: 'desc' },
    include: { bookmark: true, comments: true },
  });

  return tweets;
};

/**
 * Get unique tweet
 */
const getTweet = async (tweetId: number) => {
  const tweet = await prismaClient.tweet.findUnique({
    where: { id: tweetId },
  });

  return tweet;
};

/**
 * Update tweet
 */
const updateTweet = async (
  tweetId: number,
  updateTweetData: UpdateTweetData
) => {
  const { title, content } = updateTweetData;

  const updatedTweet = await prismaClient.tweet.update({
    where: { id: tweetId },
    data: { title, content },
  });

  return updatedTweet;
};

/**
 * Delete tweet
 */
const deleteTweet = async (tweetId: number) => {
  await prismaClient.tweet.delete({
    where: { id: tweetId },
  });

  return tweetId;
};

const tweetsService = {
  createTweet,
  getTweets,
  getTweet,
  updateTweet,
  deleteTweet,
};
export default tweetsService;
