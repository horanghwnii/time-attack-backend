export type CreateCommentData = {
  authorId: string;
  tweetId: number;
  content: string;
};

export type UpdateCommentData = {
  authorId: string;
  tweetId: number;
  commentId: number;
  content: string;
};

export type DeleteCommentData = {
  authorId: string;
  tweetId: number;
  commentId: number;
};
