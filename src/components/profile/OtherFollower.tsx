import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { RootStore, IParams, Other } from "../../utils/TypeScript";
import Loading from "../global/Loading";
import SingleFollower from "./SingleFollower";
import { setFollowers } from "../../redux/actions/followAction";
interface IProps {
  id: string;
  followerno: number;
}
const Follower: React.FC<IProps> = ({ id, followerno }) => {
  const { darkMode, follow } = useSelector((state: RootStore) => state);
  const { isdarkMode } = darkMode;
  const [Follower, setFollower] = useState<Other[]>([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { slug } = useParams<IParams>();

  useEffect(() => {
    if (!id) return;
    if (
      follow.every((item) => {
        return item.id !== id;
      })
    ) {
      dispatch(setFollowers(id));
    } else {
      const data = follow.find((item) => item.id === id);
      if (data?.follower_page === 1) dispatch(setFollowers(id, data));
      if (!data) return;
      setFollower(data.followers);
    }
  }, [id, follow, history]);

  const fetchMore = () => {
    const data = follow.find((item) => item.id === id);
    dispatch(setFollowers(id, data));
  };



  if (Follower.length === 0)
    return (
      <h5
        className={`text-center fw-bold my-auto text-${
          isdarkMode ? "white" : "black"
        }  py-4`}
      >
        No Followers
      </h5>
    );


  return (
    <div>
      <InfiniteScroll
        dataLength={Follower.length} //This is important field to render the next data
        next={fetchMore}
        hasMore={Follower.length + 1 < followerno}
        loader={<Loading />}
        scrollThreshold={0.6}
        endMessage={<></>}
      >
        {Follower.map((follow) => (
          <SingleFollower key={follow._id} follow={follow} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
export default Follower;
