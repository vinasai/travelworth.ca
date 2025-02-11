// [10/2/2025] [Shivan] [Created this file for adding and searching customers]
// [11/2/2025] [Shivan] [Added a functon to edit customer details]
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Pencil, Check, X } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import AddCustomerDetails from "../../components/AddCustomerDetails";
import DetailBox from "../../components/DetailBox";

export default function AdminDashboard() {
  const [customers, setCustomers] = useState([]); 
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);

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
        customer.email.toLowerCase().includes(query.toLowerCase()) ||
        customer.status.toLowerCase().includes(query.toLowerCase())
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

    // Update customer
    const updateContact = async (id, updatedData) => {
      try {
        const response = await axios.put(`http://localhost:5000/api/contacts/${id}`, updatedData, {
          headers: { "Content-Type": "application/json" },
        });
        const updatedCustomers = customers.map((customer) =>
          customer._id === id ? response.data : customer
        );
        fetchCustomers(); // Refetch updated data
        setEditRowId(null);
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    };

    const handleEditClick = (customer) => {
      setEditRowId(customer._id);
      setEditData(customer);
    };

    const handleCancelEdit = () => {
      setEditRowId(null);
      setEditData({});
    };

    const handleEditChange = (e, field) => {
      setEditData({...editData, [field]: e.target.value });                                                                     
    };

    const handleSaveEdit = () => {
      updateContact(editRowId, editData);
    }

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
              <th className="px-6 py-3">Details</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer._id} className="border-b border-gray-300">
                  <td className="px-6 py-4">
                    {editRowId === customer._id ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => handleEditChange(e, "name")}
                        className="p-1 border border-gray-300 rounded"
                      />
                    ) : (
                      customer.name
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {editRowId === customer._id ? (
                      <input
                        type="text"
                        value={editData.email}
                        onChange={(e) => handleEditChange(e, "email")}
                        className="p-1 border border-gray-300 rounded"
                      />
                    ) : (
                      customer.email
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {editRowId === customer._id ? (
                      <input
                        type="text"
                        value={editData.phone}
                        onChange={(e) => handleEditChange(e, "phone")}
                        className="p-1 border border-gray-300 rounded"
                      />
                    ) : (
                      customer.phone
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {editRowId === customer._id ? (
                      <input
                        type="text"
                        value={editData.status}
                        onChange={(e) => handleEditChange(e, "status")}
                        className="p-1 border border-gray-300 rounded"
                      />
                    ) : (
                      customer.status
                    )}
                  </td>

                  <td className="px-6">
                    <button onClick={() => setSelectedCustomer(customer)} className="text-gray-700 hover:text-gray-900" title="View Details">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20" fill="#666666">
                        <circle cx="8" cy="12" r="3" fill="#666666" />
                        <rect x="5" y="15" width="6" height="4" rx="2" ry="2" fill="#666666" />
                        <line x1="13" y1="10" x2="17" y2="10" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="13" y1="12" x2="17" y2="12" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="13" y1="14" x2="17" y2="14" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                    {selectedCustomer && <DetailBox customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} /> }
                  </td>
                  
                  <td className="px-6 py-4 flex space-x-4">
                    {editRowId === customer._id ? (
                      <>
                        <button
                          onClick={handleSaveEdit}
                          className="text-green-600 hover:text-green-800"
                          title="Save"
                        >
                          <Check size={20} />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-red-600 hover:text-red-800"
                          title="Cancel"
                        >
                          <X size={20} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(customer)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Pencil size={20} />
                        </button>
                        <button
                          onClick={() => deleteCustomer(customer._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-600">
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
