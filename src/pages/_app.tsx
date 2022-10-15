import { Provider } from "react-redux";
import store from "../redux/store";
function App({ Component, pageProps }) { 
  return(
  <Component {...pageProps}/>

  );
}
export default App;
