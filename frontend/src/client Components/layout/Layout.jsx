import React, { useState } from "react";
import { Outlet } from "react-router-dom";
function DashboardLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default DashboardLayout;
