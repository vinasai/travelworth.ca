import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // Import Sidebar

const ManageCulture = () => {
  const [destinations, setDestinations] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [cultures, setCultures] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editingCulture, setEditingCulture] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch destinations on component mount
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get(
          "${process.env.REACT_APP_BACKEND_URL}/api/destinations"
        );
        setDestinations(res.data);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      }
    };
    fetchDestinations();
  }, []);

  // Fetch places based on selected destination
  useEffect(() => {
    if (selectedDestination) {
      const fetchPlaces = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/places/${selectedDestination}`
          );
          setPlaces(res.data);
        } catch (err) {
          console.error("Error fetching places:", err);
        }
      };
      fetchPlaces();
    }
  }, [selectedDestination]);

  // Fetch culture items for the selected place
  const fetchCultures = async (placeId) => {
    setSelectedPlace(placeId);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/culture/${placeId}`
      );
      setCultures(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOrUpdateCulture = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("placeId", selectedPlace);
    if (image) formData.append("image", image);

    try {
      if (editingCulture) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/culture/edit/${editingCulture._id}`,
          formData
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/culture/add`,
          formData
        );
      }

      resetForm();
      fetchCultures(selectedPlace);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCulture = async (cultureId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/culture/delete/${cultureId}`
      );
      fetchCultures(selectedPlace);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditCulture = (culture) => {
    setEditingCulture(culture);
    setTitle(culture.title);
    setDescription(culture.description);
    setImage(null);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setEditingCulture(null);
  };

  // Toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
    resetForm();
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4">Manage Culture</h2>

        {/* Destination and Place Selection */}
        <div className="mb-4">
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="border p-2"
          >
            <option value="">Select Destination</option>
            {destinations.map((destination) => (
              <option key={destination._id} value={destination._id}>
                {destination.name}
              </option>
            ))}
          </select>

          {selectedDestination && (
            <select
              value={selectedPlace}
              onChange={(e) => fetchCultures(e.target.value)}
              className="ml-4 border p-2"
            >
              <option value="">Select Place</option>
              {places.map((place) => (
                <option key={place._id} value={place._id}>
                  {place.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Add Culture Button */}
        <button
          onClick={toggleForm}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {showForm ? "Cancel" : "Add Culture"}
        </button>

        {/* Add/Edit Culture Form */}
        {showForm && selectedPlace && (
          <form
            onSubmit={handleAddOrUpdateCulture}
            className="border p-6 rounded shadow-lg"
          >
            <input
              type="text"
              placeholder="Culture Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 mb-4 border"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 mb-4 border"
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 mb-4"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {editingCulture ? "Update Culture" : "Add Culture"}
            </button>
          </form>
        )}

        {/* Culture Cards */}
        <div className="grid grid-cols-2 gap-4">
          {cultures.map((culture) => (
            <div key={culture._id} className="border p-4 rounded shadow-lg">
              {culture.imageUrl && (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}${culture.imageUrl}`}
                  alt={culture.title}
                  className="w-full h-40 object-cover mb-2"
                />
              )}
              <h3 className="font-bold">{culture.title}</h3>

              <p>{culture.description}</p>
              <div className="mt-4">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleEditCulture(culture)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDeleteCulture(culture._id)}
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

export default ManageCulture;
