import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import CreateTask from "./pages/CreateTask";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/CreateTask" element={<CreateTask />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
