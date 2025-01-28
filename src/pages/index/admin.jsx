import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import AddPackageForm from "../../components/AddPackageForm";

const Admin = () => {
  const [packages, setPackages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  // Fetch packages on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/packages`
      );
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  // Handle delete package
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/packages/${id}`
      );
      fetchPackages(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  // Handle edit package
  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setShowForm(true);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl mb-4">Tour Packages</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
          onClick={() => {
            setShowForm(true);
            setEditingPackage(null);
          }}
        >
          Add New Package
        </button>

        {showForm && (
          <AddPackageForm
            editingPackage={editingPackage}
            fetchPackages={fetchPackages}
            setShowForm={setShowForm}
          />
        )}

        <div className="grid grid-cols-2 gap-4">
          {packages.map((pkg) => (
            <div key={pkg._id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-bold">{pkg.title}</h2>
              <p>Place: {pkg.place}</p>
              <p>Price: ${pkg.price}</p>
              {pkg.tagText && <p>Tag: {pkg.tagText}</p>}
              {pkg.imageUrl && (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}${pkg.imageUrl}`}
                  alt={pkg.title}
                  className="w-full h-40 object-cover mt-2"
                />
              )}
              <div className="mt-4">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleEdit(pkg)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(pkg._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
