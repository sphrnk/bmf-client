import React, {useCallback, useEffect, useState} from "react";

let logoutTimer;
const AuthContext = React.createContext({
    user: null,
    token: "",
    isLoggedIn: false,
    login: (user, token, expirationTime) => {
    },
    logout: () => {
    },
});
const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    console.log(remainingDuration);
    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedExpirationTime = localStorage.getItem("expirationTime");
    console.log(storedToken);
    console.log(storedExpirationTime);
    const remainingTime = calculateRemainingTime(storedExpirationTime);
    if (remainingTime <= 1000) {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        return null;
    }
    return {
        token: storedToken,
        user: storedUser,
        duration: remainingTime,
    };
};

export const AuthContextProvider = (props) => {
    const data = retrieveStoredToken();
    let initialToken;
    let initialUser;
    if (data) {
        initialToken = data.token;
        initialUser = JSON.parse(data.user);
    }
    const [user, setUser] = useState(initialUser);
    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("expirationTime");
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (user, token, expirationTime) => {
        console.log(user);
        setToken(token);
        setUser(user);

        // localStorage.setItem("token", token);
        // localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("expirationTime", expirationTime);
        const remainingTime = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    useEffect(() => {
        if (data) {
            logoutTimer = setTimeout(logoutHandler, data.duration);
        }
    }, [data, logoutHandler]);
    const contextValue = {
        user,
        token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};
export default AuthContext;
