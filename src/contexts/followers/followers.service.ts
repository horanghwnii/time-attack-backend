import prismaClient from '../../prisma/client.prisma';

/**
 * Following cancel
 */
const deleteFollower = async (userId: string, playerId: string) => {
  const result = await prismaClient.follows.delete({
    where: {
      followerId_followingId: { followerId: userId, followingId: playerId },
    },
  });

  return result;
};

const followersService = {
  deleteFollower,
};

export default followersService;
