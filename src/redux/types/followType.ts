import { Other, IUser } from "../../utils/TypeScript";

export const GET_FOLLOWER_USER_ID = "GET_FOLLOWER_USER_ID";

export interface IFollowersUser {
  id: string;
  followers: Other[];
  follower_page: number;
  followings: Other[];
  following_page: number;
}

export interface IGetFollowersUserType {
  type: typeof GET_FOLLOWER_USER_ID;
  payload: IFollowersUser;
}
