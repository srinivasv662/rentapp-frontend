import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import config from "../config";

function VendorDashboard() {
  const [demands, setDemands] = useState([]);
  const [cashfree, setCashfree] = useState(null);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  // Load Cashfree SDK
  useEffect(() => {
    const init = async () => {
      const cf = await load({ mode: "sandbox" }); // change to "production" later
      setCashfree(cf);
    };
    init();
  }, []);

  // Fetch demands
  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    const token = storedAuth?.token;

    console.log("Token From Localstorage: " + token);
    axios
      .get(`${config.BASE_URL}/api/vendor/demands`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Hello " + res);
        setDemands(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handlePayment = async (demand) => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    const token = storedAuth?.token;
    console.log("Sending token:", token);
    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/payments/initiate`,
        {
          vendorId: demand.vendorId,
          demandId: demand.demandId,
          amount: demand.amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const sessionId = response.data.paymentSessionId;
      if (!sessionId) {
        alert("Unable to create payment session!");
        return;
      }

      console.log("SessionId " + sessionId);

      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_self", // opens in same tab
      };

      cashfree.checkout(checkoutOptions);
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(null); // clear context
    navigate("/login"); // redirect
  };

  return (
    <div className="min-h-screen bg-emerald-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Vendor Dashboard
        </h1>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border p-3">Demand ID</th>
              <th className="border p-3">Amount</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Due Date</th>
              <th className="border p-3">Property Code</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {demands.length > 0 ? (
              demands.map((demand) => (
                <tr key={demand.demandId} className="hover:bg-gray-50">
                  <td className="border p-3">{demand.demandId}</td>
                  <td className="border p-3">₹{demand.amount}</td>
                  <td
                    className={`border p-3 font-semibold ${
                      demand.status === "PENDING"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {demand.status}
                  </td>
                  <td className="border p-3">{demand.dueDate}</td>
                  <td className="border p-3">{demand.propertyCode}</td>
                  <td className="border p-3 text-center">
                    {demand.status === "PENDING" ? (
                      <button
                        onClick={() => handlePayment(demand)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <span className="text-gray-400">Paid</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-3 text-center" colSpan="6">
                  No demands available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Logout Button */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;
