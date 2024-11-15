import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import CreateTask from "./pages/CreateTask";
import Footer from "./components/Footer";
import Reports from "./components/Reports";
import PrivateRoute from "./components/PrivateRoute";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
