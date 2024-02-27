import { Outlet } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import { useAppSelector } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PageLayout() {
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.authentication);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default PageLayout;
