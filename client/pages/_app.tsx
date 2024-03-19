import React, { FC, useEffect } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { wrapper } from "../store";
import { jwtDecode } from "jwt-decode";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded?.exp && decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
};

export default MyApp;
