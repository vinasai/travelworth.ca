import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPackageForm = ({ editingPackage, fetchPackages, setShowForm }) => {
  const [formData, setFormData] = useState({
    title: '',
    place: '',
    price: '',
    tagText: '',
    image: null,
  });

  useEffect(() => {
    if (editingPackage) {
      setFormData({
        title: editingPackage.title,
        place: editingPackage.place,
        price: editingPackage.price,
        tagText: editingPackage.tagText,
        image: null,
      });
    }
  }, [editingPackage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('place', formData.place);
    data.append('price', formData.price);
    data.append('tagText', formData.tagText);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingPackage) {
        await axios.put(`https://travelworth.ca/api/packages/${editingPackage._id}`, data);
        alert('Package updated successfully!');
      } else {
        await axios.post('https://travelworth.ca/api/packages/add', data);
        alert('Package added successfully!');
      }
      fetchPackages();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding/updating package:', error);
      alert('Failed to add/update package. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded mb-4">
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input type="text" name="place" placeholder="Place" value={formData.place} onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
      <input type="text" name="tagText" placeholder="Tag Text" value={formData.tagText} onChange={handleChange} />
      <input type="file" name="image" onChange={handleImageChange} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {editingPackage ? 'Update Package' : 'Add Package'}
      </button>
      <button type="button" className="ml-2 text-red-500" onClick={() => setShowForm(false)}>
        Cancel
      </button>
    </form>
  );
};

export default AddPackageForm;
