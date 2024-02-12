import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage/AuthenticationPage";
import WorkoutsPage from "./pages/WorkoutsPage/WorkoutsPage";
import ProtectRoute from "./ui/ProtectRoute/ProtectRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectRoute>
                <LoginPage />
              </ProtectRoute>
            }
          />
          <Route
            path="/programs"
            element={
              <ProtectRoute>
                <WorkoutsPage />
              </ProtectRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid transparent",
            padding: "25px",
            color: "green",
            fontSize: "12px",
            background: "white",
          },
          success: {
            style: {
              background: "white",
            },
          },
          error: {
            style: {
              color: "red",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
