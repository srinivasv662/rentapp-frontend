import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-indigo-600 text-center mb-4">Admin Dashboard</h1>

        <div className="mb-6">
          <AdminSidebar />
        </div>

        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}