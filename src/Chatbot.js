// src/Chatbot.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [bgColorIndex, setBgColorIndex] = useState(0);

    
    const colors = ['#6a5acd', '#d3d3d3']; 

    
    useEffect(() => {
        const defaultMessage = { text: "How can I assist you?", sender: 'bot' };
        setMessages([defaultMessage]);
    }, []);

    const handleSend = async () => {
        if (!input) return;

        
        const userMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

    
        setBgColorIndex((prevIndex) => (prevIndex + 1) % colors.length);

        
        try {
            const response = await axios.post('YOUR_HEXABOT_API_ENDPOINT', {
                message: input,
            });

            
            const botMessage = { text: response.data.reply, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }

        
        setInput('');
    };

    return (
        <div className="chatbot" style={{ backgroundColor: colors[bgColorIndex] }}>
            <div className="chatbot-header">Chatbot</div>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;