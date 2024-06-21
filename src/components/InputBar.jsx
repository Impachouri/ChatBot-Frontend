import React from "react";
import { AiOutlineSend } from "react-icons/ai";

const InputBar = ({ input, setInput, handleKeyDown, handleSend, disabled }) => {
    return (
        <div className="border-2 w-full flex items-center justify-between p-2 rounded-md bg-gray-100">
            <input
                className="w-full h-full p-2 outline-none bg-gray-100"
                type="text"
                placeholder={disabled ? "Upload a PDF to chat" : "Send a message..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
            />
            <button
                className={`text-gray-400 ml-2 ${disabled ? "cursor-not-allowed" : ""}`}
                onClick={handleSend}
                disabled={disabled}
            >
                <AiOutlineSend size={24} />
            </button>
        </div>
    );
};

export default InputBar;
