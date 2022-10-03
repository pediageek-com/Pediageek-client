import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getOtherInfo } from "../../redux/actions/userAction";

import { RootStore, IUser, Other } from "../../utils/TypeScript";

import Follow from "./Follow";
import Onlytick from "./Onlytick";
interface IProps {
  follow: IUser | Other;
}
const UserInfo: React.FC<IProps> = ({ follow }) => {
  const { darkMode } = useSelector((state: RootStore) => state);
  const { isdarkMode } = darkMode;
  return (
    <div
      className={`container my-2 bg-${
        isdarkMode ? "dark" : "light"
      } py-2 rounded`}
    >
      <div className="d-flex flex-row justify-content-between align-items-center ">
        <Link to={`/profile/${follow._id}`} className="text-decoration-none">
          <div className="d-flex flex-row align-items-center">
            <img
              className="rounded-circle"
              src={follow.avatar}
              width="55"
              height="55"
            />
            <div className="d-flex flex-column align-items-start ml-2">
              <span
                className={`fw-bold mx-2 text-${isdarkMode ? "light" : "dark"}`}
              >
                {follow.name}
                <Onlytick role={follow.role} />
              </span>
              <span
                className={`followers mx-2 text-muted text-${
                  isdarkMode ? "light" : "dark"
                }`}
              >
                {follow.follower} Followers
              </span>
            </div>
          </div>
        </Link>
        <div
          className="d-flex flex-row align-items-center"
          style={{ marginTop: -10 }}
        >
          <Follow user={follow} />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
