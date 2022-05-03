import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../../store/AppState";
import LandingMain from "./LandingMain";

const Login = () => {

  const router = useRouter();
  const { isUserLoggedIn } = useContext(AppContext);
    useEffect(() => {
        if (isUserLoggedIn) {
            router.push('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <>
      <LandingMain />
    </>
  );
};

export default Login;
