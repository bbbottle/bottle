import { Role, useRole } from "@/hooks/use_role";
import React from "react";
import { Navigate } from "react-router-dom";

export const Auth = (props: {
  children: any;
  shouldRedirect?: boolean;
  role?: Role[];
}) => {
  const myRole = useRole();

  if (props.role && !props.role.includes(myRole)) {
    return props.shouldRedirect ? <Navigate to={"/login"} /> : null;
  }

  return props.children;
};
