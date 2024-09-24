'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useMessages } from '@/contexts/MessageContext';

const ClientMessage = () => {
  const [message, setMessage] = useState('');
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const { chats, addMessage } = useMessages();

  const handleSendMessage = () => {
    if (message.trim() && activeChatId !== null) {
      addMessage(activeChatId, {
        text: message,
        sender: 'client'
      });
      setMessage('');
    }
  };

  const handleChatPersonClick = (id: number) => {
    setActiveChatId(id);
  };

  const activeChat = chats.find(chat => chat.id === activeChatId);

  return (
    <div className="flex h-[600px] w-[900px] bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-800 flex flex-col">
        {/* Chat list */}
        <div className="overflow-y-auto flex-grow">
          {chats.map((chat) => (
            <div 
              key={chat.id}
              className={`flex items-center p-3 hover:bg-gray-800 cursor-pointer ${activeChatId === chat.id ? 'bg-gray-700' : ''}`}
              onClick={() => handleChatPersonClick(chat.id)}
            >
              <div className="w-12 h-12 bg-gray-700 rounded-full mr-3"></div>
              <div>
                <h3 className="font-semibold">{chat.freelancerName}</h3>
                <p className="text-sm text-gray-400">{chat.messages[chat.messages.length - 1]?.text}</p>
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
            <div className="bg-gray-800 p-4 border-b border-gray-700">
              <h2 className="font-semibold">{activeChat.freelancerName}</h2>
            </div>
            {/* Chat area */}
            <div className="flex-1 overflow-y-auto p-4 pb-2">
              {activeChat.messages.map((msg) => (
                <div key={msg.id} className={`mb-4 ${msg.sender === 'client' ? 'text-right' : ''}`}>
                  <div className={`rounded-lg p-2 inline-block ${msg.sender === 'client' ? 'bg-green-700' : 'bg-gray-800'}`}>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Input area */}
            <div className="bg-black p-4 pt-2 border-b border-gray-800">
              <div className="flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message"
                  className="flex-1 bg-gray-800 rounded-full py-2 px-4 outline-none"
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-green-600 rounded-full p-2 ml-2"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientMessage;