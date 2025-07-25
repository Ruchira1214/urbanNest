import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin";
import AdminLogin from "./Pages/AdminLogin";

export const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
export const currency = '₹';

function App() {
  const isLoggedIn = localStorage.getItem('admin-auth');
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/*" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
