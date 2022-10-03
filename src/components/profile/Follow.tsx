import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IUser, Other } from "../../utils/TypeScript";
import { addfollowing, removefollowing } from "../../redux/actions/authAction";
import { RootStore } from "../../utils/TypeScript";
import { ALERT } from "../../redux/types/alertType";
import { useHistory } from "react-router-dom";

export interface IProps {
  user: Other;
}

const Follow: React.FC<IProps> = ({ user }) => {
  let { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  let history = useHistory();
  const handleClick = () => {
    if (auth.access_token) {
      dispatch(addfollowing(user._id, auth.access_token, auth));
    } else
      dispatch({
        type: ALERT,
        payload: { errors: "Please LogIn to continue." },
      });
  };
  const unfollow = () => {
    if (auth.access_token) {
      dispatch(removefollowing(user._id, auth.access_token, auth));
    }
  };
  const handelURL = () => {
    history.push(`/login?${history.location.pathname.slice(1)}`);
  };

  useEffect(() => {
    if (!auth) return;
    if (auth.user?.following === 0) return;
    if (auth.user?.followinglist.includes(user._id)) setShow(true);
    else setShow(false);
  }, [auth, history]);

  if (auth.user?._id === user._id) return <></>;
  if (!auth.access_token) {
    return (
      <button
        className="btn btn-outline-success btn-sm follow mt-2"
        style={{ height: "31px", borderRadius: "22px" }}
        onClick={handelURL}
      >
        Follow
      </button>
    );
  }

  return (
    <>
      {show ? (
        <button
          className="btn btn-outline-danger  btn-sm follow mt-2"
          style={{ height: "31px", borderRadius: "22px" }}
          onClick={unfollow}
        >
          Remove
        </button>
      ) : (
        <button
          className="btn btn-outline-success btn-sm follow mt-2"
          style={{ height: "31px", borderRadius: "22px" }}
          onClick={handleClick}
        >
          Follow
        </button>
      )}
    </>
  );
};

export default Follow;
