import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getCategoryBySearch,
} from "../../redux/actions/blogAction";

import { RootStore, IParams, IBlog } from "../../utils/TypeScript";

import Loading from "../../components/global/Loading";
import CardVert from "../../components/cards/CardVert";
import Helmetglobal from "../../components/global/Helmetglobal";
import Homevert from "../../components/ads/Infeedads";
import Sidebard from "../../components/ads/Sidebard";
import InfiniteScroll from "react-infinite-scroll-component";

const BlogsByCategory = () => {
  const { categories, blogsCategory, darkMode, auth } = useSelector(
    (state: RootStore) => state
  );
  const dispatch = useDispatch();
  const { isdarkMode } = darkMode;
  const { slug } = useParams<IParams>();
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState("");
  const [blogs, setBlogs] = useState<IBlog[]>();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const category = categories.find((item) => item.name === slug);
    if (category?._id) {
      setCategoryId(category._id);
      setCategory(category.name);
      if (auth.access_token)
        dispatch(getCategoryBySearch(category._id, category.name, 1, auth));
      else dispatch(getCategoryBySearch(category._id, slug, 1));
    }
  }, [slug, history, categories]);

  useEffect(() => {
    if (!categoryId) return;
    const data = blogsCategory.find((item) => item.id === categoryId);
    if (!data) return;
    setBlogs(data.blogs);
    setTotal(data.total);
    setPage(data.page);
  }, [categoryId, blogsCategory, dispatch, history]);

  const fetchMore = () => {
    if (auth.access_token)
      dispatch(getCategoryBySearch(categoryId, category, page, auth));
    else dispatch(getCategoryBySearch(categoryId, category, page));
  };

  if (!blogs) return <Loading />;
  return (
    <div className="my-2">
      <Helmetglobal
        title={`${slug} Blogs`}
        description={`Blogs from ${slug} category.`}
        keyword={slug}
      />
      <div className="home_page my-2 row justify-content-evenly position-relative">
        <div style={{ maxWidth: "622px" }} className="col-12 col-lg-7 px-0">
          <div className="home_blogs">
            <InfiniteScroll
              dataLength={page * 8} //This is important field to render the next data
              next={fetchMore}
              hasMore={blogs.length < total}
              loader={<Loading />}
              scrollThreshold={0.6}
              endMessage={
                <p
                  style={{
                    textAlign: "center",
                    color: isdarkMode ? "white" : "black",
                  }}
                >
                  <b>. . .</b>
                </p>
              }
            >
              <div className="show_blogs">
                {blogs.map((blog, index) => (
                  <>
                    <CardVert key={blog._id} blog={blog} />
                    {index % 6 === 0 && <Homevert />}
                  </>
                ))}
              </div>{" "}
            </InfiniteScroll>
          </div>
        </div>
        <div
          className="col-12 col-lg-4 position-sticky"
          style={{ maxHeight: "100vh", top: 0 }}
        >
          <Sidebard />
          <Sidebard />
        </div>
      </div>
    </div>
  );
};

export default BlogsByCategory;
