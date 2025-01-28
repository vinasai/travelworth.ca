import React, { useState, useEffect } from "react";
import axios from "axios";

const AddDestinationForm = ({ editingDestination, fetchDestinations, setShowForm }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isTopDestination, setIsTopDestination] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editingDestination) {
      setName(editingDestination.name);
      setDescription(editingDestination.description);
      setIsTopDestination(editingDestination.isTopDestination);
    }
  }, [editingDestination]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("isTopDestination", isTopDestination);
    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingDestination) {
        await axios.put(`https://travelworth.ca/api/destinations/${editingDestination._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("https://travelworth.ca/api/destinations/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchDestinations();
      setShowForm(false);
    } catch (err) {
      console.error("Error saving destination:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-700">
        {editingDestination ? "Edit Destination" : "Add Destination"}
      </h2>

      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
          Destination Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter destination name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-600">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter destination description"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isTopDestination"
          checked={isTopDestination}
          onChange={(e) => setIsTopDestination(e.target.checked)}
          className="h-5 w-5 text-blue-500 focus:ring-0"
        />
        <label htmlFor="isTopDestination" className="text-sm text-gray-600">
          Mark as Top Destination
        </label>
      </div>

      <div className="space-y-2">
        <label htmlFor="image" className="block text-sm font-medium text-gray-600">
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Destination
        </button>
      </div>
    </form>
  );
};

export default AddDestinationForm;
