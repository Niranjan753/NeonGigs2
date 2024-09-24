'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useMessages } from '@/contexts/MessageContext';

const FreelancerMessage = () => {
  const [message, setMessage] = useState('');
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const { chats, addMessage } = useMessages();

  const handleSendMessage = () => {
    if (message.trim() && activeChatId !== null) {
      addMessage(activeChatId, {
        text: message,
        sender: 'freelancer'
      });
      setMessage('');
    }
  };

  const handleChatPersonClick = (id: number) => {
    setActiveChatId(id);
  };

  const activeChat = chats.find(chat => chat.id === activeChatId);

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-700 flex flex-col">
        {/* Chat list header */}
        <div className="bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="font-semibold text-lg">Chats</h2>
          <FontAwesomeIcon icon={faEllipsisV} className="text-gray-400 cursor-pointer" />
        </div>
        {/* Chat list */}
        <div className="overflow-y-auto flex-grow">
          {chats.map((chat) => (
            <div 
              key={chat.id}
              className={`flex items-center p-4 hover:bg-gray-900 cursor-pointer ${activeChatId === chat.id ? 'bg-gray-800' : ''}`}
              onClick={() => handleChatPersonClick(chat.id)}
            >
              <div className="w-12 h-12 bg-gray-700 rounded-full mr-3 flex items-center justify-center text-xl font-semibold">
                {chat.clientName[0]}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">{chat.clientName}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat header */}
            <div className="bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-700 rounded-full mr-3 flex items-center justify-center text-lg font-semibold">
                  {activeChat.clientName[0]}
                </div>
                <h2 className="font-semibold">{activeChat.clientName}</h2>
              </div>
              <FontAwesomeIcon icon={faEllipsisV} className="text-gray-400 cursor-pointer" />
            </div>
            {/* Chat area */}
            <div className="flex-1 overflow-y-auto p-4 pb-2 bg-gray-950">
              {activeChat.messages.map((msg) => (
                <div key={msg.id} className={`mb-4 ${msg.sender === 'freelancer' ? 'text-right' : ''}`}>
                  <div className={`rounded-lg p-3 inline-block max-w-xs ${msg.sender === 'freelancer' ? 'bg-blue-600' : 'bg-gray-800'}`}>
                    <p>{msg.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Input area */}
            <div className="bg-gray-900 p-4 border-t border-gray-700">
              <div className="flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message"
                  className="flex-1 bg-gray-800 rounded-full py-2 px-4 outline-none border border-gray-700"
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-blue-600 rounded-full p-3 ml-2 hover:bg-blue-700 transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-950">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerMessage;