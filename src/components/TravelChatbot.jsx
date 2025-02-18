//[18/02/2025] [Oshen] [Travelchatbot component]
import React from 'react';

const TravelChatbot = () => {
    return(
    <iframe
    src="https://chatbot.travelworth.ca"
    title="chatbot"
    width="500"
    height="600"
    style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    border: "none",
    borderRadius: "10px",
    }}
></iframe>
    );
};

export default TravelChatbot;