import React from "react";
import { IBlog } from "../../utils/TypeScript";
import Comments from "./Comments";
import GoodBlog from "./GoodBlog";
import Sidebard from "../ads/Sidebard";
import { useDispatch } from "react-redux";
import { ALERT } from "../../redux/types/alertType";
import { imageUpload } from "../../utils/ImageUpload";
interface IProps {
  file: File;
}
const Imagemodal: React.FC<IProps> = ({ file }) => {
  
  
  return (
    <>
      
    </>
  );
};

export default Imagemodal;
