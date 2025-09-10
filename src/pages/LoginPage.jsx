import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import config from "../config";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginApi(email, password);
      login(data);
      const role = (data.role || "").toLowerCase();
      if (role.includes("admin") || role.includes("super")) {
        navigate("/admin");
      } else {
        navigate("/vendor");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-slate-800">
          RentPay — Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <label className="block text-sm text-slate-600 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-sky-300"
          placeholder="you@company.com"
          required
        />

        <label className="block text-sm text-slate-600 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-sky-300"
          placeholder="••••••••"
          required
        />

        <button
          type="submit"
          className="w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
