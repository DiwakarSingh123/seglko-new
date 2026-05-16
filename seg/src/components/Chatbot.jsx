import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import segLogo from '../assets/images/seg.jpeg';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const initialMessages = [
    { text: "Hello!", sender: "bot" },
    { text: "Welcome to Saroj Education Group.", sender: "bot" },
    { text: "How may I assist you today?", sender: "bot" },
    { 
      text: "Kindly choose from one of the following categories to get started.", 
      sender: "bot",
      options: ["Admission Inquiry", "General Inquiry"]
    }
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Show tooltip after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Hide tooltip after a while
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowTooltip(false);
    }
  };

  const handleOptionClick = (option) => {
    // Add user message
    const newMessages = [...messages, { text: option, sender: "user" }];
    setMessages(newMessages);

    // Simulate bot response based on option
    setTimeout(() => {
      let botResponse = "";
      if (option === "Admission Inquiry") {
        botResponse = "For admission inquiries, please visit our Admission Process page or call our toll-free number: 1800-123-4567.";
      } else if (option === "General Inquiry") {
        botResponse = "For general inquiries, you can reach out to us at info@seg.edu.in or use the Contact Us page.";
      }

      setMessages(prev => [...prev, { 
        text: botResponse, 
        sender: "bot" 
      }]);
    }, 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    // Add user message
    const newMessages = [...messages, { text: inputValue, sender: "user" }];
    setMessages(newMessages);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for reaching out! This is an automated response. Please contact our admission desk for specific queries.", 
        sender: "bot" 
      }]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      {/* Tooltip */}
      {!isOpen && showTooltip && (
        <div className="chatbot-tooltip">
          Hi there! 👋 Need help?
          <button className="tooltip-close" onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}>&times;</button>
        </div>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <span className="chatbot-avatar-icon">
                  <img src={segLogo} alt="SEG Logo" className="chatbot-avatar-img" />
                </span>
              </div>
              <div className="chatbot-header-text">
                <h3>SEG Assistant</h3>
                <span className="status-indicator">Online</span>
              </div>
            </div>
            <button className="close-btn" onClick={toggleChat}>&times;</button>
          </div>
          
          <div className="chatbot-messages">
            <div className="chatbot-date-divider"><span>Today</span></div>
            {messages.map((msg, index) => (
              <React.Fragment key={index}>
                <div className={`message-wrapper ${msg.sender}`}>
                  {msg.sender === 'bot' && (
                    <div className="message-avatar">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--color-primary)" stroke="var(--color-primary)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.27 1.27L3 12l5.8 1.9a2 2 0 0 1 1.27 1.27L12 21l1.9-5.8a2 2 0 0 1 1.27-1.27L21 12l-5.8-1.9a2 2 0 0 1-1.27-1.27L12 3Z"/>
                      </svg>
                    </div>
                  )}
                  <div className={`message ${msg.sender}`}>
                    <p>{msg.text}</p>
                  </div>
                </div>
                {/* Render options if they exist on the message */}
                {msg.options && msg.sender === 'bot' && (
                  <div className="chatbot-options">
                    {msg.options.map((option, optIdx) => (
                      <button 
                        key={optIdx} 
                        className="chatbot-option-btn"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chatbot-input" onSubmit={handleSendMessage}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="send-btn" aria-label="Send Message">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>
      )}
      
      <button className={`chatbot-toggle-btn ${isOpen ? 'active' : ''}`} onClick={toggleChat} aria-label="Open Chat">
        <div className="pulse-ring"></div>
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
