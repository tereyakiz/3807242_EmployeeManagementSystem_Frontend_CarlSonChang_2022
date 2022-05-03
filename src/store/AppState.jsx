import React, { useState } from "react";

export const AppContext = React.createContext(null);

export function Provider ({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const context = {
    userInfo,
    isUserLoggedIn,
    users,
    jobs,
    setUserInfo,
    setIsUserLoggedIn,
    setUsers,
    setJobs
  }
  return <AppContext.Provider value={context}>
    {children}
  </AppContext.Provider>
}
