import React, { useState } from "react";
import axios from "axios";

export default function CreateDemand() {
  const [vendorId, setVendorId] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [properties, setProperties] = useState([]);
  const [amount, setAmount] = useState("");

  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  const handleVendorChange = async (e) => {
    const value = e.target.value;
    setVendorId(value);
    setPropertyId(""); // reset selected property
    setProperties([]); // reset options

    if (value) {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/admin/vendors/${value}/properties`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProperties(res.data);
      } catch (err) {
        console.error("Failed to fetch properties", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/admin/demands",
        { vendorId, propertyId, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Demand created successfully!");
      setVendorId("");
      setPropertyId("");
      setAmount("");
    } catch (err) {
      alert("Failed to create demand");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Demand</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Vendor ID input */}
        <div>
          <label className="block font-semibold">Vendor ID</label>
          <input
            type="text"
            value={vendorId}
            onChange={handleVendorChange}
            className="border p-2 w-full rounded"
            placeholder="Enter Vendor ID"
          />
        </div>

        {/* Property dropdown */}
        <div>
          <label className="block font-semibold">Property ID</label>
          <select
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            className="border p-2 w-full rounded"
            disabled={!properties.length}
          >
            <option value="">-- Select Property --</option>
            {properties.map((pid) => (
              <option key={pid} value={pid}>
                {pid}
              </option>
            ))}
          </select>
        </div>

        {/* Demand amount */}
        <div>
          <label className="block font-semibold">Demand Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="Enter Amount"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Demand
        </button>
      </form>
    </div>
  );
}
