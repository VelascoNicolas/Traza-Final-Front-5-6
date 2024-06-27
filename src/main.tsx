import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-8qdogwh8uubh8qgz.us.auth0.com"
      clientId="xhMHc3nocA0726QD697jsJlVdTkXXJdB"
      cacheLocation="localstorage"
      authorizationParams={{
        audience: "https://Auth0Example.com",
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
