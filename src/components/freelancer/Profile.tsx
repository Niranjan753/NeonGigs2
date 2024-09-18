import React, { useState } from 'react';
import { StarIcon, PaperClipIcon, PencilIcon } from '@heroicons/react/solid';
import man from './man.jpg';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Skills');
  const [isEditing, setIsEditing] = useState(false);
  const [reviews, setReviews] = useState<Record<string, string[]>>({});
  const [newReviews, setNewReviews] = useState<Record<string, string>>({});

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Skills':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Technical Skills</h3>
            <ul className="list-disc list-inside">
              <li>React.js</li>
              <li>Node.js</li>
              <li>MongoDB</li>
              <li>Express.js</li>
              <li>TypeScript</li>
              <li>GraphQL</li>
            </ul>
          </div>
        );
      case 'Employment history':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Employment History</h3>
            <div className="relative border-l-2 border-gray-600 pl-4 mb-4">
              <div className="mb-4 relative">
                <div className="absolute -left-6 w-4 h-4 bg-blue-500 rounded-full"></div>
                <p className="font-medium">Senior Full Stack Developer at TechCorp India</p>
                <p className="text-sm text-gray-400">January 2020 - Present</p>
                <p className="text-sm mt-2">Led a team of 5 developers in building a scalable e-commerce platform.</p>
                <p className="text-sm">Implemented CI/CD pipelines, reducing deployment time by 40%.</p>
              </div>
              <div className="mb-4 relative">
                <div className="absolute -left-6 w-4 h-4 bg-blue-500 rounded-full"></div>
                <p className="font-medium">Full Stack Developer at WebSolutions Pvt Ltd</p>
                <p className="text-sm text-gray-400">June 2017 - December 2019</p>
                <p className="text-sm mt-2">Developed and maintained multiple client websites using MERN stack.</p>
                <p className="text-sm">Optimized database queries, improving application performance by 30%.</p>
              </div>
              <div className="mb-4 relative">
                <div className="absolute -left-6 w-4 h-4 bg-blue-500 rounded-full"></div>
                <p className="font-medium">Junior Developer at StartupX</p>
                <p className="text-sm text-gray-400">August 2016 - May 2017</p>
                <p className="text-sm mt-2">Assisted in the development of a mobile app using React Native.</p>
                <p className="text-sm">Participated in daily stand-ups and sprint planning meetings.</p>
              </div>
            </div>
          </div>
        );
      case 'Portfolio':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Portfolio Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black p-4 rounded hover:bg-gray-900 transition duration-300">
                <h4 className="font-medium">E-commerce Platform</h4>
                <p className="text-sm text-gray-400">React, Node.js, MongoDB</p>
                <p className="text-sm mt-2">GitHub: <a href="https://github.com/rahulsharma/ecommerce-platform" className="text-blue-400 hover:text-blue-300">github.com/rahulsharma/ecommerce-platform</a></p>
                <p className="text-sm">Description: A full-featured e-commerce platform with user authentication, product management, and payment integration.</p>
                <p className="text-sm mt-2">Stars: 245 | Forks: 78</p>
                <p className="text-sm">Last commit: 3 days ago</p>
              </div>
              <div className="bg-black p-4 rounded hover:bg-gray-900 transition duration-300">
                <h4 className="font-medium">Task Management App</h4>
                <p className="text-sm text-gray-400">React Native, Firebase</p>
                <p className="text-sm mt-2">GitHub: <a href="https://github.com/rahulsharma/task-management-app" className="text-blue-400 hover:text-blue-300">github.com/rahulsharma/task-management-app</a></p>
                <p className="text-sm">Description: A mobile app for task management with real-time updates, push notifications, and team collaboration features.</p>
                <p className="text-sm mt-2">Stars: 189 | Forks: 42</p>
                <p className="text-sm">Last commit: 1 week ago</p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">GitHub Contributions</h4>
              <img src="https://ghchart.rshah.org/rahulsharma" alt="GitHub Contributions" className="w-full" />
              <p className="text-sm mt-2">1,243 contributions in the last year</p>
              <ul className="text-sm mt-2">
                <li>• 532 commits</li>
                <li>• 215 pull requests</li>
                <li>• 178 issues opened</li>
                <li>• 318 code reviews</li>
              </ul>
            </div>
          </div>
        );
      case 'Education':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            <div className="relative border-l-2 border-gray-600 pl-4 mb-4">
              <div className="mb-4 relative">
                <div className="absolute -left-6 w-4 h-4 bg-blue-500 rounded-full"></div>
                <p className="font-medium">B.Tech in Computer Science</p>
                <p className="text-sm text-gray-400">Indian Institute of Technology, Mumbai</p>
                <p className="text-sm text-gray-400">2013 - 2017</p>
              </div>
              <div className="mb-4 relative">
                <div className="absolute -left-6 w-4 h-4 bg-blue-500 rounded-full"></div>
                <p className="font-medium">Higher Secondary Education</p>
                <p className="text-sm text-gray-400">Delhi Public School, New Delhi</p>
                <p className="text-sm text-gray-400">2011 - 2013</p>
              </div>
            </div>
          </div>
        );
      case 'Projects':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'E-commerce Platform', client: 'TechMart Inc.', status: 'Completed', tech: 'React, Node.js, MongoDB, Express' },
                { name: 'Task Management App', client: 'ProductivityPro', status: 'In Progress', tech: 'React Native, Firebase, Redux' },
                { name: 'AI-powered Chatbot', client: 'CustomerCare Solutions', status: 'Completed', tech: 'Python, TensorFlow, NLP' },
                { name: 'Blockchain-based Supply Chain', client: 'LogiChain Systems', status: 'In Progress', tech: 'Solidity, Ethereum, Web3.js' }
              ].map((project) => (
                <div key={project.name} className="bg-black p-4 rounded hover:bg-gray-900 transition duration-300">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">Tech Stack: {project.tech}</p>
                  <p className="text-sm mt-2">Status: <span className={`font-medium ${project.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>{project.status}</span></p>
                  <p className="text-sm">Client: {project.client}</p>
                  <div className="mt-4">
                    <h4 className="font-medium">Reviews:</h4>
                    {reviews[project.name] && reviews[project.name].map((review, index) => (
                      <p key={index} className="text-sm">{review}</p>
                    ))}
                  </div>
                  <textarea
                    className="w-full bg-gray-900 text-white rounded p-2 text-sm mt-2"
                    rows={2}
                    placeholder="Add your review..."
                    value={newReviews[project.name] || ''}
                    onChange={(e) => setNewReviews({...newReviews, [project.name]: e.target.value})}
                  ></textarea>
                  <button 
                    className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition duration-300"
                    onClick={() => {
                      if (newReviews[project.name]) {
                        setReviews({
                          ...reviews,
                          [project.name]: [...(reviews[project.name] || []), newReviews[project.name]]
                        });
                        setNewReviews({...newReviews, [project.name]: ''});
                      }
                    }}
                  >
                    Add Review
                  </button>
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
        {/* Edit button */}
        <button
          className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 transition duration-300"
          onClick={() => setIsEditing(!isEditing)}
        >
          <PencilIcon className="h-5 w-5 mr-2" />
          {isEditing ? 'Save' : 'Edit'}
        </button>

        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="#" className="text-blue-400 hover:text-blue-300">Profile</a>
            </li>
          </ol>
        </nav>

        {/* Main profile card */}
        <div className="bg-black rounded-lg shadow-lg p-6 mb-6 hover:bg-gray-900 transition duration-300">
          <div className="flex flex-col md:flex-row">
            {man && (
              <img 
                src={man.src} 
                alt="Rahul Sharma" 
                className="w-48 h-48 rounded-lg object-cover mb-4 md:mb-0 md:mr-6" 
              />
            )}
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold">Rahul Sharma</h1>
                  <p className="text-blue-400">Full Stack Developer</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><span className="text-gray-400">Jobs:</span> 35</p>
                  <p><span className="text-gray-400">Specialization:</span> Full Stack Development</p>
                </div>
                <div>
                  <p><span className="text-gray-400">Job success:</span> 
                    <span className="text-yellow-400">★★★★☆</span> (12 reviews)
                  </p>
                  <p><span className="text-gray-400">Total earned:</span> ₹30L+</p>
                  <p><span className="text-gray-400">Hourly rate:</span> ₹2000</p>
                  <p><span className="text-gray-400">Hours worked:</span> 1850</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-gray-400">Attachments:</span>
                <a href="#" className="text-blue-400 ml-2 flex items-center hover:text-blue-300">
                  <PaperClipIcon className="h-5 w-5 mr-1" />
                  Rahul Sharma - Full Stack Developer Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-4">
            {['Skills', 'Employment history', 'Portfolio', 'Education', 'Projects'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-gray-300 hover:text-white px-3 py-2 font-medium text-sm rounded-md transition duration-300 ${
                  activeTab === tab ? 'bg-gray-900' : 'hover:bg-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-black rounded-lg shadow-lg p-6 mb-6 hover:bg-gray-900 transition duration-300">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
