import React from "react";
import { Navigate } from "react-router-dom";
import SupplierProfile from "./SupplierProfile"; // adjust path if needed

const SupplierProfileWrapper = () => {
  const supplierInfo = JSON.parse(localStorage.getItem("supplierInfo"));
  const supplierId = supplierInfo?.id || supplierInfo?._id; // fallback

  if (!supplierId) {
    return <Navigate to="/login-supplier" />;
  }

  return <SupplierProfile supplierId={supplierId} />;
};

export default SupplierProfileWrapper;
