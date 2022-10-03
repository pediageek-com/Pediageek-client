import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { googleLogin } from "../../redux/actions/authAction";

const SocialLogin = (referer) => {
  const { darkMode, auth } = useSelector((state) => state);
  const { isdarkMode } = darkMode;
  const history = useHistory();
  const dispatch = useDispatch();
  const onSuccess = (response) => {
    console.log(response);
    dispatch(googleLogin(response.credential, referer));
  };

  useEffect(() => {
    window.google?.accounts?.id.initialize({
      client_id:
        "470831587453-n1i1ee8jvgdoh3c0q7rv50h1ttfrusk3.apps.googleusercontent.com",
      callback: onSuccess,
    });
    window.google?.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {
        theme: "filled_dark",
        size: "large",
        width: 293,
        shape: "pill",
        text: "continue_with",
      }
    );
  }, []);

  return <div id="buttonDiv" style={{ margin: "0px auto" }}></div>;
};

export default SocialLogin;
