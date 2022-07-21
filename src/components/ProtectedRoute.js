import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, isLogin = true }) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (!user && isLogin) navigate("/login");

  if (user && !isLogin) navigate("/");

  return children;
}

export default ProtectedRoute;
