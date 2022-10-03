import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { IParams, RootStore, IBlog } from "../../utils/TypeScript";

import { getBlogsByUserId } from "../../redux/actions/blogAction";

import CardHoriz from "../cards/CardHoriz";
import Loading from "../global/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const UserBlogs = () => {
  const { blogsUser, darkMode } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const user_id = useParams<IParams>().slug;
  const { isdarkMode } = darkMode;
  const [blogs, setBlogs] = useState<IBlog[]>();
  const [total, setTotal] = useState(0);
  const history = useHistory();
  const { search } = history.location;
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!user_id && blogs) return;
    if (
      blogsUser.every((item) => {
        return item.id !== user_id;
      })
    ) {
      dispatch(getBlogsByUserId(user_id, search));
    }
  }, [user_id, blogsUser, history]);

  useEffect(() => {
    if (!user_id) return;
    const data = blogsUser.find((item) => item.id === user_id);
    if (!data) return;
    setBlogs(data.blogs);
    if (!total) setTotal(data.total);
    setPage(data.page + 1);
  }, [user_id, blogsUser, history]);

  const fetchMore = () => {
    dispatch(getBlogsByUserId(user_id, `?page=${page}`));
  };

  if (!blogs)
    return (
      <h5
        className={`text-center fw-bold my-auto text-${
          isdarkMode ? "white" : "black"
        }  py-4`}
      >
        No Blogs
      </h5>
    );

  if (blogs.length === 0)
    return (
      <h5
        className={`text-center fw-bold my-auto text-${
          isdarkMode ? "white" : "black"
        }  py-4`}
      >
        No Blogs
      </h5>
    );

  return (
    <div>
      <InfiniteScroll
        dataLength={blogs.length + 1} //This is important field to render the next data
        next={fetchMore}
        hasMore={blogs.length + 1 < total}
        loader={<Loading />}
        scrollThreshold={0.6}
        endMessage={<></>}
      >
        <div className="show_blogs">
          {blogs.map((blog) => (
            <CardHoriz key={blog._id} blog={blog} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default UserBlogs;
