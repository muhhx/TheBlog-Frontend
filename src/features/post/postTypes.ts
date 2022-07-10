export interface IUpvotedUser {
  _id: string;
  name: string;
  username: string;
  picture: string;
}

export interface IPostData {
  _id: string;
  __v: number;
  authorId: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPostUser {
  _id: string;
  picture: string;
  name: string;
  username: string | null;
}

export interface IComment {
  _id: string;
  authorId: string;
  postId: string;
  comment: string;
  createdAt: number;
  updatedAt: number;
  __v: number;
}

export interface ICommentData {
  comment: IComment;
  userData: IPostUser;
}

export interface IPost {
  isCurrentUser: boolean;
  isLiked: boolean;
  isSaved: boolean;
  upvotes: IUpvotedUser[];
  upvotesCount: number;
  comments: ICommentData[];
  data: IPostData;
  user: IPostUser;
  status: "idle" | "pending" | "success" | "failure";
  error: null | string;
}

export interface IPostResponse {
  _id: string;
  authorId: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
