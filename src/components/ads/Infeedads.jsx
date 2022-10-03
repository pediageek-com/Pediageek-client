import { useEffect } from "react";
import { useSelector } from "react-redux";

const Abovepost = () => {
  const { darkMode } = useSelector((state) => state);
  const { isdarkMode } = darkMode;
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    // <!-- inffef new ads -->
    <ins
      className="adsbygoogle my-3 rounded"
      style={{ display: "block" }}
      data-ad-format="fluid"
      data-ad-layout-key="-5d+by-1f-33+t1"
      data-ad-client="ca-pub-3982561798373930"
      data-ad-slot="6039094195"
    ></ins>
  );
};

export default Abovepost;
