'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import ClientNav from './Nav';
import ClientProfile from './profile';
import ClientJobs from './jobs';
import ClientMessage from './message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUsers, faDollarSign, faChartLine } from '@fortawesome/free-solid-svg-icons';

const ClientMain = () => {
  const pathname = usePathname();

  const renderContent = () => {
    switch (pathname) {
      case '/client/profile':
            return <ClientProfile />;
      case '/client/jobs':
            return <ClientJobs />;
      case '/client/message':
            return <ClientMessage />;
      default:
        return (
          <>
            <h1 className="text-3xl font-bold mb-6">Client Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard icon={faBriefcase} title="Active Projects" value="5" />
              <DashboardCard icon={faUsers} title="Hired Freelancers" value="12" />
              <DashboardCard icon={faDollarSign} title="Total Spent" value="$15,230" />
              <DashboardCard icon={faChartLine} title="Project Success Rate" value="92%" />
            </div>
            <div className="bg-black rounded-lg shadow p-6 mb-8 border border-gray-500">
              <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-500">
                      <th className="pb-3">Project Name</th>
                      <th className="pb-3">Freelancer</th>
                      <th className="pb-3">Deadline</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ProjectRow name="Website Redesign" freelancer="John Doe" deadline="2023-07-15" status="In Progress" />
                    <ProjectRow name="Mobile App Development" freelancer="Jane Smith" deadline="2023-08-01" status="On Hold" />
                    <ProjectRow name="SEO Optimization" freelancer="Mike Johnson" deadline="2023-07-30" status="Completed" />
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex bg-black text-white">
      <div className="fixed h-screen">
        <ClientNav />
      </div>
      <main className="flex-1 p-6 ml-64">
        {renderContent()}
      </main>
    </div>
  );
};

const DashboardCard = ({ icon, title, value }: { icon: any; title: string; value: string }) => (
  <div className="bg-black rounded-lg shadow p-4 border border-gray-500">
    <div className="flex items-center mb-2">
      <FontAwesomeIcon icon={icon} className="text-blue-500 mr-2" />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ProjectRow = ({ name, freelancer, deadline, status }: { name: string; freelancer: string; deadline: string; status: string }) => (
  <tr className="border-b border-gray-500">
    <td className="py-3">{name}</td>
    <td className="py-3">{freelancer}</td>
    <td className="py-3">{deadline}</td>
    <td className="py-3">
      <span className={`px-2 py-1 rounded text-sm border ${
        status === 'Completed' ? 'border-green-500 text-green-500' :
        status === 'In Progress' ? 'border-blue-500 text-blue-500' :
        'border-yellow-500 text-yellow-500'
      }`}>
        {status}
      </span>
    </td>
  </tr>
);

export default ClientMain;
