import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PageRender from "./PageRender";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import { Alert } from "./components/alert/Alert";
import { refreshToken } from "./redux/actions/authAction";
import { getCategories } from "./redux/actions/categoryAction";
import { getHomeBlogs } from "./redux/actions/blogAction";
import io from "socket.io-client";
import SocketClient from "./SocketClient";
import Category from "./components/global/Categories";
import { RootStore } from "./utils/TypeScript";
import { API_TESTING_URL } from "./utils/config";

const App = () => {
  const { homeBlogs, categories, darkMode, auth } = useSelector(
    (state: RootStore) => state
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (
      (localStorage.getItem("logged") !== "pediageek" || auth.user) &&
      homeBlogs.blogs.length === 0
    )
      dispatch(getHomeBlogs(`?page=${1}`, auth));
  }, [auth, homeBlogs, dispatch]);

  useEffect(() => {
    const socket = io(API_TESTING_URL);
    dispatch({ type: "SOCKET", payload: socket });
    return () => {
      socket.close();
    };
  }, [dispatch]);

  return (
    <div className="container-fluid" style={{ overflow: "clip" }}>
      <SocketClient />
      <Router>
        <Alert />
        {/* <div className="fixed-top" style={{ width: "100vw" }}></div> */}
        <div
          className="row"
          // style={{ display: "grid", gridTemplateColumns: "23% 54% 23%" }}
        >
          <div className="col-0 col-md-3">
            <Header />
          </div>

          <div className="col-12 col-md-9 px-0">
            <Category />
            <Switch>
              <Route exact path="/" component={PageRender} />
              <Route exact path="/:page" component={PageRender} />
              <Route exact path="/:page/:slug" component={PageRender} />
              <Route exact path="/:page/:slug/:title" component={PageRender} />
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
