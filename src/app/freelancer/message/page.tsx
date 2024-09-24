'use client';

import React from 'react';
import FreelancerMessage from '@/components/freelancer/message';
import Sidebar from '@/components/freelancer/Nav';

const FreelancerMessagePage = () => {
  return (
    <div className="flex min-h-screen bg-black">
      <div className="fixed top-0 left-0 h-full">
        <Sidebar />
      </div>
      <div className="flex-grow ml-64 overflow-y-auto">
        <div className="p-4 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-4">Messages</h1>
          <FreelancerMessage />
        </div>
      </div>
    </div>
  );
};

export default FreelancerMessagePage;