import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
  Outlet,
} from "react-router-dom";

import "./css/style.css";
import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Home from "./client Components/Components/Home";
import Navbar from "./client Components/Pages/Navbar";
import SignIn from "./client Components/Components/signIn";
import SignUp from "./client Components/Components/SignUp";
import Layout from "./client Components/layout/Layout";
import ProductDisplay from "./client Components/layout/ProductDisplay";
import ProductPage from "./client Components/layout/Productpage";
import CategoryList from "./admin Components/Category/CategoryList";
import CategoryForm from "./admin Components/Category/CategoryForm";
import CategoryProductPage from "./admin Components/Category/CategoryProductPage";
import ProductsList from "./admin Components/Products/productList";
import ProductsForm from "./admin Components/Products/ProductForm";
import ParentChart from "./partials/dashboard/ParentChart";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (
      isAuthenticated === false &&
      location.pathname.startsWith("/dashboard")
    ) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <> {isAuthenticated === false ? (
      <Navbar />):""}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Public Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="products" element={<ProductDisplay />} />
          <Route path="products/:title" element={<ProductPage />} />
        </Route>

        {/* Protected Dashboard Route */}
        {isAuthenticated === true ? (
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<ParentChart />} />
            <Route path="category" element={<CategoryList />} />
            <Route path="category/add" element={<CategoryForm />} />
            <Route path="category/filter" element={<CategoryProductPage />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="products/add" element={<ProductsForm />} />
          </Route>
        ) : (
          isAuthenticated === false && (
            <Route path="/dashboard" element={<Navigate to="/" />} />
          )
        )}
      </Routes>
    </>
  );
}
function DashboardLayout() {
  return (
    <Dashboard>
      <Outlet />
    </Dashboard>
  );
}

export default App;
