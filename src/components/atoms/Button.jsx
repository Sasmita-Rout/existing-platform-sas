import React from "react";
import { Button as MUIButton } from "@mui/material";

const Button = (props) => {
  return <MUIButton {...props}>{props.children}</MUIButton>;
};

export default Button;
