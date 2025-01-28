import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // Assuming the Sidebar component is available
import AddDestinationForm from "../components/AddDestinationForm"; // Assuming this is a form component for adding/editing destinations

const ManageDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/destinations`
      );
      setDestinations(res.data);
    } catch (err) {
      console.error("Error fetching destinations:", err.message);
    }
  };

  const handleEdit = (dest) => {
    setEditingDestination(dest);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/destinations/${id}`
      );
      fetchDestinations();
    } catch (err) {
      console.error("Error deleting destination:", err.message);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl mb-4">Manage Destinations</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
          onClick={() => {
            setShowForm(true);
            setEditingDestination(null);
          }}
        >
          Add New Destination
        </button>

        {showForm && (
          <AddDestinationForm
            editingDestination={editingDestination}
            fetchDestinations={fetchDestinations}
            setShowForm={setShowForm}
          />
        )}

        {/* Top Destinations Section */}
        <div>
          <h2 className="text-2xl mb-4">Top Destinations</h2>
          <div className="grid grid-cols-2 gap-4">
            {destinations
              .filter((dest) => dest.isTopDestination)
              .map((dest) => (
                <div
                  key={dest._id}
                  className="p-4 border rounded shadow bg-yellow-100"
                >
                  {dest.imageUrl && (
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}${dest.imageUrl}`}
                      alt={dest.name}
                      className="w-full h-40 object-cover mb-2 rounded"
                    />
                  )}
                  <h2 className="text-xl font-bold">{dest.name}</h2>
                  <p>{dest.description}</p>
                </div>
              ))}
          </div>
        </div>

        {/* All Destinations Section */}
        <h2 className="text-2xl mt-6 mb-4">All Destinations</h2>
        <div className="grid grid-cols-2 gap-4">
          {destinations.map((dest) => (
            <div
              key={dest._id}
              className={`p-4 border rounded shadow ${
                dest.isTopDestination ? "bg-yellow-100" : ""
              }`}
            >
              {dest.imageUrl && (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}${dest.imageUrl}`}
                  alt={dest.name}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
              )}
              <h2 className="text-xl font-bold">
                {dest.name} {dest.isTopDestination && <span>🌟</span>}
              </h2>
              <p>{dest.description}</p>
              <div className="mt-4 flex gap-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleEdit(dest)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(dest._id)}
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

export default ManageDestinations;
