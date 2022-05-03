import { getCookie } from "../common/utils";

export default function commomServices (url, method, body, excludeToken = false) {
  const configs = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
  };
  if (excludeToken) {
    delete configs.headers.Authorization;
  }
  if (body) {
    configs.body = JSON.stringify(body);
  }
  return new Promise((resolve, rej) => {
    fetch(url, configs)
      .then(async (res) => {
        try {
          return await res.json();
        } catch (err) {
          console.log(err);
          return res;
        }
      })
      .then((res) => resolve(res))
      .catch((err) => rej(err));
  });
}
