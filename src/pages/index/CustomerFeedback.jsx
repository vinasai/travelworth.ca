import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [newRequestCount, setNewRequestCount] = useState(0);
  const [newContactNotification, setNewContactNotification] = useState(false);
  const [previousContactIds, setPreviousContactIds] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/contacts`
        );
        const data = response.data;

        const currentContactIds = data.map((contact) => contact._id);
        if (previousContactIds.length > 0) {
          const newContacts = data.filter(
            (contact) => !previousContactIds.includes(contact._id)
          );
          const newRequestCount = newContacts.length;

          if (newRequestCount > 0) {
            setNewRequestCount(newRequestCount);
            setNewContactNotification(true);
          }
        }

        setPreviousContactIds(currentContactIds);
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();

    const interval = setInterval(fetchContacts, 10000);
    return () => clearInterval(interval);
  }, [previousContactIds]);

  const handleCloseNotification = () => {
    setNewContactNotification(false);
  };

  const handleDeleteContact = async (contactId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/contacts/${contactId}`
      );
      if (response.status === 200) {
        setContacts(contacts.filter((contact) => contact._id !== contactId));
      } else {
        console.error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Customer Request
        </h2>

        {/* Notification for new contact */}
        {newContactNotification && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4 text-gray-700">
            <p>{`You have ${newRequestCount} new request${
              newRequestCount > 1 ? "s" : ""
            }!`}</p>
            <button
              onClick={handleCloseNotification}
              className="text-yellow-500 font-semibold mt-2"
            >
              Close
            </button>
          </div>
        )}

        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Member Count</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id} className="border-b border-gray-300">
                <td className="px-6 py-4">{contact.name}</td>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4">{contact.phone}</td>
                <td className="px-6 py-4">{contact.from}</td>
                <td className="px-6 py-4">{contact.to}</td>
                <td className="px-6 py-4">{contact.memberCount}</td>
                <td className="px-6 py-4 flex space-x-4">
                  <button
                    onClick={() => handleDeleteContact(contact._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
