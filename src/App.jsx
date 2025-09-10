import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import FileUpload from "./pages/FileUpload";
import CreateDemand from "./pages/CreateDemand";
import SearchProperties from "./pages/SearchProperties";
import Reports from "./pages/Reports";
import Reconciliation from "./pages/Reconciliation";
import config from "./config";

// function AdminDashboard() {
//   return <h1>Admin Dashboard</h1>;
// }

// function VendorDashboard() {
//   return <h1>Vendor Dashboard</h1>;
// }

function ProtectedRoute({ children, role }) {
  const { auth } = useContext(AuthContext);
  if (!auth) return <Navigate to="/login" />;
  if (role && auth.role !== role) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="SUPER_ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route
              path="users-upload"
              element={
                <FileUpload
                  uploadUrl={`${config.BASE_URL}/api/admin/vendors/upload`}
                  title="Upload Users Excel"
                />
              }
            />
            <Route
              path="properties-upload"
              element={
                <FileUpload
                  uploadUrl="/api/admin/properties/upload"
                  title="Upload Properties Excel"
                />
              }
            />
            <Route
              path="demands"
              element={
                <ProtectedRoute role="SUPER_ADMIN">
                  <CreateDemand />
                </ProtectedRoute>
              }
            />

            <Route
              path="search-properties"
              element={
                <ProtectedRoute role="SUPER_ADMIN">
                  <SearchProperties />
                </ProtectedRoute>
              }
            />

            <Route
              path="reports"
              element={
                <ProtectedRoute role="SUPER_ADMIN">
                  <Reports />
                </ProtectedRoute>
              }
            />

            <Route
              path="reconciliation"
              element={
                <ProtectedRoute role="SUPER_ADMIN">
                  <Reconciliation />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/vendor"
            element={
              <ProtectedRoute role="VENDOR">
                <VendorDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
