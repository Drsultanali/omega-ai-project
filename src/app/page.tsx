'use client'
import { CgAttachment } from "react-icons/cg";
import { BiSend } from "react-icons/bi";
import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/layout';
import ChatMessage from './components/ChatMessage';

const Home: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: 'user' | 'system'; message: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // New state for file
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' && !selectedFile) return; // Check if both input and file are empty

    // Add user's message (or file name)
    if (inputValue) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', message: inputValue },
      ]);
    }

    if (selectedFile) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', message: `File uploaded: ${selectedFile.name}` }, // Show file name
      ]);
    }
    setInputValue('');
    setSelectedFile(null); // Clear the selected file
    setIsLoading(true);

    // Simulate the system response (this will later be the actual LLM API call)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'system', message: 'This is a system response.' },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Automatically focus on input field when the page loads
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Layout>
      
      <div className="flex flex-col h-full max-h-screen p-2 md:p-4 bg-gray-50 rounded-lg shadow-lg w-full md:max-w-2xl mx-auto">
        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} sender={msg.sender} message={msg.message} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-2">
              <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-200 text-black">
                Typing...
              </div>
            </div>
          )}
          <div ref={messageEndRef}></div>
        </div>
        {/* Input Field and File Upload inside the text box */}
        <div className="flex items-center border border-gray-300 rounded-full p-2">
          {/* File Upload Button */}
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label htmlFor="file" className="cursor-pointer mr-2 text-gray-500">

            <CgAttachment size={25} />
          </label>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            className="w-full p-2 outline-none rounded-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />

          {/* Send Button */}
          <button
            className="ml-2 p-2  text-black hover:text-blue-500"
            onClick={handleSendMessage}
          >
            <BiSend size={25} />
          </button>
        </div>

        {/* Show selected file name */}
        {selectedFile && (
          <div className="mt-2 text-gray-600">
            Selected file: {selectedFile.name}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
