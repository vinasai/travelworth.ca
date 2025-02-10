// [10/2/2025] [Shivan] [Created this file for adding customers component in admin panel]
import React, { useState } from "react";

const AddCustomerDetails = ({ onAddCustomer }) => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    from: "",
    to: "",
    memberCount: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.email) {
      alert("Name and Email are required");
      return;
    }
    onAddCustomer(customer);
    setCustomer({ name: "", email: "", phone: "", from: "", to: "", memberCount: "" });
    setShowForm(false); 
  };

  return (
    <div className="mt-4">
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add New Customer
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-2 mb-2 flex gap-2 flex-wrap">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={customer.name}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={customer.phone}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="text"
            name="from"
            placeholder="From"
            value={customer.from}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="text"
            name="to"
            placeholder="To"
            value={customer.to}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="number"
            name="memberCount"
            placeholder="MemberCount"
            value={customer.memberCount}
            onChange={handleChange}
            className="border p-2"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Add Customer
          </button>
          {showForm && (
          <button
            onClick={() => setShowForm(false)}
            className="text-red-500 px-4 py-2 rounded"
          >
            Cancel
          </button>
          )}
        </form>
      )}
    </div>
  );
};

export default AddCustomerDetails;
