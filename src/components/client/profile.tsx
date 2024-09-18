'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faMapMarkerAlt, faBriefcase, faDollarSign, faStar, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import clientImage from './client.jpg';

const ClientProfile = () => {
  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg border border-gray-700">
      <div className="flex items-center mb-4">
        <div className="relative w-16 h-16 mr-4">
          <Image
            src={clientImage}
            alt="Client Avatar"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Rajesh Sharma</h1>
          <p className="text-gray-400">CEO at TechVision India</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faBuilding} className="text-blue-500 mr-2" />
          <span>TechVision India Pvt. Ltd.</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2" />
          <span>Bangalore, Karnataka</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 mr-2" />
          <span>rajesh.sharma@techvision.in</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faPhone} className="text-blue-500 mr-2" />
          <span>+91 98765 43210</span>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="text-gray-300 text-sm">
          Visionary tech entrepreneur with 12+ years of experience in IoT and smart city solutions. 
          Leading TechVision India to develop innovative products that address urban challenges in India. 
          Always on the lookout for talented Indian freelancers to contribute to our nation-building projects.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border border-gray-700 rounded p-3 hover:bg-gray-800 transition-colors duration-300">
          <h3 className="font-semibold mb-1">Projects Posted</h3>
          <span className="text-2xl font-bold text-blue-500">28</span>
        </div>
        <div className="border border-gray-700 rounded p-3 hover:bg-gray-800 transition-colors duration-300">
          <h3 className="font-semibold mb-1">Total Spent</h3>
          <span className="text-2xl font-bold text-green-500">₹45.2L</span>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Recent Projects</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between items-center">
            <span>Smart Traffic Management System</span>
            <span className="text-green-500">Completed</span>
          </li>
          <li className="flex justify-between items-center">
            <span>E-governance Mobile App</span>
            <span className="text-yellow-500">In Progress</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Freelancer Feedback</h2>
        <div className="flex items-center mb-1">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" />
          <span className="text-sm">4.8 / 5.0 (36 reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;