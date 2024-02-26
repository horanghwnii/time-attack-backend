import prismaClient from '../../../../prisma/client.prisma';
import { UpdateUserProfileData } from './userProfile.type';

/**
 * Update user profile
 */
const updateUserProfile = async (
  updateUserProfileData: UpdateUserProfileData
) => {
  const { userId, nickname, description } = updateUserProfileData;

  const updatedUserProfile = await prismaClient.userProfile.update({
    where: { userId: userId },
    data: { nickname, description },
  });

  return updatedUserProfile;
};

/**
 * User profile
 */
const getUserPage = async (userId: string) => {
  const userProfile = await prismaClient.user.findUnique({
    where: { id: userId },
    select: {
      userProfile: { select: { nickname: true, description: true } },
      tweet: { orderBy: { createdAt: 'desc' } },
      following: true,
      follower: true,
    },
  });

  return userProfile;
};

/**
 * User followings
 */
const getUserFollowings = async (userId: string) => {
  const userFollowings = await prismaClient.user.findUnique({
    where: { id: userId },
    select: {
      following: {
        select: {
          following: {
            select: {
              userProfile: { select: { nickname: true, description: true } },
            },
          },
        },
      },
    },
  });

  return userFollowings;
};

/**
 * User followers
 */
const getUserFollowers = async (userId: string) => {
  const userFollowers = await prismaClient.user.findUnique({
    where: { id: userId },
    select: {
      follower: {
        select: {
          follower: {
            select: {
              userProfile: { select: { nickname: true, description: true } },
            },
          },
        },
      },
    },
  });

  return userFollowers;
};

const userProfileService = {
  updateUserProfile,
  getUserPage,
  getUserFollowings,
  getUserFollowers,
};

export default userProfileService;
