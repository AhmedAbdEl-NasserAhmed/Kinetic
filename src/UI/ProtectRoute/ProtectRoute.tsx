import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks.ts/hooks";

function ProtectRoute({ children }) {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAppSelector(
    (store) => store.authentication
  );

  console.log();

  useEffect(() => {
    if (user && isAuthenticated) {
      navigate("/programs");
    } else {
      navigate("/");
    }
  }, [user, navigate, isAuthenticated]);

  return children;
}

export default ProtectRoute;
