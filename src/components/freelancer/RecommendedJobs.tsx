import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useRecommendedGigs } from '@/contexts/RecommendedGigsContext';

const RecommendedJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Newest');

  const { recommendedGigs } = useRecommendedGigs();
  const jobs = recommendedGigs.length > 0 ? recommendedGigs : [
    { id: 1, title: "Full Stack Web Application Development", description: "We're seeking a skilled full-stack developer to build a robust web application for our e-commerce platform...", budget: "$3000.00", skills: ["React.js", "Node.js", "Express.js", "MongoDB", "RESTful APIs"], proposals: "10-15", timePosted: "2h ago" },
    { id: 2, title: "WordPress Website Redesign", description: "Our company is looking for an experienced WordPress developer to redesign and optimize our existing website...", budget: "$1500.00", skills: ["WordPress", "PHP", "MySQL", "HTML5", "CSS3"], proposals: "5-10", timePosted: "1d ago", rating: 4.9, spent: "$5000", location: "Canada" },
    { id: 3, title: "Frontend Development for SaaS Dashboard", description: "We need a talented frontend developer to create a modern, intuitive dashboard for our SaaS product...", budget: "$2500.00", skills: ["Vue.js", "JavaScript", "HTML5", "CSS3", "D3.js"], proposals: "<5", timePosted: "3h ago", rating: 4.7, spent: "$1800", location: "UK" },
    { id: 4, title: "Mobile App Development for iOS and Android", description: "Looking for a mobile developer to create a cross-platform app for both iOS and Android...", budget: "$5000.00", skills: ["React Native", "JavaScript", "iOS", "Android", "API Integration"], proposals: "15-20", timePosted: "5h ago", rating: 4.8, spent: "$12000", location: "USA" },
    { id: 5, title: "Data Visualization Expert for Analytics Platform", description: "We need a data visualization specialist to create interactive charts and graphs for our analytics platform...", budget: "$3500.00", skills: ["D3.js", "JavaScript", "SVG", "Canvas", "Data Analysis"], proposals: "5-10", timePosted: "1d ago", rating: 4.6, spent: "$8000", location: "Germany" },
    { id: 6, title: "Backend Developer for Scalable Microservices", description: "Seeking a backend developer to design and implement scalable microservices for our cloud-based platform...", budget: "$4000.00", skills: ["Java", "Spring Boot", "Microservices", "Docker", "Kubernetes"], proposals: "10-15", timePosted: "4h ago", rating: 4.9, spent: "$15000", location: "Australia" },
    { id: 7, title: "UI/UX Designer for Fintech Application", description: "We're looking for a talented UI/UX designer to create intuitive and visually appealing interfaces for our fintech app...", budget: "$2800.00", skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"], proposals: "<5", timePosted: "6h ago", rating: 4.7, spent: "$6000", location: "Singapore" },
    { id: 8, title: "DevOps Engineer for CI/CD Pipeline Optimization", description: "Need an experienced DevOps engineer to optimize our CI/CD pipeline and improve deployment processes...", budget: "$4500.00", skills: ["Jenkins", "AWS", "Docker", "Kubernetes", "Terraform"], proposals: "5-10", timePosted: "2d ago", rating: 4.8, spent: "$20000", location: "Netherlands" },
  ];

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'Newest':
        return new Date(b.timePosted).getTime() - new Date(a.timePosted).getTime();
      case 'Budget: High to Low':
        return parseFloat(b.budget.replace('$', '')) - parseFloat(a.budget.replace('$', ''));
      case 'Budget: Low to High':
        return parseFloat(a.budget.replace('$', '')) - parseFloat(b.budget.replace('$', ''));
      default:
        return 0;
    }
  });

  const handleApply = (jobId: number) => {
    console.log(`Applied to job with ID: ${jobId}`);
    // Implement your apply logic here
  };

  return (
    <div className="flex p-4 bg-black text-white max-w-6xl mx-auto text-sm">
      <div className="w-1/3 pr-4 sticky top-0 h-screen overflow-y-auto">
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-8 pr-2 py-1 border border-gray-700 rounded bg-black text-white text-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} className="absolute left-2 top-2 text-gray-400 text-xs" />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-xs mb-1">Sort by:</label>
          <select
            className="w-full bg-black text-white border border-gray-700 rounded px-2 py-1 text-xs"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Newest</option>
            <option>Budget: High to Low</option>
            <option>Budget: Low to High</option>
          </select>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-2">
            <FontAwesomeIcon icon={faInfoCircle} className="text-blue-400 mr-2" />
            <h3 className="text-sm font-semibold">Tailored Recommendations</h3>
          </div>
          <p className="text-xs text-gray-300">
            These gigs are curated based on your profile and skills, matching you directly with potential clients. Boost your profile ratings to unlock even more personalized and high-quality recommendations!
          </p>
        </div>
      </div>
      
      <div className="w-2/3 overflow-y-auto h-screen custom-scrollbar">
        {sortedJobs.map((job) => (
          <div key={job.id} className="bg-black border border-gray-700 rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-base font-bold">{job.title}</h2>
            <p className="text-xs mb-2">{job.description}</p>
            <div className="flex flex-wrap justify-between items-center text-xs mb-2">
              <span>Budget: {job.budget}</span>
              <span>{job.proposals}</span>
              <span>{job.timePosted}</span>
            </div>
            <div className="text-right">
              <button
                onClick={() => handleApply(job.id)}
                className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded transition-colors duration-200"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4a4a4a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #5a5a5a;
        }
      `}</style>
    </div>
  );
};

export default RecommendedJobs;