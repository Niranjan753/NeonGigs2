"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faFileAlt,
  faEnvelope,
  faStar,
  faChartLine,
  faComments,
  faDollarSign,
  faUserCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

const ClientNav = () => {
  const router = useRouter();

  const handleSwitchToFreelancer = () => {
    router.push("/freelancer");
  };

  const menuItems = [
    { icon: faHome, text: "Dashboard", href: "/client/main" },
    { icon: faBriefcase, text: "My Jobs", href: "/client/jobs" },
    { icon: faFileAlt, text: "Post a Job", href: "/client/post-job" },
    { icon: faEnvelope, text: "Messages", href: "/client/message" },
    { icon: faStar, text: "Reviews", href: "/client/reviews" },
    { icon: faChartLine, text: "Analytics", href: "/client/analytics" },
    { icon: faComments, text: "Feedback", href: "/client/feedback" },
    { icon: faDollarSign, text: "Payments", href: "/client/payments" },
    { icon: faUserCircle, text: "Profile", href: "/client/profile" },
    { icon: faCog, text: "Settings", href: "/client/settings" },
  ];

  return (
    <aside className="bg-black w-64 h-screen flex flex-col shadow-lg overflow-y-hidden">
      <div className="p-4 border-b border-white/10 flex items-center space-x-2">
        <Link href="/client/main">
          <h2 className="text-xl font-semibold text-white cursor-pointer">
            Supergigs
          </h2>
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="py-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center text-white py-2 px-4 hover:bg-white/10"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="w-5 h-5 mr-3 text-white/70"
                />
                <span className="text-sm">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-white/10 bg-white/5">
        <button
          onClick={handleSwitchToFreelancer}
          className="w-full bg-white text-black py-2 px-4 rounded text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300"
        >
          Switch to Freelancer
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

export default ClientNav;
