import { useEffect } from "react";
import { useSelector } from "react-redux";
import Hometext from "./Hometext";
const Homevert = () => {
  const { darkMode } = useSelector((state) => state);
  const { isdarkMode } = darkMode;
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div
      className={`card border-0 position-relative bg-${
        isdarkMode ? "dark" : "light"
      }`}
    >
      {/* <!-- new ad for home page and category page --> */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3982561798373930"
        data-ad-slot="6286705890"
        data-ad-format="auto"
        data-full-width-responsive="false"
      ></ins>
    </div>
  );
};

export default Homevert;
