import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

function AuthRoute({ children }) {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAppSelector(
    (store) => store.authentication
  );

  useEffect(() => {
    if (user && isAuthenticated) {
      navigate("/programs");
    } else {
      navigate("/");
    }
  }, [user, navigate, isAuthenticated]);

  return children;
}

export default AuthRoute;
