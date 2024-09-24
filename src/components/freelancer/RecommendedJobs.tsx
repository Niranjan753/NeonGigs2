import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useRecommendedGigs } from '@/contexts/RecommendedGigsContext';

const RecommendedJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const { recommendedGigs, applyToGig } = useRecommendedGigs();

  const filteredJobs = recommendedGigs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'Newest':
        return new Date(b.timePosted).getTime() - new Date(a.timePosted).getTime();
      case 'Budget: High to Low':
        return b.budget - a.budget;
      case 'Budget: Low to High':
        return a.budget - b.budget;
      default:
        return 0;
    }
  });

  const handleApply = (jobId: number) => {
    applyToGig(jobId);
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
              <span>Budget: ${job.budget}</span>
              <span>{job.proposals} proposals</span>
              <span>{job.timePosted}</span>
            </div>
            {job.recommendation && (
              <div className="text-xs mb-2 text-green-400">
                <strong>Recommended for:</strong> {job.recommendation}
              </div>
            )}
            <div className="flex flex-wrap gap-1 mb-2">
              {job.skills.map((skill, index) => (
                <span key={index} className="bg-gray-700 text-xs px-2 py-1 rounded">{skill}</span>
              ))}
            </div>
            <div className="text-right">
            <button
  onClick={() => handleApply(job.id)}
  className={`text-xs font-bold py-2 px-4 rounded transition-colors duration-200 ${
    job.applied ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
  }`}
  disabled={job.applied}
>
  {job.applied ? 'Applied' : 'Apply'}
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