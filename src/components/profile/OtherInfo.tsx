import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOtherInfo } from "../../redux/actions/userAction";
import { RootStore, IUser } from "../../utils/TypeScript";
import Helmetglobal from "../global/Helmetglobal";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Loading from "../global/Loading";
import Follow from "./Follow";
import Tick from "./Tick";
TimeAgo.addDefaultLocale(en);
interface IProps {
  id: string;
}

const OtherInfo: React.FC<IProps> = ({ id }) => {
  const [other, setOther] = useState<IUser>();
  const timeAgo = new TimeAgo("en-US");
  const { otherInfo, darkMode, auth } = useSelector(
    (state: RootStore) => state
  );
  const dispatch = useDispatch();
  const { isdarkMode } = darkMode;
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

  if (!other) return <Loading />;
  return (
    <div
      className={`profile_info text-center rounded bg-${
        isdarkMode ? "dark" : "light"
      }`}
    >
      <Helmetglobal
        title={other.name}
        description={other.about}
        keyword="social profile"
      />
      <div className="info_avatar">
        <img src={other.avatar} alt="avatar" />
      </div>
      <Tick role={other.role} />

      <div
        className={`my-2 fs-5 fw-bold text-${isdarkMode ? "white" : "black"}`}
      >
        {other.name}
      </div>

      <div className={`text-${isdarkMode ? "white" : "black"} text-muted`}>
        {other.about}
      </div>

      <div className="row mt-3 mb-1" style={{ textAlign: "center" }}>
        <div className={`col-6 text-${isdarkMode ? "white" : "black"}`}>
          <b>Followers</b>
          <p>{other.follower}</p>
        </div>
        <div className={`col-6 text-${isdarkMode ? "white" : "black"}`}>
          <b>Following</b>
          <p>{other.following}</p>
        </div>
      </div>
      <Follow user={other} />
      <br />
      <br />
      <div
        className={`bg-${isdarkMode ? "dark" : "light"} text-${
          isdarkMode ? "white" : "black"
        }`}
        style={{ display: "inline" }}
      >
        Joined:{" "}
        <span style={{ color: "#ffc107" }}>
          {timeAgo.format(new Date(other.createdAt))}
        </span>
      </div>
    </div>
  );
};

export default OtherInfo;
