import { RootStore } from "../../utils/TypeScript";
import { useSelector } from "react-redux";
const Loading = () => {
  const { darkMode } = useSelector((state: RootStore) => state);
  const { isdarkMode } = darkMode;
  return (
    <div className="d-flex justify-content-center my-4">
      <div
        className={`spinner-grow text-${isdarkMode ? "light" : "dark"}`}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
