import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { RootStore, IParams, Other } from "../../utils/TypeScript";
import Loading from "../global/Loading";
import SingleFollower from "./SingleFollower";
import { setFollowings } from "../../redux/actions/followAction";
interface IProps {
  id: string;
  followingno: number;
}
const Follower: React.FC<IProps> = ({ id, followingno }) => {
  const { darkMode, follow } = useSelector((state: RootStore) => state);
  const { isdarkMode } = darkMode;
  const [Following, setFollowing] = useState<Other[]>([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (
      follow.every((item) => {
        return item.id !== id;
      })
    ) {
      dispatch(setFollowings(id));
    } else {
      const data = follow.find((item) => item.id === id);
      if (data?.following_page === 1) dispatch(setFollowings(id, data));
      if (!data) return;
      setFollowing(data.followings);
    }
  }, [id, follow, history]);

  const fetchMore = () => {
    const data = follow.find((item) => item.id === id);
    dispatch(setFollowings(id, data));
  };

  if (Following.length === 0)
    return (
      <h5
        className={`text-center fw-bold my-auto text-${
          isdarkMode ? "white" : "black"
        }  py-4`}
      >
        No Followings
      </h5>
    );
  return (
    <div>
      <InfiniteScroll
        dataLength={Following.length} //This is important field to render the next data
        next={fetchMore}
        hasMore={Following.length + 1 < followingno}
        loader={<Loading />}
        scrollThreshold={0.6}
        endMessage={<></>}
      >
        {Following.map((follow) => (
          <SingleFollower key={follow._id} follow={follow} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
export default Follower;
