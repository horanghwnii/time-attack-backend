import prismaClient from '../../prisma/client.prisma';

/**
 * Create following
 */
const createFollowing = async (userId: string, playerId: string) => {
  const result = await prismaClient.follows.create({
    data: { followerId: playerId, followingId: userId },
  });

  return result;
};

/**
 * Delete following
 */
const deleteFollowing = async (userId: string, playerId: string) => {
  const result = await prismaClient.follows.delete({
    where: {
      followerId_followingId: { followerId: playerId, followingId: userId },
    },
  });

  return result;
};

const followingsService = {
  createFollowing,
  deleteFollowing,
};

export default followingsService;
