import React, { useEffect, useRef, useCallback, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { shallowEqual, useDispatch } from "react-redux";
import { checkImage, imageUpload } from "../../utils/ImageUpload";
import { ALERT } from "../../redux/types/alertType";
import { useSelector } from "react-redux";
import { IBlog, RootStore } from "../../utils/TypeScript";
import ImageModal from "../blog/ImageModal";
import { postAPI } from "../../utils/FetchData";

interface IProps {
  setBody: (value: string) => void;
  body: string;
  id?: string;
}

const Quill: React.FC<IProps> = ({ setBody, body, id }) => {
  const dispatch = useDispatch();
  const quillRef = useRef<ReactQuill>(null);
  const [image, setImage] = useState<File>();
  const [about, setAbout] = useState("");
  const [range, setRange] = useState(0);
  const { auth } = useSelector((state: RootStore) => state);
  const modules = {
    toolbar: { container },
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    // , imageResize: {
    //     parchment: Quill.import('parchment'),
    //     displaySize: true
    // }
  };
  const regex = /style=".*?"/gi;

  $("#staticBackdrop").on("shown.bs.modal", function () {
    $("#aboutimage").trigger("focus");
  });

  useEffect(() => {
    if (image) $("#imagemodal").trigger("click");
  }, [image]);

  // Custom image
  const handleChangeImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = async () => {
      const files = input.files;
      if (!files)
        return dispatch({
          type: ALERT,
          payload: { errors: "File does not exist." },
        });
      const file = files[0];
      const check = checkImage(file);
      if (check) return dispatch({ type: ALERT, payload: { errors: check } });
      let quill = quillRef.current;
      const a = quill?.getEditor().getSelection()?.index;
      if (a) setRange(a);
      setImage(file);
    };
  }, [dispatch]);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    let toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", handleChangeImage);
  }, [handleChangeImage]);

  const { darkMode } = useSelector((state: RootStore) => state);
  const { isdarkMode } = darkMode;

  const handelImage = async () => {
    if (!image) return;
    if (about.length < 50)
      return dispatch({
        type: ALERT,
        payload: { errors: "Write atleas 50 letters in about image." },
      });

    $("#imagemodalclose").trigger("click");
    dispatch({ type: ALERT, payload: { loading: true } });
    var photo;
    if (auth.access_token) photo = await imageUpload(image, auth.access_token);
    let quill = quillRef.current;
    if (range !== undefined) {
      quill?.getEditor().insertEmbed(range, "image", `${photo.url}`);
    }
    quill?.getEditor().setSelection(range, 0);
    dispatch({ type: ALERT, payload: { loading: false } });
    postAPI(
      "saveimage",
      { link: photo.url, about, blog: id },
      auth.access_token
    );
    setImage(undefined);
    setAbout("");
  };


  return (
    <>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Create something Epic..."
        value={body}
        onChange={(e) => {
          setBody(e);
        }}
        ref={quillRef}
        id="createblog"
      />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        id="imagemodal"
      ></button>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Insert Image
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="imagemodalclose"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group position-relative">
                <textarea
                  className="form-control py-3 my-1"
                  rows={1}
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                  name="description"
                  placeholder="About image helps in ranking of blog..."
                  id="aboutimage"
                  style={{
                    border: "none",
                    borderBottom: `2px solid `,
                    padding: "15px 10px",
                    outline: "none",
                    background: "transparent",
                    resize: "none",
                  }}
                />

                <small
                  className={`position-absolute`}
                  style={{ bottom: 0, right: "3px", opacity: "0.3" }}
                >
                  {about.length}/50
                </small>
              </div>
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  className="w-100 h-100"
                  alt="thumbnail"
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handelImage}
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

let container = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, false] }],
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"], // dropdown with defaults from theme
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ align: [] }],
  ["clean", "link", "image", "video"],
];
export default Quill;
