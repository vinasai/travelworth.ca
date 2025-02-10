import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { Check, X } from "lucide-react";

export default function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [newRequestCount, setNewRequestCount] = useState(0);
  const [newContactNotification, setNewContactNotification] = useState(false);
  const [previousContactIds, setPreviousContactIds] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    contactId: null,
    status: null
  });


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

  const openConfirmationModal = (contactId, status) => {
    setConfirmationModal({
      isOpen: true,
      contactId,
      status
    });
  };

  const handleUpdateContactStatus = async () => {
    const { contactId, status } = confirmationModal;
    
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/contacts/${contactId}/status`,
        { status },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      
      if (response.status === 200) {
        setContacts(contacts.map(contact => 
          contact._id === contactId 
            ? { ...contact, status } 
            : contact
        ));
      } else {
        console.error("Failed to update contact status");
      }
    } catch (error) {
      console.error("Error updating contact status:", error);
    }

    // Close the modal
    setConfirmationModal({ isOpen: false, contactId: null, status: null });
  };

  const closeConfirmationModal = () => {
    setConfirmationModal({ isOpen: false, contactId: null, status: null });
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
            {contacts
            .filter(contact => contact.status !== 'approved' && contact.status !== 'rejected')
            .map((contact) => (
              <tr key={contact._id} className="border-b border-gray-300">
                <td className="px-6 py-4">{contact.name}</td>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4">{contact.phone}</td>
                <td className="px-6 py-4">{contact.from}</td>
                <td className="px-6 py-4">{contact.to}</td>
                <td className="px-6 py-4">{contact.memberCount}</td>
                <td className="px-6 py-4 flex items-center justify-center space-x-4">
                  <button
                    onClick={() => openConfirmationModal(contact._id, 'approved')}
                    className="bg-green-500 text-white p-1 rounded-md hover:bg-green-600"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={() => openConfirmationModal(contact._id, 'rejected')}
                    className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600"
                  >
                    <X size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Confirmation Modal */}
        {confirmationModal.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-bold mb-4">
                {confirmationModal.status === 'approved' 
                  ? 'Approve Request' 
                  : 'Reject Request'}
              </h3>
              <p className="mb-6">
                Are you sure you want to {confirmationModal.status} this request?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeConfirmationModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateContactStatus}
                  className={`px-4 py-2 rounded-md text-white ${
                    confirmationModal.status === 'approved' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}