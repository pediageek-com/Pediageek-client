import { Dispatch } from "redux";
import { AUTH, IAuth, IAuthType } from "../types/authType";
import { ALERT, IAlertType } from "../types/alertType";

import { IUser, IUserLogin, IUserRegister } from "../../utils/TypeScript";
import { postAPI, getAPI, patchAPI } from "../../utils/FetchData";
import { validRegister, validPhone } from "../../utils/Valid";
import { checkTokenExp } from "../../utils/checkTokenExp";
import {
  GET_HOME_BLOGS,
  HOME_BLOGS_AFTER_LOGIN,
  IGetHomeBlogsType,
  IHomeBlogsType,
} from "../types/blogType";

export const login =
  (userLogin: IUserLogin) =>
  async (dispatch: Dispatch<IAuthType | IAlertType | IHomeBlogsType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await postAPI("login", userLogin);
      console.log(res);
      dispatch({ type: AUTH, payload: res.data });
      dispatch({
        type: HOME_BLOGS_AFTER_LOGIN,
        payload: {
          blogs: [],
          total: 0, //total number of pages present in the data base
          count: 0,
        },
      });
      dispatch({ type: ALERT, payload: { loading: false } });
      localStorage.setItem("logged", "pediageek");
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const register =
  (userRegister: IUserRegister) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validRegister(userRegister);

    if (check.errLength > 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } });

    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await postAPI("register", userRegister);

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const refreshToken =
  () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const logged = localStorage.getItem("logged");
    if (logged !== "pediageek") return;

    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getAPI("refresh_token");

      dispatch({ type: AUTH, payload: res.data });

      dispatch({ type: ALERT, payload: {} });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
      localStorage.removeItem("logged");
    }
  };

export const logout =
  (token: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    try {
      localStorage.removeItem("logged");
      dispatch({ type: AUTH, payload: {} });
      await getAPI("logout", access_token);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const googleLogin =
  (id_token: string, referer: string) =>
  async (dispatch: Dispatch<IAuthType | IAlertType | IHomeBlogsType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      let res = await postAPI("google_login", { id_token, referer });

      dispatch({ type: AUTH, payload: res.data });
      dispatch({
        type: HOME_BLOGS_AFTER_LOGIN,
        payload: {
          blogs: [],
          total: 0, //total number of pages present in the data base
          count: 0,
        },
      });
      dispatch({ type: ALERT, payload: { loading: false } });
      localStorage.setItem("logged", "pediageek");
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };


export const forgotPassword =
  (account: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await postAPI("forgot_password", { account });

      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const addfollowing =
  (user: string, token: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    try {
      var newuser;
      if (auth.user) {
        newuser = {
          ...auth.user,
          followinglist: [...auth.user.followinglist, user],
          following: auth.user.following + 1,
        };
        dispatch({
          type: AUTH,
          payload: { ...auth, user: newuser },
        });
      }
      const res = await postAPI(`follow`, { id: user }, token);
      if (auth.user) {
        newuser = {
          ...newuser,
          notice: res.data,
        };
        dispatch({
          type: AUTH,
          payload: { ...auth, user: newuser },
        });
      }
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const removefollowing =
  (user: string, token: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    try {
      var newuser;
      if (auth.user) {
        newuser = {
          ...auth.user,
          followinglist: auth.user.followinglist.filter(
            (item) => item !== user
          ),
          following: auth.user.following - 1,
        };
        dispatch({
          type: AUTH,
          payload: { ...auth, user: newuser },
        });
      }
      const res = await patchAPI(`follow`, { id: user }, token);
      if (auth.user) {
        newuser = {
          ...newuser,
          notice: res.data,
        };
        dispatch({
          type: AUTH,
          payload: { ...auth, user: newuser },
        });
      }
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
