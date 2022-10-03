import { Dispatch } from "redux";
import { IBlog } from "../../utils/TypeScript";
import { imageUpload } from "../../utils/ImageUpload";
import {
  postAPI,
  getAPI,
  putAPI,
  deleteAPI,
  patchAPI,
} from "../../utils/FetchData";

import { ALERT, IAlertType } from "../types/alertType";

import {
  GET_HOME_BLOGS,
  IGetHomeBlogsType,
  GET_BLOGS_CATEGORY_ID,
  IGetBlogsCategoryType,
  GET_BLOGS_USER_ID,
  IGetBlogsUserType,
  CREATE_BLOGS_USER_ID,
  ICreateBlogsUserType,
  DELETE_BLOGS_USER_ID,
  IDeleteBlogsUserType,
} from "../types/blogType";

import {
  CREATE_DRAFTS_USER_ID,
  ICreateDraftsUserType,
} from "../types/draftType";

import { checkTokenExp } from "../../utils/checkTokenExp";
import { IAuth } from "../types/authType";

export const createBlog =
  (blog: IBlog, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateBlogsUserType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;

    let url;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      if (typeof blog.thumbnail !== "string") {
        if (access_token) {
          const photo = await imageUpload(blog.thumbnail, access_token);
          url = photo.url;
        }
      } else {
        url = blog.thumbnail;
      }

      const newBlog = { ...blog, thumbnail: url };

      const res = await postAPI("blog", newBlog, access_token);

      dispatch({
        type: CREATE_BLOGS_USER_ID,
        payload: res.data,
      });
      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      // dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getHomeBlogs =
  (search: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
    try {
      let limit = 8;
      let value = search ? search : `?page=${1}`;
      let res;

      if (!auth.user || auth.user.following === 0) {
        res = await getAPI(`home/blogs${value}&limit=${limit}`);
        dispatch({
          type: GET_HOME_BLOGS,
          payload: { ...res.data },
        });
      } else {
        if (auth.user.following !== 0) {
          res = await getAPI(
            `home/signedblogsbyfollow${value}&limit=${8}`,
            auth.access_token
          );
          dispatch({
            type: GET_HOME_BLOGS,
            payload: { ...res.data },
          });
        }
        if (auth.user?.preferance) {
          res = await getAPI(
            `home/signedblogsbycategory${value}&limit=${8}`,
            auth.access_token
          );
          dispatch({
            type: GET_HOME_BLOGS,
            payload: { ...res.data },
          });

          res = await getAPI(
            `home/signedblogsbysearch${value}&limit=${8}`,
            auth.access_token
          );
          dispatch({
            type: GET_HOME_BLOGS,
            payload: { ...res.data },
          });
        }
      }
    } catch (err: any) {
      // dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getBlogsByCategoryId =
  (id: string, search: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogsCategoryType>) => {
    try {
      let limit = 8;
      let value = search ? search : `?page=${1}`;

      dispatch({ type: ALERT, payload: { loading: true } });

      const res = await getAPI(`blogs/category/${id}${value}&limit=${limit}`);

      dispatch({
        type: GET_BLOGS_CATEGORY_ID,
        payload: { ...res.data, id, search },
      });

      dispatch({ type: ALERT, payload: { loading: false } });
    } catch (err: any) {
      // dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
export const getCategoryBySearch =
  (id: string, category: string, page: number, auth?: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogsCategoryType>) => {
    try {
      let limit = 8;
      let value = page ? `?page=${page}` : `?page=${1}`;
      var res;
      if (!auth?.access_token)
        res = await getAPI(
          `blogs/categorybysearch${value}&search=${category}&limit=${limit}`
        );
      else
        res = await getAPI(
          `blogs/categorybysearchbyauth${value}&search=${category}&limit=${limit}`,
          auth.access_token
        );

      dispatch({
        type: GET_BLOGS_CATEGORY_ID,
        payload: { ...res.data, id, page: page + 1 },
      });
    } catch (err: any) {
      // dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const getBlogsByUserId =
  (id: string, search: string) =>
  async (dispatch: Dispatch<IAlertType | IGetBlogsUserType>) => {
    try {
      let limit = 8;
      let value = search ? search : `?page=${1}`;
      const res = await getAPI(`blogs/user/${id}${value}&limit=${limit}`);
      dispatch({
        type: GET_BLOGS_USER_ID,
        payload: { ...res.data, id, page: 1 },
      });
    } catch (err: any) {
      // dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const updateBlog =
  (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    let url;
    try {
      dispatch({ type: ALERT, payload: { loading: true } });

      if (typeof blog.thumbnail !== "string") {
        const photo = await imageUpload(blog.thumbnail, access_token);
        url = photo.url;
      } else {
        url = blog.thumbnail;
      }

      const newBlog = { ...blog, thumbnail: url };

      const res = await putAPI(`blog/${newBlog._id}`, newBlog, access_token);
      dispatch({ type: ALERT, payload: { loading: false } });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      // dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const deleteBlog =
  (blog: IBlog, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDeleteBlogsUserType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch({
        type: DELETE_BLOGS_USER_ID,
        payload: blog,
      });

      await deleteAPI(`blog/${blog._id}`, access_token);
    } catch (err: any) {
      // dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
export const createDraftdeleteBlog =
  (blog: IBlog, token: string) =>
  async (
    dispatch: Dispatch<
      IAlertType | IDeleteBlogsUserType | ICreateDraftsUserType
    >
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    let url;
    try {
      if (typeof blog.thumbnail !== "string") {
        if (access_token) {
          const photo = await imageUpload(blog.thumbnail, access_token);
          url = photo.url;
        }
      } else {
        url = blog.thumbnail;
      }

      const newBlog = { ...blog, thumbnail: url };
      dispatch({
        type: DELETE_BLOGS_USER_ID,
        payload: blog,
      });
      dispatch({
        type: CREATE_DRAFTS_USER_ID,
        payload: blog,
      });
      await patchAPI(`blogtodraft/${blog._id}`, newBlog, access_token);
    } catch (err: any) {
      // dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const likeBlog =
  (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      await putAPI(`like`, { blog: blog._id }, access_token);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const unlikeBlog =
  (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      await patchAPI(`like`, { blog: blog._id }, access_token);
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
