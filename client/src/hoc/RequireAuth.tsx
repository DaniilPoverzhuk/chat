import React from "react";
import type { PropsWithChildren } from "react";

import useAuth from "@/hooks/useAuth";

const RequireAuth: React.FC<PropsWithChildren> = ({ children }) => {
  useAuth();

  return children;
};

export default RequireAuth;
