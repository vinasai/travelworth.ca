// [11/2/2025] [Shivan] [Created this file to show extra details of each customer in the admin panel]
import React from "react";

const DetailBox = ({ customer, onClose }) => {
    if (!customer) return null;
    return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-md opacity-30" onClick={onClose}></div>  
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-xl font-semibold mb-4">{customer.name}s Trip Details</h2>

        <div className="mb-2">
          <strong>From:</strong> {customer.from}
        </div>
        <div className="mb-2">
          <strong>To:</strong> {customer.to}
        </div>
        <div className="mb-4">
          <strong>Member Count:</strong> {customer.memberCount}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailBox;