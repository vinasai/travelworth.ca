import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const ManageDolist = () => {
  const [destinations, setDestinations] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [thingsToDo, setThingsToDo] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editingThing, setEditingThing] = useState(null);
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

  // Fetch things to do for the selected place
  const fetchThingsToDo = async (placeId) => {
    setSelectedPlace(placeId);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/thingsToDo/${placeId}`
      );
      setThingsToDo(res.data);
    } catch (err) {
      console.error("Error fetching things to do:", err);
    }
  };

  const handleAddOrUpdateThing = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("placeId", selectedPlace);
    if (image) formData.append("image", image);

    try {
      if (editingThing) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/thingsToDo/edit/${editingThing._id}`,
          formData
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/thingsToDo/add`,
          formData
        );
      }

      resetForm();
      fetchThingsToDo(selectedPlace);
    } catch (err) {
      console.error("Error saving thing to do:", err);
    }
  };

  const handleDeleteThing = async (thingId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/thingsToDo/delete/${thingId}`
      );
      fetchThingsToDo(selectedPlace);
    } catch (err) {
      console.error("Error deleting thing to do:", err);
    }
  };

  const handleEditThing = (thing) => {
    setEditingThing(thing);
    setName(thing.name);
    setDescription(thing.description);
    setImage(null);
    setShowForm(true);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setImage(null);
    setEditingThing(null);
    setShowForm(false);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4">Manage Things to Do</h2>

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
              onChange={(e) => fetchThingsToDo(e.target.value)}
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

        {/* Add Things to Do Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {showForm ? "Cancel" : "Add Thing to Do"}
        </button>

        {/* Add/Edit Form */}
        {showForm && selectedPlace && (
          <form
            onSubmit={handleAddOrUpdateThing}
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
              {editingThing ? "Update Thing" : "Add Thing"}
            </button>
          </form>
        )}

        {/* Things to Do Grid */}
        <div className="grid grid-cols-2 gap-4">
          {thingsToDo.map((thing) => (
            <div key={thing._id} className="border p-4 rounded shadow-lg">
              {thing.imageUrl && (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}${thing.imageUrl}`}
                  alt={thing.name}
                  className="w-full h-40 object-cover mb-2"
                />
              )}
              <h3 className="text-xl font-bold">{thing.name}</h3>
              <p>{thing.description}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEditThing(thing)}
                  className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteThing(thing._id)}
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

export default ManageDolist;
