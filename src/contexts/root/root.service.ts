import prismaClient from '../../prisma/client.prisma';

/**
 * Get all bookmarks
 */
const getAllBookmarks = async (userId: string) => {
  const allBookmarks = await prismaClient.user.findUnique({
    where: { id: userId },
    select: { bookmark: { select: { tweet: true } } },
  });

  return allBookmarks;
};

const rootService = {
  getAllBookmarks,
};

export default rootService;
