import { Navigate, useLocation } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/sign-in"} state={{ from: location }} replace />;
};

export default PrivateRoute;
