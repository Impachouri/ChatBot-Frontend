import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import MessageList from "./MessageList";
import InputBar from "./InputBar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notification from "../utilities/notification";
import axios from "axios";

const Home = () => {
    const notify = notification();
    const server_url = import.meta.env.VITE_SERVER_URL;
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(true); // Initially disable input bar
    const messagesEndRef = useRef(null);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setMessages([]); // Clear previous messages
            await handleUpload(selectedFile);
            setInputDisabled(false); // Enable input bar after successful upload
        } else {
            notify("Please upload a valid PDF file.", "ERROR");
        }
    };

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${server_url}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            localStorage.setItem('session_token', response.data.session_token);
            notify("File uploaded successfully", "SUCCESS")
            console.log('File uploaded successfully', response.data);
        } catch (error) {
            notify("Error uploading file", "ERROR")
            console.error('Error uploading file', error);
        }
    };

    const handleSend = async () => {
        if (input.trim() !== "" && !typing) {
            const userMessage = { sender: "user", text: input };
            setMessages([...messages, userMessage]);
            setInput("");
            setTyping(true);

            try {
                const session_token = localStorage.getItem('session_token');
                const response = await axios.post(
                    `${server_url}/ask`,
                    { question: input },
                    {
                        headers: {
                            'session-token': session_token,
                        },
                    }
                );
                setTyping(false);
                const botMessage = { sender: "bot", text: response.data.answer };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } catch (error) {
                notify("Error asking question", "ERROR")
                console.error('Error asking question', error);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col h-screen">
                <Navbar file={file} handleFileChange={handleFileChange} />
                <main className="flex-1 overflow-y-auto px-16 pt-16 w-full flex flex-col gap-6">
                    <MessageList messages={messages} messagesEndRef={messagesEndRef} typing={typing} />
                    <InputBar
                        input={input}
                        setInput={setInput}
                        handleKeyDown={handleKeyDown}
                        handleSend={handleSend}
                        disabled={inputDisabled || typing} // Disable input bar if no PDF uploaded or bot is typing
                    />
                </main>
            </div>
        </>
    );
}

export default Home;
