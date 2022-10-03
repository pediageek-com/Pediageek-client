import { IUser, Other } from "../../utils/TypeScript";

import {
  IFollowersUser,
  IGetFollowersUserType,
  GET_FOLLOWER_USER_ID,
} from "../types/followType";

const followersUserReducer = (
  state: IFollowersUser[] = [],
  action: IGetFollowersUserType
): IFollowersUser[] => {
  switch (action.type) {
    case GET_FOLLOWER_USER_ID:
      if (state.every((item) => item.id !== action.payload.id)) {
        return [...state, action.payload];
      } else {
        return state.map((item) =>
          item.id === action.payload.id
            ? {
                id: item.id,
                followers: [...item.followers, ...action.payload.followers],
                followings: [...item.followings, ...action.payload.followings],
                follower_page: action.payload.follower_page,
                following_page: action.payload.following_page,
              }
            : item
        );
      }
    default:
      return state;
  }
};

export default followersUserReducer;
