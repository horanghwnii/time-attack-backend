import prismaClient from '../../../prisma/client.prisma';

/**
 * Save To Bookmark
 */
const saveToBookmark = async (userId: string, tweetId: number) => {
  const bookmarks = await prismaClient.bookmark.create({
    data: { userId, tweetId },
  });

  return bookmarks;
};

/**
 * Delete From Bookmark
 */
const deleteFromBookmark = async (userId: string, tweetId: number) => {
  await prismaClient.bookmark.delete({
    where: { userId_tweetId: { userId, tweetId } },
  });
  return tweetId;
};

const bookmarksService = {
  saveToBookmark,
  deleteFromBookmark,
};

export default bookmarksService;
