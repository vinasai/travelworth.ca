import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // Import Sidebar

const ManageFood = () => {
  const [destinations, setDestinations] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editingFood, setEditingFood] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

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

  // Fetch food items for the selected place
  const fetchFoodItems = async (placeId) => {
    setSelectedPlace(placeId);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/food/${placeId}`
      );
      setFoodItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOrUpdateFood = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("placeId", selectedPlace);
    if (image) formData.append("image", image);

    try {
      if (editingFood) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/food/edit/${editingFood._id}`,
          formData
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/food/add`,
          formData
        );
      }

      resetForm();
      fetchFoodItems(selectedPlace);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteFood = async (foodId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/food/delete/${foodId}`
      );
      fetchFoodItems(selectedPlace);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditFood = (food) => {
    setEditingFood(food);
    setName(food.name);
    setDescription(food.description);
    setImage(food.imageUrl); // Assuming the food item has an image URL
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setImage(null);
    setEditingFood(null);
  };

  // Toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
    resetForm(); // Reset form if closing
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4">Manage Food</h2>

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
              onChange={(e) => fetchFoodItems(e.target.value)}
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

        {/* Add Food Button */}
        <button
          onClick={toggleForm}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {showForm ? "Cancel" : "Add Food"}
        </button>
        {/* Add/Edit Food Form */}
        {showForm && selectedPlace && (
          <form
            onSubmit={handleAddOrUpdateFood}
            className="border p-6 rounded shadow-lg"
          >
            <input
              type="text"
              placeholder="Food Name"
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
              {editingFood ? "Update Food" : "Add Food"}
            </button>
            {editingFood && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            )}
          </form>
        )}

        {/* Food Cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {foodItems.map((food) => (
            <div key={food._id} className="border p-4 rounded shadow-lg">
              {food.imageUrl && (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}${food.imageUrl}`}
                  alt={food.name}
                  className="w-full h-40 object-cover mb-2"
                />
              )}
              <h3 className="font-bold">{food.name}</h3>
              <p>{food.description}</p>
              <div className="mt-4">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleEditFood(food)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDeleteFood(food._id)}
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

export default ManageFood;
