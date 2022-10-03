import { Dispatch } from "redux";
import { ALERT, IAlertType } from "../types/alertType";
import {
  IFollowersUser,
  IGetFollowersUserType,
  GET_FOLLOWER_USER_ID,
} from "../types/followType";
import { IUser, Other } from "../../utils/TypeScript";
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/FetchData";
import { checkTokenExp } from "../../utils/checkTokenExp";

export const setFollowers =
  (id: string, other?: IFollowersUser, token?: string) =>
  async (dispatch: Dispatch<IAlertType | IGetFollowersUserType>) => {
    var res;
    try {
      if (token) {
        const result = await checkTokenExp(token, dispatch);
        const access_token = result ? result : token;
        res = await getAPI(
          `followerbyauth/${id}?page=${other ? other.follower_page : 1}`,
          access_token
        );
      } else
        res = await getAPI(
          `follower/${id}?page=${other ? other.follower_page : 1}`
        );
      dispatch({
        type: GET_FOLLOWER_USER_ID,
        payload: {
          id,
          followers: res.data,
          followings: [],
          follower_page: other ? other.follower_page + 1 : 2,
          following_page: other ? other.following_page : 1,
        },
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
export const setFollowings =
  (id: string, other?: IFollowersUser, token?: string) =>
  async (dispatch: Dispatch<IAlertType | IGetFollowersUserType>) => {
    var res;
    try {
      if (token) {
        const result = await checkTokenExp(token, dispatch);
        const access_token = result ? result : token;
        res = await getAPI(
          `followingbyauth/${id}?page=${other ? other.following_page : 1}`,
          access_token
        );
      } else
        res = await getAPI(
          `following/${id}?page=${other ? other.following_page : 1}`
        );
      dispatch({
        type: GET_FOLLOWER_USER_ID,
        payload: {
          id,
          followings: res.data,
          followers: [],
          follower_page: other ? other.follower_page : 1,
          following_page: other ? other.following_page + 1 : 2,
        },
      });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
