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
      clientName: 'John Doe',
      freelancerName: 'Jane Doe',
      messages: []
    }
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