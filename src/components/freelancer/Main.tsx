'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Nav';
import Profile from './Profile';
import Earnings from './Earnings';
import Jobs from './Jobs';
import RecommendedJobs from './RecommendedJobs';
import Message from './message';
import UpSkill from './upskill';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FreelancerMain = () => {
  const pathname = usePathname();

  // Mock data for charts
  const earningsData = [
    { month: 'Jan', earnings: 4000, projects: 5 },
    { month: 'Feb', earnings: 3000, projects: 4 },
    { month: 'Mar', earnings: 5000, projects: 6 },
    { month: 'Apr', earnings: 4500, projects: 5 },
    { month: 'May', earnings: 6000, projects: 7 },
    { month: 'Jun', earnings: 5500, projects: 6 },
  ];

  const skillsData = [
    { name: 'React', value: 400, projects: 20 },
    { name: 'Node.js', value: 300, projects: 15 },
    { name: 'Python', value: 300, projects: 15 },
    { name: 'TypeScript', value: 200, projects: 10 },
  ];

  const projectsData = [
    { name: 'Completed', value: 45 },
    { name: 'In Progress', value: 10 },
    { name: 'Upcoming', value: 5 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black p-2 rounded shadow-md">
          <p className="text-white">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderContent = () => {
    switch (pathname) {
      case '/freelancer/profile':
        return <Profile />;
      case '/freelancer/earnings':
        return <Earnings />;
      case '/freelancer/recommendedjobs':
        return <RecommendedJobs />;
      case '/freelancer/jobs':
        return <Jobs />;
      case '/freelancer/message':
        return <Message />;
      case '/freelancer/upskill':
        return <UpSkill />;
      case '/freelancer':
        return (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-white mb-4">Dashboard Overview</h1>
            
            <div className="bg-black rounded-lg p-4 hover:bg-gray-900 transition duration-300">
              <h2 className="text-xl font-semibold text-white mb-2">Earnings & Projects</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis yAxisId="left" stroke="#fff" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="earnings" name="Earnings" stroke="#8884d8" activeDot={{ r: 6 }} />
                  <Line yAxisId="right" type="monotone" dataKey="projects" name="Projects" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black rounded-lg p-4 hover:bg-gray-900 transition duration-300">
                <h2 className="text-xl font-semibold text-white mb-2">Skills Distribution</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie dataKey="value" data={skillsData} fill="#8884d8" label />
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 text-sm">
                  <h3 className="font-semibold text-white">Top Skills:</h3>
                  <ul className="list-disc list-inside text-white">
                    {skillsData.slice(0, 2).map((skill) => (
                      <li key={skill.name}>{skill.name}: {skill.projects} projects</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
                <h2 className="text-2xl font-bold text-white mb-4">Project Status</h2>
                <div className="flex items-center justify-between mb-6">
                  {projectsData.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-green-400">{item.value}</div>
                      <div className="text-sm text-gray-400">{item.name}</div>
                    </div>
                  ))}
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                        Completion Rate
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-green-600">
                        {((projectsData[0].value / projectsData.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                    <div style={{ width: `${((projectsData[0].value / projectsData.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(0)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Total Projects: {projectsData.reduce((acc, curr) => acc + curr.value, 0)}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-white mb-4">Page Not Found</h1>
            <p className="text-white">The requested page does not exist.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <div className="fixed top-0 left-0 h-full">
        <Sidebar />
      </div>
      <div className="flex-grow ml-64 overflow-y-auto">
        <div className="p-4 max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FreelancerMain;