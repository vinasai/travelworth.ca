import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const ManageMustVisitPlaces = () => {
  const [destinations, setDestinations] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [mustVisitPlaces, setMustVisitPlaces] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editingPlace, setEditingPlace] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch destinations on component mount
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/destinations`
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

  // Fetch must-visit places for the selected place
  const fetchMustVisitPlaces = async (placeId) => {
    setSelectedPlace(placeId);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/mustvisit/${placeId}`
      );
      setMustVisitPlaces(res.data);
    } catch (err) {
      console.error("Error fetching must-visit places:", err);
    }
  };

  const handleAddOrUpdatePlace = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("placeId", selectedPlace);
    if (image) formData.append("image", image);

    try {
      if (editingPlace) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/mustvisit/edit/${editingPlace._id}`,
          formData
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/mustvisit/add`,
          formData
        );
      }

      resetForm();
      fetchMustVisitPlaces(selectedPlace);
    } catch (err) {
      console.error("Error saving must-visit place:", err);
    }
  };

  const handleDeletePlace = async (placeId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/mustvisit/delete/${placeId}`
      );
      fetchMustVisitPlaces(selectedPlace);
    } catch (err) {
      console.error("Error deleting must-visit place:", err);
    }
  };

  const handleEditPlace = (place) => {
    setEditingPlace(place);
    setName(place.name);
    setDescription(place.description);
    setImage(null);
    setShowForm(true);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setImage(null);
    setEditingPlace(null);
    setShowForm(false);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4">Manage Must-Visit Places</h2>

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
              onChange={(e) => fetchMustVisitPlaces(e.target.value)}
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

        {/* Add Must-Visit Place Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {showForm ? "Cancel" : "Add Must-Visit Place"}
        </button>

        {/* Add/Edit Form */}
        {showForm && selectedPlace && (
          <form
            onSubmit={handleAddOrUpdatePlace}
            className="border p-6 rounded shadow-lg"
          >
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              {editingPlace ? "Update Place" : "Add Place"}
            </button>
          </form>
        )}

        {/* Must-Visit Places Grid */}
        <div className="grid grid-cols-2 gap-4">
          {mustVisitPlaces.map((place) => (
            <div key={place._id} className="border p-4 rounded shadow-lg">
              {place.imageUrl && (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}${place.imageUrl}`}
                  alt={place.name}
                  className="w-full h-40 object-cover mb-2"
                />
              )}
              <h3 className="text-xl font-bold">{place.name}</h3>
              <p>{place.description}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEditPlace(place)}
                  className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePlace(place._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
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

export default ManageMustVisitPlaces;
