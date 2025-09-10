import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminSidebar() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-center gap-3 flex-wrap">
      <Link to="/admin/users-upload" className="px-3 py-2 rounded-lg hover:bg-slate-100">
        Upload Vendors
      </Link>
      <Link to="/admin/properties-upload" className="px-3 py-2 rounded-lg hover:bg-slate-100">
        Upload Properties
      </Link>
      <Link to="/admin/demands" className="px-3 py-2 rounded-lg hover:bg-slate-100">
        Demands
      </Link>
      <Link to="/admin/search-properties" className="px-3 py-2 rounded-lg hover:bg-slate-100">
        Search Properties
      </Link>
      <Link to="/admin/reports" className="px-3 py-2 rounded-lg hover:bg-slate-100">
        Reports
      </Link>
      <Link to="/admin/reconciliation" className="px-3 py-2 rounded-lg hover:bg-slate-100">
        Reconciliation
      </Link>

      <button
        onClick={handleLogout}
        className="ml-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </nav>
  );
}
