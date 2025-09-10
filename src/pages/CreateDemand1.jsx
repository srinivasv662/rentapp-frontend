// import React, { useState } from "react";
// import axios from "axios";

// export default function CreateDemand() {
//   const [formData, setFormData] = useState({
//     vendorId: "",
//     propertyId: "",
//     amount: "",
//     dueDate: "",
//   });

//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = JSON.parse(localStorage.getItem("auth"))?.token;
//       const res = await axios.post(
//         "http://localhost:5000/api/admin/demands",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setMessage("Demand created successfully!");
//       setFormData({ vendorId: "", propertyId: "", amount: "", dueDate: "" });
//     } catch (err) {
//       setMessage("Failed to create demand.");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
//       <h2 className="text-2xl font-bold mb-6">Create Demand</h2>
//       {message && <div className="mb-4 text-red-500">{message}</div>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1">Vendor ID</label>
//           <input
//             type="text"
//             name="vendorId"
//             value={formData.vendorId}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Property ID</label>
//           <input
//             type="text"
//             name="propertyId"
//             value={formData.propertyId}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Amount</label>
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Due Date</label>
//           <input
//             type="date"
//             name="dueDate"
//             value={formData.dueDate}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Create
//         </button>
//       </form>
//     </div>
//   );
// }
