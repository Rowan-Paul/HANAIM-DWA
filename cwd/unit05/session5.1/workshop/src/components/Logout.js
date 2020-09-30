import React from "react";
import { Redirect } from "react-router-dom";

import AuthenticationAPI from "../api/AuthenticationAPI";

export const Logout = () => {
  AuthenticationAPI.logout();
  return <Redirect to="/" />;
};
