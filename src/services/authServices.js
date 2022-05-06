import apiendpoints from "../common/apiendpoints";
import method from "../common/method";
import { getCookie } from "../common/utils";

export const login = (body) => {
  const configs = {
    method: method.POST,
    headers: { "Content-Type": "application/json" },
  };
  if (body) {
    configs.body = JSON.stringify(body);
  }
  return new Promise((resolve, rej) => {
    fetch(apiendpoints.login(), configs)
      .then((res) => res.json())
      .then((res) => resolve(res));
  });
};

export const getTokenDetails = () => {
  const configs = {
    method: method.GET,
    headers: { "Content-Type": "application/json" },
  };
  return new Promise((resolve, rej) => {
    fetch(apiendpoints.getToken(getCookie("jwt")), configs)
      .then((res) => res.json())
      .then((res) => resolve(res));
   
  });
};
