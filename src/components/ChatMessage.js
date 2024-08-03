import React from "react";

const ChatMessage = ({ name, message }) => {
    return (
        <div className="flex items-center shadow-md">
            <img
                className="h-8 px-2 m-2"
                alt="user-icon"
                src="data:image/png;base64,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"
            />
            <span className="font-bold pr-3">{name}</span>
            <span>{message}</span>
        </div>
    );
};

export default ChatMessage;
