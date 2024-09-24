import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Applications = () => {
  const recommendedGigs = [
    {
      id: 1,
      title: 'Web Developer',
      description: 'Looking for an experienced web developer to build a responsive website.',
      budget: 1500,
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      applications: [
        {
          freelancerId: 101,
          freelancerName: 'John Doe',
          freelancerEmail: 'john@example.com',
          freelancerSkills: ['HTML', 'CSS', 'JavaScript']
        },
        {
          freelancerId: 102,
          freelancerName: 'Jane Smith',
          freelancerEmail: 'jane@example.com',
          freelancerSkills: ['React', 'Redux', 'Node.js']
        }
      ]
    },
    {
      id: 2,
      title: 'Graphic Designer',
      description: 'Need a creative graphic designer for logo and branding.',
      budget: 800,
      skills: ['Photoshop', 'Illustrator', 'InDesign'],
      applications: [
        {
          freelancerId: 103,
          freelancerName: 'Alice Johnson',
          freelancerEmail: 'alice@example.com',
          freelancerSkills: ['Photoshop', 'Illustrator']
        }
      ]
    }
  ];

  return (
    <div className="p-6 bg-black text-white">
      <h1 className="text-2xl font-bold mb-6">Applications</h1>
      {recommendedGigs.filter(gig => gig.applications && gig.applications.length > 0).map((gig) => (
        <div key={gig.id} className="mb-8 border border-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">{gig.title}</h2>
          <p className="text-gray-400 mb-4">{gig.description}</p>
          <div className="mb-2">
            <span className="font-semibold">Budget:</span> ${gig.budget}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Skills:</span> {gig.skills.join(', ')}
          </div>
          <h3 className="text-lg font-semibold mb-2">Applicants:</h3>
          {gig.applications.map((application) => (
            <div key={application.freelancerId} className="border-t border-gray-700 py-2 flex justify-between items-center">
              <div>
                <p><span className="font-semibold">Name:</span> {application.freelancerName}</p>
                <p><span className="font-semibold">Email:</span> {application.freelancerEmail}</p>
                <p><span className="font-semibold">Skills:</span> {application.freelancerSkills.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
      <Link href="/client/message">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-300 flex items-center">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          Go to Messages
        </button>
      </Link>
    </div>
  );
};

export default Applications;