import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import NavBar from "../NavBar";

const PrivateRoute = () => {
  const value = Cookies.get("pmoUser");
  const [isExpanded, setIsExpanded] = useState(false);

  if (!value) {
    return <Navigate to="/login" replace />;
  }

  const contentStyle = {
    marginLeft: isExpanded ? 240 : 80,
    transition: "margin-left 0.3s ease-in-out",
  };

  return (
    <div style={{ display: "flex" }}>
      <NavBar onExpand={setIsExpanded} />
      <div style={contentStyle}>
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateRoute;
