import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { IBlog, RootStore } from "../utils/TypeScript";
import CardVert from "../components/cards/CardVert";
import Loading from "../components/global/Loading";
import Helmetglobal from "../components/global/Helmetglobal";
import { getHomeBlogs } from "../redux/actions/blogAction";
import InfiniteScroll from "react-infinite-scroll-component";
import Referal from "../components/global/Referal";
import { Link } from "react-router-dom";
import Homevert from "../components/ads/Infeedads";
import Aibox from "../components/global/Preferance";
import Todays from "../components/global/Todays";
import Sidebard from "../components/ads/Sidebard";
import store from "../redux/store";
import { DARK_MODE } from "../redux/types/modeType";

const Home = () => {
  const { homeBlogs, darkMode, auth } = useSelector(
    (state: RootStore) => state
  );
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setHasMore(homeBlogs.count <= homeBlogs.total);
  }, [homeBlogs]);
  const fetchMore = () => {
    dispatch(getHomeBlogs(`?page=${homeBlogs.count + 1}`, auth));
    return;
  };

  if (homeBlogs.blogs.length === 0) return <Loading />;

  return (
    <>
      <Aibox />
      <Referal />
      <Helmetglobal
        title="PediaGeek"
        description="PediaGeek is the best way to express your idea to the World."
        keyword="Home,explore,blogs,social_media"
      />
      <div className="home_page my-2 row justify-content-evenly position-relative">
        <div style={{ maxWidth: "622px" }} className="col-12 col-lg-7 px-0">
          {/* <Todays /> */}
          <InfiniteScroll
            dataLength={homeBlogs.count * 8} //This is important field to render the next data
            next={fetchMore}
            hasMore={hasMore}
            loader={<Loading />}
            scrollThreshold={0.6}
            endMessage={<></>}
          >
            <div className={`home_blogs`}>
              {homeBlogs.blogs.map((blog, index) => (
                <>
                  <CardVert key={index} blog={blog} />
                  {index % 5 === 0 && <Homevert />}
                </>
              ))}
            </div>
          </InfiniteScroll>
        </div>
        <div
          className="col-12 col-lg-4 position-sticky"
          style={{ maxHeight: "100vh", top: 0 }}
        >
          <Sidebard />
          <Sidebard />
        </div>
      </div>
    </>
  );
};
export default Home;
