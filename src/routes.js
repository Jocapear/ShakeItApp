import React from "react";
import Login from "./components/Login";
import Join from "./components/Join";

const routes = [
  { name: "Join", path: "/", exact: true, main: () => <Join /> },
  { name: "Login", path: "/login", exact: true, main: () => <Login /> },
];

export default routes;
