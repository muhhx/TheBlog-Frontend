export interface IPost {
  id: string;
  authorId: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFollower {
  name: string;
  username: string;
  _id: string;
}

export interface IUser {
  profile: {
    _id: string;
    name: string;
    username: string;
    picture: string;
    bio: string;
    email: string;
  };
  posts: IPost[];
  favorites: IPost[] | null;
  following: IFollower[];
  followingCount: number;
  followers: IFollower[];
  followersCount: number;
  isBeingFollowed: boolean;
  isCurrentUser: boolean;
  status: "idle" | "pending" | "success" | "failure";
  error: null | string;
}
