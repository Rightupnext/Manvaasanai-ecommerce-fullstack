import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";

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
import CheckOutForm from "./client Components/layout/CheckOutForm";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/checkoutform" element={<CheckOutForm />} />

        {/* Public Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="products" element={<ProductDisplay />} />
          <Route path="products/:title" element={<ProductPage />} />
          <Route path="checkoutform" element={<CheckOutForm />} />
        </Route>

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ParentChart />} />
          <Route path="category" element={<CategoryList />} />
          <Route path="category/add" element={<CategoryForm />} />
          <Route path="category/filter" element={<CategoryProductPage />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/add" element={<ProductsForm />} />
          <Route path="products/edit/:id" element={<ProductsForm />} />
        </Route>

        {/* Redirect dashboard route if unauthorized */}
        <Route path="/dashboard" element={<Navigate to="/" />} />
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
