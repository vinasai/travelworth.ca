import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // Sidebar component import

const ManagePlaces = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [places, setPlaces] = useState([]);
  const [name, setName] = useState("");
  const [overview, setOverview] = useState("");
  const [toverview, setTOverview] = useState("");
  const [foverview, setFOverview] = useState("");
  const [coverview, setCOverview] = useState("");
  const [image, setImage] = useState(null);
  const [editingPlace, setEditingPlace] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
      console.error(err);
    }
  };

  const fetchPlaces = async (destinationId) => {
    setSelectedDestination(destinationId);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/places/${destinationId}`
      );
      setPlaces(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOrUpdatePlace = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("overview", overview);
    formData.append("toverview", toverview);
    formData.append("foverview", foverview);
    formData.append("coverview", coverview);
    formData.append("destinationId", selectedDestination);
    if (image) formData.append("image", image);

    try {
      if (editingPlace) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/places/edit/${editingPlace._id}`,
          formData
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/places/add/${selectedDestination}`,
          formData
        );
      }

      resetForm();
      fetchPlaces(selectedDestination);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePlace = async (placeId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/places/delete/${placeId}`
      );
      fetchPlaces(selectedDestination);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditPlace = (place) => {
    setEditingPlace(place);
    setName(place.name);
    setOverview(place.overview);
    setTOverview(place.toverview);
    setFOverview(place.foverview);
    setCOverview(place.coverview);
    setImage(place.imageUrl);
    setShowForm(true);
  };

  const resetForm = () => {
    setName("");
    setOverview("");
    setTOverview("");
    setFOverview("");
    setCOverview("");
    setImage(null);
    setEditingPlace(null);
    setShowForm(false);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4">Manage Places</h2>

        <div className="mb-4">
          <select
            value={selectedDestination}
            onChange={(e) => fetchPlaces(e.target.value)}
            className="border p-2"
          >
            <option value="">Select Destination</option>
            {destinations.map((dest) => (
              <option key={dest._id} value={dest._id}>
                {dest.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {showForm ? "Cancel" : "Add Place"}
        </button>

        {showForm && selectedDestination && (
          <form
            onSubmit={handleAddOrUpdatePlace}
            className="border p-6 rounded shadow-lg"
          >
            <input
              type="text"
              placeholder="Place Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 mb-4 border"
            />
            <textarea
              placeholder="Overview"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              required
              className="w-full p-2 mb-4 border"
            />
            <textarea
              placeholder="Things to Do Overview"
              value={toverview}
              onChange={(e) => setTOverview(e.target.value)}
              className="w-full p-2 mb-4 border"
            />
            <textarea
              placeholder="Food Overview"
              value={foverview}
              onChange={(e) => setFOverview(e.target.value)}
              className="w-full p-2 mb-4 border"
            />
            <textarea
              placeholder="Culture Overview"
              value={coverview}
              onChange={(e) => setCOverview(e.target.value)}
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

        <div className="mt-4">
          {places.length > 0 ? (
            <ul>
              {places.map((place) => (
                <li
                  key={place._id}
                  className="border p-4 rounded mb-4 shadow-md"
                >
                  <h3 className="font-bold">{place.name}</h3>
                  <p>
                    <strong>Overview:</strong> {place.overview}
                  </p>
                  <p>
                    <strong>Things to Do Overview:</strong> {place.toverview}
                  </p>
                  <p>
                    <strong>Food Overview:</strong> {place.foverview}
                  </p>
                  <p>
                    <strong>Culture Overview:</strong> {place.coverview}
                  </p>
                  {place.imageUrl && (
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}${place.imageUrl}`}
                      alt={place.name}
                      className="w-full h-40 object-cover mb-2"
                    />
                  )}
                  <div className="mt-4">
                    <button
                      onClick={() => handleEditPlace(place)}
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePlace(place._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No places available for this destination.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagePlaces;
