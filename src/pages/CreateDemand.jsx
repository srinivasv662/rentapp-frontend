import React, { useState } from "react";
import axios from "axios";
import config from "../config";

export default function CreateDemand() {
  const [formData, setFormData] = useState({
    vendorId: "",
    propertyId: "",
    amount: "",
    dueDate: "",
  });

  const [message, setMessage] = useState("");
  const [properties, setProperties] = useState([]); // store fetched properties

  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // when vendorId changes, fetch properties for that vendor
  const handleVendorBlur = async () => {
    if (!formData.vendorId) return;

    try {
      const res = await axios.get(
        `${config.BASE_URL}/api/admin/vendors/${formData.vendorId}/properties`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProperties(res.data || []);
      setFormData((prev) => ({ ...prev, propertyId: "" })); // reset propertyId
    } catch (err) {
      console.error("Failed to fetch properties", err);
      setProperties([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${config.BASE_URL}/api/admin/demands`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Demand created successfully!");
      setFormData({ vendorId: "", propertyId: "", amount: "", dueDate: "" });
      setProperties([]);
    } catch (err) {
      setMessage("Failed to create demand.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Create Demand</h2>
      {message && <div className="mb-4 text-red-500">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Vendor ID */}
        <div>
          <label className="block mb-1">Vendor ID</label>
          <input
            type="text"
            name="vendorId"
            value={formData.vendorId}
            onChange={handleChange}
            onBlur={handleVendorBlur} // fetch properties when user leaves vendorId input
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Property ID dropdown */}
        <div>
          <label className="block mb-1">Property ID</label>
          <select
            name="propertyId"
            value={formData.propertyId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
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

        {/* Amount */}
        <div>
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
}
