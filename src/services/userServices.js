import apiendpoints from "../common/apiendpoints";
import method from "../common/method";
import commonServices from "./commonServices";

export const getUsers = () => {
  return commonServices(apiendpoints.getUsers(), method.GET);
};
export const addUser = (req) => {
  return commonServices(apiendpoints.addUser(), method.POST, req);
};

export const getUserById = (userId) => {
  return commonServices(apiendpoints.getUserById(userId), method.GET);
};

export const updateUser = (req, userId) => {
  return commonServices(apiendpoints.updateUser(userId), method.PUT, req);
};
export const deleteUser = (userId) => {
  return commonServices(apiendpoints.deleteUser(userId), method.DELETE);
};
export const signUpUser = (req) => {
  return commonServices(apiendpoints.signUpUser(), method.POST, req, true)
}