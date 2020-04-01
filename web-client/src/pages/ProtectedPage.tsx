import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { AppState } from "src/store";

import { LoginLocation } from "./routes/LoginRoute/constants";

interface ProtectedPageProps {
  children: React.ReactNode;
}
const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const token = useSelector((state: AppState) => state.auth.token);
  const history = useHistory();
  const location = useLocation();

  if (!token) {
    history.replace({
      pathname: LoginLocation.path,
      state: { redirectBack: location.pathname }
    });
    return null;
  }
  return <>{children}</>;
};

export default ProtectedPage;
