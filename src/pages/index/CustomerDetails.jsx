// [10/2/2025] [Shivan] [Created this file for adding and searching customers]
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import AddCustomerDetails from "../../components/AddCustomerDetails";

export default function AdminDashboard() {
  const [customers, setCustomers] = useState([]); 
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // Fetch all customers initially
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/contacts`);
      setCustomers(response.data);
      setFilteredCustomers(response.data); 
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Handle search locally
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredCustomers(customers);
      return;
    }

    const results = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query.toLowerCase()) ||
        customer.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCustomers(results);
  };

  // Add new customer and refetch data
  const addCustomer = async (newCustomer) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/contacts`,
        newCustomer,
        { headers: { "Content-Type": "application/json" } }
      );

      setCustomers([...customers, response.data]);
      setFilteredCustomers([...filteredCustomers, response.data]);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  // Delete customer and refetch data
  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/contacts/${id}`);
      const updatedCustomers = customers.filter((customer) => customer._id !== id);
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Details</h2>
        
        {/* Add Customer Form Component*/}
        <AddCustomerDetails onAddCustomer={addCustomer} />

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-2 mb-4 mt-2 border border-gray-300 rounded"
        />

        {/* Customers Table */}
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Member Count</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((contact) => (
                <tr key={contact._id} className="border-b border-gray-300">
                  <td className="px-6 py-4">{contact.name}</td>
                  <td className="px-6 py-4">{contact.email}</td>
                  <td className="px-6 py-4">{contact.phone}</td>
                  <td className="px-6 py-4">{contact.status}</td>
                  <td className="px-6 py-4">{contact.from}</td>
                  <td className="px-6 py-4">{contact.to}</td>
                  <td className="px-6 py-4">{contact.memberCount}</td>
                  <td className="px-6 py-4 flex space-x-4">
                    <button
                      onClick={() => deleteCustomer(contact._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-600">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
