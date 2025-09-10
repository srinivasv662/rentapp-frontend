// src/pages/Reports.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

export default function Reports() {
  const [areaReport, setAreaReport] = useState({});
  const [wardReport, setWardReport] = useState({});
  const [propertyReport, setPropertyReport] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);

        const [areaRes, wardRes, propertyRes] = await Promise.all([
          axios.get(`${config.BASE_URL}/api/admin/reports/area`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.BASE_URL}/api/admin/reports/ward`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.BASE_URL}/api/admin/reports/property`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setAreaReport(areaRes.data);
        setWardReport(wardRes.data);
        setPropertyReport(propertyRes.data);
      } catch (err) {
        setError("Failed to load reports");
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, [token]);

  if (loading) return <p className="text-gray-600">Loading reports...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const renderTable = (data, type) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{type} Report</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">{type}</th>
            <th className="border px-4 py-2">Demand Count</th>
            <th className="border px-4 py-2">Total Demand</th>
            <th className="border px-4 py-2">Paid Demand</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{key}</td>
              <td className="border px-4 py-2">{value.demandCount}</td>
              <td className="border px-4 py-2">{value.demandTotal}</td>
              <td className="border px-4 py-2">{value.demandPaid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reports Dashboard</h1>
      {renderTable(areaReport, "Area")}
      {renderTable(wardReport, "Ward")}
      {renderTable(propertyReport, "Property")}
    </div>
  );
}
