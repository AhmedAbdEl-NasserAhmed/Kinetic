import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage/AuthenticationPage";
import ProgramsPage from "./pages/ProgramsPage/ProgramsPage";
import EmailVerficationPage from "./pages/EmailVerficationPage/EmailVerficationPage";
import ProgramDays from "./pages/ProgramDays/ProgramDays";
import WorkoutsPage from "./pages/WorkoutsPage/WorkoutsPage";
import AuthRoute from "./ui/AuthRoute/AuthRoute";
import PageLayout from "./ui/PageLayout/PageLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />

        <Route element={<PageLayout />}>
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:id" element={<ProgramDays />} />
          <Route path="/programs/:id/:name" element={<WorkoutsPage />} />
        </Route>

        <Route path="/emailVerfication" element={<EmailVerficationPage />} />
      </Routes>
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
    </BrowserRouter>
  );
}

export default App;
