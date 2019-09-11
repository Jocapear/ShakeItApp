import React from "react";
import Login from "./components/Login";

const routes = [
  { name: "Login", path: "/login", exact: true, main: () => <Login /> }
];

export default routes;