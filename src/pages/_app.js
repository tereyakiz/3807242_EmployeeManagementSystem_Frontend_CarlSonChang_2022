import Header from "../components/Header";
import "antd/dist/antd.css";
import { AppContext, Provider } from "../store/AppState";
import { getTokenDetails } from "../services/authServices";
import { useEffect, useContext } from "react";
import SideMenu from "../components/SideMenu";
import "./styles/globals.css";
import "./styles/header.css";
import Login from "./login";

function _MyApp ({Component, pageProps}) {
  const { setUserInfo, setIsUserLoggedIn, isUserLoggedIn } = useContext(AppContext);
  useEffect(() => {
    async function getUserDetails () {
      try {
        const userDetails = await getTokenDetails();
        console.log(userDetails);
        if (userDetails?.jwt) {
          setUserInfo({ ...userDetails });
          setIsUserLoggedIn(true);
        } else {
          setUserInfo({});
          setIsUserLoggedIn(false);
        }
      } catch (e) {}
    }
    getUserDetails();
  }, [setUserInfo, setIsUserLoggedIn]);
  return <>
      {isUserLoggedIn && <Header />}
      <div className="main-container">
              {isUserLoggedIn && <SideMenu />}
              {isUserLoggedIn ? <Component {...pageProps} /> : <Login />}
      </div>
  </>
}

function MyApp(props) {
  console.log('_app');
  return (
    <Provider>
      <_MyApp  {...props}/>
    </Provider>
  );
}

export default MyApp;
