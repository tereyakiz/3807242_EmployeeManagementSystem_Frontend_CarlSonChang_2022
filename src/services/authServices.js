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
    // resolve({
    //   jwt: "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiIwNzk0MDMyMS02ZGMyLTQwYzgtOTQ4Zi00NzdjNzQ2YmM2ZTUiLCJzdWIiOiJwcmFrYXNobW9oaXQxQGdtYWlsLmNvbSIsImV4cCI6MTY0ODk1NzkzNywiaWF0IjoxNjQ3NzQ4MzM3LCJhY2NvdW50VXNlcklkIjoiZjdjNzEzYmUtYTcxOS00ZTVjLTgxZGYtZDI0OGRjYzZmMjIxIiwicmVmcmVzaFRva2VuIjoiNDgwN2I1ODktYjEyMS00MmY5LWE3MjQtMThlNDc4OTE3ZmIyIn0.mCvc9HA3DxCtMPkSr61sw9T0vDRKw1-gUbEhj72f6CQ",
    //   user: {
    //     accountId: "07940321-6dc2-40c8-948f-477c746bc6e5",
    //     createdAt: 1647542782782,
    //     createdBy: "f7c713be-a719-4e5c-81df-d248dcc6f221",
    //     lastModifiedAt: 1647542782782,
    //     lastModifiedBy: "f7c713be-a719-4e5c-81df-d248dcc6f221",
    //     version: 1,
    //     accountUserId: "f7c713be-a719-4e5c-81df-d248dcc6f221",
    //     email: "prakashmohit1@gmail.com",
    //     firstname: "Mohit",
    //     lastname: "Prakash",
    //     status: "ENABLED",
    //     profilePictureDownloadURL: null,
    //     accountUserType: "ADMIN",
    //   },
    //   tokenInfo: {
    //     accountId: "07940321-6dc2-40c8-948f-477c746bc6e5",
    //     sub: "prakashmohit1@gmail.com",
    //     exp: 1648957937,
    //     iat: 1647748337,
    //     accountUserId: "f7c713be-a719-4e5c-81df-d248dcc6f221",
    //     refreshToken: "4807b589-b121-42f9-a724-18e478917fb2",
    //   },
    // });
  });
};
