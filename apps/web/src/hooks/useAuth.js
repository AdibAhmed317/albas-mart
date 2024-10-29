import { useState, useEffect } from "react";

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedExpirationTime = localStorage.getItem("expirationTime");

    const currentTime = new Date().getTime();

    setUserId(storedUserId);
    setAccessToken(storedAccessToken);

    // if (storedUserId && storedAccessToken && storedExpirationTime) {
    //   if (currentTime < parseInt(storedExpirationTime, 10)) {
    //     setIsLoggedIn(true);
    //     setUserId(storedUserId);
    //     setAccessToken(storedAccessToken);
    //   } else {
    //     localStorage.removeItem("id");
    //     localStorage.removeItem("accessToken");
    //     localStorage.removeItem("expirationTime");

    //     setIsLoggedIn(false);
    //     setUserId(null);
    //     setAccessToken(null);
    //   }
    // } else {
    //   setIsLoggedIn(false);
    //   setUserId(null);
    //   setAccessToken(null);
    // }
  }, []);

  const login = (userId, accessToken) => {};

  const logout = () => {};

  return { isLoggedIn, userId, accessToken };
}

export default useAuth;
