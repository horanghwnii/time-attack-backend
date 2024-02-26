import prismaClient from '../../../prisma/client.prisma';
import {
  CreateCommentData,
  DeleteCommentData,
  UpdateCommentData,
} from './comments.type';

/**
 * Create comment
 */
const createComment = async (createCommentData: CreateCommentData) => {
  const { authorId, tweetId, content } = createCommentData;

  console.log(createCommentData);

  const createdComment = await prismaClient.comment.create({
    data: { authorId, tweetId, content },
  });

  return createdComment;
};

/**
 * Update comment
 */
const updateComment = async (updateCommentData: UpdateCommentData) => {
  const { authorId, tweetId, commentId: id, content } = updateCommentData;

  const updatedComment = await prismaClient.comment.update({
    where: { tweetId, authorId, id },
    data: { content },
  });

  return updatedComment;
};

/**
 * Delete comment
 */
const deleteComment = async (deleteCommentData: DeleteCommentData) => {
  const { authorId, tweetId, commentId: id } = deleteCommentData;

  await prismaClient.comment.delete({
    where: { tweetId, authorId, id },
  });

  return id;
};

const commentsService = {
  createComment,
  updateComment,
  deleteComment,
};

export default commentsService;
