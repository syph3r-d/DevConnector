import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.baseURL = "http://localhost:5000/"; // Set the base URL for axios requests
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
