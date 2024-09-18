import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Earnings = () => {
  const [activeTab, setActiveTab] = useState('Monthly Earnings');

  const monthlyEarningsData = [
    { month: 'Jan', earnings: 4000, projects: 5 },
    { month: 'Feb', earnings: 3000, projects: 4 },
    { month: 'Mar', earnings: 5000, projects: 6 },
    { month: 'Apr', earnings: 4500, projects: 5 },
    { month: 'May', earnings: 6000, projects: 7 },
    { month: 'Jun', earnings: 5500, projects: 6 },
  ];

  const projectEarningsData = [
    { project: 'E-commerce Website Redesign', earnings: 3500, duration: 40, hourlyRate: 35 },
    { project: 'Mobile App Development', earnings: 5000, duration: 60, hourlyRate: 40 },
    { project: 'API Integration for CRM', earnings: 2000, duration: 25, hourlyRate: 30 },
    { project: 'Data Visualization Dashboard', earnings: 2800, duration: 35, hourlyRate: 32 },
    { project: 'AI Chatbot Implementation', earnings: 4200, duration: 50, hourlyRate: 38 },
  ];

  const earningsBySkillData = [
    { skill: 'React', value: 3000, projects: 10 },
    { skill: 'Node.js', value: 2000, projects: 7 },
    { skill: 'Python', value: 1500, projects: 5 },
    { skill: 'TypeScript', value: 1000, projects: 3 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const escrowData = [
    { id: 1, clientName: 'John Doe', paymentDetails: '$2000', projectName: 'E-commerce Website', status: 'Succeeded' },
    { id: 2, clientName: 'Jane Smith', paymentDetails: '$3500', projectName: 'Mobile App Development', status: 'Processing' },
    { id: 3, clientName: 'Bob Johnson', paymentDetails: '$1500', projectName: 'API Integration', status: 'Not Paid' },
    { id: 4, clientName: 'Alice Brown', paymentDetails: '$2800', projectName: 'Data Visualization Dashboard', status: 'Succeeded' },
    { id: 5, clientName: 'Charlie Wilson', paymentDetails: '$4200', projectName: 'AI Chatbot Implementation', status: 'Processing' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Monthly Earnings':
        return (
          <div className="bg-black rounded-lg shadow-lg p-3 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Monthly Earnings</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyEarningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis yAxisId="left" stroke="#fff" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', border: 'none' }} />
                <Legend wrapperStyle={{ color: '#fff' }} />
                <Line yAxisId="left" type="monotone" dataKey="earnings" name="Earnings ($)" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="projects" name="Projects" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      case 'Project Earnings':
        return (
          <div className="bg-black rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Project Earnings</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={projectEarningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="project" stroke="#888" tick={{fill: '#888'}}  />
                <YAxis yAxisId="left" stroke="#888" tick={{fill: '#888'}} />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" tick={{fill: '#82ca9d'}} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid #444',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }} 
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                  cursor={{fill: 'transparent'}}
                />
                <Legend wrapperStyle={{ color: '#888' }} />
                <Bar yAxisId="left" dataKey="earnings" name="Earnings ($)" fill="#8884d8" shape="rect" />
                <Bar yAxisId="right" dataKey="duration" name="Duration (days)" fill="#82ca9d" shape="rect" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-4">
              <h3 className="text-lg font-semibold text-white">Project Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectEarningsData.map((project, index) => (
                  <div key={index} className="text-white bg-gray-900 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">{project.project}</h4>
                    <p className="text-green-400">Earnings: ${project.earnings}</p>
                    <p className="text-blue-400">Duration: {project.duration} days</p>
                    <p className="text-yellow-400">Hourly Rate: ${project.hourlyRate}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'Earnings by Skill':
        return (
          <div className="bg-black rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Earnings by Skill</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={earningsBySkillData}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {earningsBySkillData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: 'none',
                    color: '#ffffff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-white">Skill Breakdown</h3>
              {earningsBySkillData.map((skill, index) => (
                <div key={index} className="mb-2 text-white">
                  <h4 className="font-semibold">{skill.skill}</h4>
                  <p>Earnings: ${skill.value}</p>
                  <p>Projects: {skill.projects}</p>
                  <p>Average per Project: ${(skill.value / skill.projects).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm mb-6">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="#" className="text-blue-400 hover:text-blue-300">Earnings</a>
            </li>
          </ol>
        </nav> 
        <h1 className="text-2xl font-bold mb-3 mt-0">Earnings Overview</h1>
        <div className="bg-black rounded-lg shadow-lg p-2 mb-6">
          <h2 className="text-xl font-semibold mb-4">Escrow Payments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-black border border-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-700 bg-gray-800 text-left text-xs leading-4 font-medium text-gray-400 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 border-b border-gray-700 bg-gray-800 text-left text-xs leading-4 font-medium text-gray-400 uppercase tracking-wider">
                    Client Name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-700 bg-gray-800 text-left text-xs leading-4 font-medium text-gray-400 uppercase tracking-wider">
                    Payment Details
                  </th>
                  <th className="px-6 py-3 border-b border-gray-700 bg-gray-800 text-left text-xs leading-4 font-medium text-gray-400 uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-700 bg-gray-800 text-left text-xs leading-4 font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {escrowData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-700">
                      <div className="text-sm leading-5 text-gray-300">{item.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-700">
                      <div className="text-sm leading-5 text-gray-300">{item.clientName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-700">
                      <div className="text-sm leading-5 text-gray-300">{item.paymentDetails}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-700">
                      <div className="text-sm leading-5 text-gray-300">{item.projectName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-700">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'Succeeded' ? 'bg-green-100 text-green-800' :
                        item.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-6">
          <nav className="flex space-x-4">
            {['Monthly Earnings', 'Project Earnings', 'Earnings by Skill'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-gray-300 px-3 py-2 font-medium text-sm rounded-md transition duration-300 ${
                  activeTab === tab ? 'bg-gray-800' : 'hover:bg-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="bg-black rounded-lg shadow-lg p-6 mb-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Earnings;