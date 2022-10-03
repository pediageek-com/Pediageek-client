import React, { useEffect, useState } from "react";
import Following from "./OtherFollowings";
import UserBlogs from "./UserBlogs";
import Follower from "./OtherFollower";
import { IUser, RootStore } from "../../utils/TypeScript";
import { useDispatch, useSelector } from "react-redux";
import { getOtherInfo } from "../../redux/actions/userAction";
import { Link } from "react-router-dom";

interface IProps {
  id: string;
  title: string;
}

const Other: React.FC<IProps> = ({ id, title }) => {
  const { otherInfo, darkMode, auth, follow } = useSelector(
    (state: RootStore) => state
  );
  const { isdarkMode } = darkMode;

  const [other, setOther] = useState<IUser>();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) return;
    if (otherInfo.every((user) => user._id !== id)) {
      if (auth.access_token) dispatch(getOtherInfo(id, auth.access_token));
      else dispatch(getOtherInfo(id));
    } else {
      const newUser = otherInfo.find((user) => user._id === id);
      if (newUser) setOther(newUser);
    }
  }, [id, otherInfo, dispatch]);
  if (!other) return <></>;
  return (
    <>
      <nav
        className={`nav example rounded bg-${
          isdarkMode ? "dark" : "light"
        } p-1`}
        style={{
          flexWrap: "nowrap",
          overflowX: "scroll",
          overflowY: "hidden",
        }}
      >
        <Link
          className={`btn fw-bold text-${isdarkMode ? "light" : "dark"}`}
          aria-current="page"
          to={`/profile/${id}/blogs`}
        >
          Blogs
        </Link>
        <Link
          className={`btn fw-bold text-${isdarkMode ? "light" : "dark"}`}
          to={`/profile/${id}/followers`}
        >
          Followers
        </Link>
        <Link
          className={`btn fw-bold text-${isdarkMode ? "light" : "dark"}`}
          to={`/profile/${id}/followings`}
        >
          Followings
        </Link>
      </nav>
      <div className="tab-content mb-3 mt-2" id="nav-tabContent">
        <div>{!title || title === "blogs" ? <UserBlogs /> : <></>}</div>
        <div>
          {title === "followers" ? (
            <Follower id={other._id} followerno={other.follower} />
          ) : (
            <></>
          )}
        </div>
        <div>
          {title === "followings" ? (
            <Following id={other._id} followingno={other.following} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Other;
