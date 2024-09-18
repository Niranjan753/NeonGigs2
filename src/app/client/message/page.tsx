'use client';

import React from 'react';
import ClientNav from '@/components/client/Nav';
import WhatsAppReplica from '@/components/client/message';

const MessagePage = () => {
  return (
    <div className="flex bg-black text-white">
      <div className="fixed h-screen">
        <ClientNav />
      </div>
      <main className="flex-1 p-6 ml-64">
        <WhatsAppReplica />
      </main>
    </div>
  );
};

export default MessagePage;
