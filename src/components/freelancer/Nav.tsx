'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faBriefcase, faFileAlt, faEnvelope, 
  faStar, faChartLine, faComments, faDollarSign, 
  faUserCircle, faCog
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const router = useRouter();

  const handleSwitchToClient = () => {
    router.push('/client/main');
  };

  const menuItems = [
    { icon: faHome, text: 'Dashboard', href: '/freelancer' },
    { icon: faBriefcase, text: 'Jobs', href: '/freelancer/jobs' },
    { icon: faFileAlt, text: 'Recommended Jobs', href: '/freelancer/recommendedjobs' },
    { icon: faEnvelope, text: 'Messages', href: '/freelancer/message' },
    { icon: faStar, text: 'Reviews', href: '/freelancer/reviews' },
    { icon: faChartLine, text: 'Analytics', href: '/freelancer/analytics' },
    { icon: faComments, text: 'Feedback', href: '/freelancer/feedback' },
    { icon: faDollarSign, text: 'Earnings', href: '/freelancer/earnings' },
    { icon: faUserCircle, text: 'Profile', href: '/freelancer/profile' },
    { icon: faCog, text: 'Settings', href: '/freelancer/settings' },
  ];

  return (
    <aside className="bg-black w-64 h-screen flex flex-col shadow-lg overflow-y-hidden">
      <div className="p-4 border-b border-white/10 flex items-center space-x-2">
        <Link href="/">
          <h2 className="text-xl font-semibold text-white cursor-pointer">Supergigs</h2>
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="py-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} className="flex items-center text-white py-2 px-4 hover:bg-white/10">
                <FontAwesomeIcon icon={item.icon} className="w-5 h-5 mr-3 text-white/70" />
                <span className="text-sm">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-white/10 bg-white/5">
        <button 
          onClick={handleSwitchToClient}
          className="w-full bg-white text-black py-2 px-4 rounded text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300"
        >
          Switch to Client
        </button>
      </div>
      <div className="p-4 border-t border-white/10 flex items-center">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
          <span className="text-black font-medium text-sm">NR</span>
        </div>
        <span className="text-sm font-medium text-white">Niranjan R</span>
      </div>
    </aside>
  );
};

export default Sidebar;