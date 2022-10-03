import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";
import NotFound from "../global/NotFound";
import Monetary from "./Monetary";
import Tick from "./Tick";
import Helmetglobal from "../global/Helmetglobal";
import EditInfo from "./EditInfo";
import React from "react";
import Sidebard from "../ads/Sidebard";

const UserInfo = () => {
  const initState = {
    name: "",
    account: "",
    avatar: "",
    password: "",
    cf_password: "",
    about: "",
    referer: "",
    country: "",
    city: "",
    state: "",
    locality: "",
    gender: "",
  };

  const { auth, darkMode } = useSelector((state: RootStore) => state);
  const { isdarkMode } = darkMode;
  if (!auth.user) return <NotFound />;
  return (
    <>
      <Helmetglobal
        title={auth.user.name}
        description={auth.user.about}
        keyword="social profile"
      />
      <div
        className={`profile_info rounded bg-${isdarkMode ? "dark" : "light"}`}
      >
        <div className="text-center">
          <div className="info_avatar">
            <img src={auth.user.avatar} alt="avatar" />
          </div>
          <Tick role={auth.user.role} />
          <div
            className={`my-2 fs-5 fw-bold text-${
              isdarkMode ? "white" : "black"
            }`}
          >
            {auth.user.name}
          </div>
          <div className={`text-${isdarkMode ? "white" : "black"} text-muted`}>
            {auth.user.about}
          </div>

          <div className="row mt-3 mb-1" style={{ textAlign: "center" }}>
            <div className="col-6">
              <b className={`text-${isdarkMode ? "white" : "black"}`}>
                Followers
              </b>
              <p className={`text-${isdarkMode ? "white" : "black"}`}>
                {auth.user.follower}
              </p>
            </div>
            <div className="col-6">
              <b className={`text-${isdarkMode ? "white" : "black"}`}>
                Following
              </b>
              <p className={`text-${isdarkMode ? "white" : "black"}`}>
                {auth.user.following}
              </p>
            </div>
          </div>
          <br />
          <br />

          <div
            className={`bg-${isdarkMode ? "dark" : "white"} text-${
              isdarkMode ? "white" : "black"
            }`}
            style={{ display: "inline" }}
          >
            Join Date:{" "}
            <span style={{ color: "#ffc107" }}>
              {new Date(auth.user.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`profile_info text-center rounded bg-${
          isdarkMode ? "dark" : "light"
        } my-2`}
      >
        <button
          type="button"
          className={`btn btn-${isdarkMode ? "light" : "dark"} w-100 mb-2`}
          data-bs-toggle="modal"
          data-bs-target="#profileModal"
        >
          <i
            className={`fas fa-user-edit text-${isdarkMode ? "dark" : "light"}`}
          ></i>{" "}
          Edit Profile
        </button>
        <Monetary />
      </div>
      <EditInfo />
    </>
  );
};

export default UserInfo;
