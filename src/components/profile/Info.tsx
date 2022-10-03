import React, { useState } from "react";
import Following from "./OtherFollowings";
import UserBlogs from "./UserBlogs";
import UserDrafts from "./UserDrafts";
import Follower from "./OtherFollower";
import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";
import { Link } from "react-router-dom";

interface IProps {
  title: string;
}

const Info: React.FC<IProps> = ({ title }) => {
  const { auth, darkMode } = useSelector((state: RootStore) => state);
  const { isdarkMode } = darkMode;
  if (!auth.user) return <></>;
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
          className={`btn fw-bold  ${isdarkMode ? "text-light" : "text-dark"}`}
          aria-current="page"
          to={`/profile/${auth.user._id}/blogs`}
        >
          Blogs
        </Link>
        <Link
          className={`btn fw-bold  text-${isdarkMode ? "light" : "dark"}`}
          aria-current="page"
          to={`/profile/${auth.user._id}/drafts`}
        >
          Drafts
        </Link>
        <Link
          className={`btn fw-bold  text-${isdarkMode ? "light" : "dark"}`}
          to={`/profile/${auth.user._id}/followers`}
        >
          Followers
        </Link>
        <Link
          className={`btn fw-bold  text-${isdarkMode ? "light" : "dark"}`}
          to={`/profile/${auth.user._id}/followings`}
        >
          Followings
        </Link>
      </nav>
      <div className="tab-content mb-3 mt-2" id="nav-tabContent">
        <div>{!title || title === "blogs" ? <UserBlogs /> : <></>}</div>

        <div>{title === "drafts" ? <UserDrafts /> : <></>}</div>
        <div>
          {title === "followers" ? (
            <Follower id={auth.user._id} followerno={auth.user.follower} />
          ) : (
            <></>
          )}
        </div>
        <div>
          {title === "followings" ? (
            <Following id={auth.user._id} followingno={auth.user.following} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Info;
