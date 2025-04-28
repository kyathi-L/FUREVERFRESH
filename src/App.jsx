import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "@mui/material";

// Layouts
import UserLayout from "./pages/UserLayout";
import AdminLayout from "./admin/AdminLayout";

// Contexts
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

// Components
import Footer from "./components/Footer";

// Public & User Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SelectAuth from "./pages/SelectAuth";
import SelectLoginRole from "./pages/SelectLoginRole";
import SelectRegisterRole from "./pages/SelectRegisterRole";

// User Pages
import Services from "./pages/Services";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";
import BookedServices from "./pages/BookedServices";
import Payments from "./pages/Payments";
import Adopt from "./pages/Adopt";
import ViewCart from "./pages/ViewCart";

// Admin Pages
import AdminLogin from "./admin/AdminLogin";
import AdminHome from "./admin/AdminHome";
import Users from "./admin/Users";
import Ser from "./admin/Ser";
import Dashboard from "./admin/Dashboard";
import AdminSupplier from "./admin/AdminSupplier";
import Market from "./admin/Market";
import Adoption from "./admin/Adoption";

// Supplier Pages
import RegisterSupplier from "./supplier/RegisterSupplier";
import LoginSupplier from "./supplier/LoginSupplier";
import SupplierDashboard from "./supplier/SupplierDashboard";
import ProductManagement from "./supplier/pages/ProductManagement";
import SupplierProducts from "./supplier/pages/SupplierProducts";
import SupplierProfile from "./supplier/SupplierProfile";
import SupplierProfileWrapper from "./supplier/SupplierProfileWrapper";

const AppContent = () => {
  return (
    <div className="app-container">
      <GlobalStyles />
      <div className="content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/select-auth" element={<SelectAuth />} />
          <Route path="/select-register-role" element={<SelectRegisterRole />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/select-login-role" element={<SelectLoginRole />} />

          {/* User Routes (wrapped in UserLayout) */}
          <Route element={<UserLayout />}>
            <Route path="/services" element={<Services />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/mybookings" element={<BookedServices />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/adopt" element={<Adopt />} />
            <Route path="/view-cart/:email" element={<ViewCart />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/login-admin" element={<AdminLogin />} />
          <Route path="/admin-home" element={<AdminLayout><AdminHome /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><Users /></AdminLayout>} />
          <Route path="/admin/services" element={<AdminLayout><Ser /></AdminLayout>} />
          <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/supplier" element={<AdminLayout><AdminSupplier /></AdminLayout>} />
          <Route path="/admin/market" element={<AdminLayout><Market /></AdminLayout>} />
          <Route path="/admin/adoption" element={<AdminLayout><Adoption /></AdminLayout>} />

          {/* Supplier Routes */}
          <Route path="/register-supplier" element={<RegisterSupplier />} />
          <Route path="/login-supplier" element={<LoginSupplier />} />
          <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
          <Route path="/supplier/products" element={<ProductManagement />} />
          <Route path="/supplier/products-view" element={<SupplierProducts />} />
          <Route path="/supplier-profile/:id" element={<SupplierProfile />} />
          <Route path="/supplier/profile/:id" element={<SupplierProfileWrapper />} />
        </Routes>
      </div>

      {/* Optional: Hide Footer on admin pages if needed */}
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <AppContent />
        </Router>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
