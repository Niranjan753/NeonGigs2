'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'client' | 'freelancer';
  timestamp: string;
}

interface Chat {
  id: number;
  clientName: string;
  freelancerName: string;
  messages: Message[];
}

interface MessageContextType {
  chats: Chat[];
  addMessage: (chatId: number, message: Omit<Message, 'id' | 'timestamp'>) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      clientName: "Client A",
      freelancerName: "Freelancer X",
      messages: [
        { id: 1, text: "Hello, I need a website built.", sender: 'client', timestamp: '2023-07-01 10:00:00' },
        { id: 2, text: "Sure, I'd be happy to help. What are the specifics?", sender: 'freelancer', timestamp: '2023-07-01 10:05:00' },
      ]
    },
    // Add more initial chats as needed
  ]);

  const addMessage = (chatId: number, message: Omit<Message, 'id' | 'timestamp'>) => {
    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            {
              ...message,
              id: chat.messages.length + 1,
              timestamp: new Date().toISOString()
            }
          ]
        };
      }
      return chat;
    }));
  };

  return (
    <MessageContext.Provider value={{ chats, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};