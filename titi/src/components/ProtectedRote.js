import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";

function ProtectedRote({ childern }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo ? childern : <Navigate to="/signin" />;
}

export default ProtectedRote;
