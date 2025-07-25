import React from "react";
import "./CSS/Admin.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import { Route, Routes, Navigate } from "react-router-dom";
import ListProduct from "../Components/ListProduct/ListProduct";

const Admin = () => {

  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path="*" element={<Navigate to="/addproduct" replace />} />
      </Routes>
    </div>
  );
};

export default Admin;
