import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faChartBar, faSortAmountDown, faSortAmountUp, faRobot } from '@fortawesome/free-solid-svg-icons';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('All');
  const [sortBy, setSortBy] = useState('timePosted');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [aiInsights, setAiInsights] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Any');
  const [projectDuration, setProjectDuration] = useState('Any');
  const [location, setLocation] = useState('');

  const jobs = [
    { id: 1, title: "Full Stack Web Application Development", description: "We're seeking a skilled full-stack developer to build a robust web application for our e-commerce platform...", budget: 3000, skills: ["React.js", "Node.js", "Express.js", "MongoDB", "RESTful APIs"], proposals: 12, timePosted: new Date(Date.now() - 2 * 60 * 60 * 1000), location: "Remote", duration: "3 months", experienceLevel: "Intermediate" },
    { id: 2, title: "WordPress Website Redesign", description: "Our company is looking for an experienced WordPress developer to redesign and optimize our existing website...", budget: 1500, skills: ["WordPress", "PHP", "MySQL", "HTML5", "CSS3"], proposals: 7, timePosted: new Date(Date.now() - 24 * 60 * 60 * 1000), location: "New York, USA", duration: "1 month", experienceLevel: "Expert" },
    { id: 3, title: "Frontend Development for SaaS Dashboard", description: "We need a talented frontend developer to create a modern, intuitive dashboard for our SaaS product...", budget: 2500, skills: ["Vue.js", "JavaScript", "HTML5", "CSS3", "D3.js"], proposals: 3, timePosted: new Date(Date.now() - 3 * 60 * 60 * 1000), location: "Remote", duration: "2 months", experienceLevel: "Intermediate" },
    { id: 4, title: "Mobile App Development for iOS and Android", description: "Looking for a skilled mobile developer to create a cross-platform app for both iOS and Android...", budget: 5000, skills: ["React Native", "JavaScript", "iOS", "Android", "API Integration"], proposals: 15, timePosted: new Date(Date.now() - 5 * 60 * 60 * 1000), location: "San Francisco, USA", duration: "4 months", experienceLevel: "Expert" },
    { id: 5, title: "E-commerce Website Development", description: "We need an experienced developer to build a fully functional e-commerce website with payment integration...", budget: 3500, skills: ["Shopify", "Liquid", "JavaScript", "HTML5", "CSS3"], proposals: 9, timePosted: new Date(Date.now() - 8 * 60 * 60 * 1000), location: "Remote", duration: "2 months", experienceLevel: "Intermediate" },
    { id: 6, title: "AI Chatbot Development", description: "Seeking a developer with AI/ML experience to create an intelligent chatbot for customer support...", budget: 4000, skills: ["Python", "Natural Language Processing", "Machine Learning", "API Integration"], proposals: 6, timePosted: new Date(Date.now() - 10 * 60 * 60 * 1000), location: "London, UK", duration: "3 months", experienceLevel: "Expert" },
    { id: 7, title: "Backend API Development", description: "We're looking for a backend developer to create robust APIs for our mobile application...", budget: 2800, skills: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "GraphQL"], proposals: 8, timePosted: new Date(Date.now() - 15 * 60 * 60 * 1000), location: "Remote", duration: "2 months", experienceLevel: "Intermediate" },
    { id: 8, title: "UI/UX Design for Web Application", description: "Need a talented UI/UX designer to create an intuitive and visually appealing interface for our web app...", budget: 2000, skills: ["Figma", "Adobe XD", "UI Design", "UX Design", "Prototyping"], proposals: 11, timePosted: new Date(Date.now() - 20 * 60 * 60 * 1000), location: "Berlin, Germany", duration: "1 month", experienceLevel: "Expert" },
  ];

  const filteredAndSortedJobs = useMemo(() => {
    return jobs
      .filter(job => 
        (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) &&
        (filterBy === 'All' || job.skills.includes(filterBy)) &&
        (experienceLevel === 'Any' || job.experienceLevel === experienceLevel) &&
        (projectDuration === 'Any' || job.duration === projectDuration) &&
        (location === '' || job.location.toLowerCase().includes(location.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === 'timePosted') {
          return sortOrder === 'desc' ? b.timePosted.getTime() - a.timePosted.getTime() : a.timePosted.getTime() - b.timePosted.getTime();
        } else if (sortBy === 'budget') {
          return sortOrder === 'desc' ? b.budget - a.budget : a.budget - b.budget;
        } else if (sortBy === 'proposals') {
          return sortOrder === 'desc' ? b.proposals - a.proposals : a.proposals - b.proposals;
        }
        return 0;
      });
  }, [searchTerm, filterBy, sortBy, sortOrder, experienceLevel, projectDuration, location]);

  const analysis = useMemo(() => {
    const totalJobs = filteredAndSortedJobs.length;
    const totalBudget = filteredAndSortedJobs.reduce((sum, job) => sum + job.budget, 0);
    const avgBudget = totalBudget / totalJobs;
    const medianBudget = totalJobs > 0 ? filteredAndSortedJobs.sort((a, b) => a.budget - b.budget)[Math.floor(totalJobs / 2)].budget : 0;
    const totalProposals = filteredAndSortedJobs.reduce((sum, job) => sum + job.proposals, 0);
    const avgProposals = totalProposals / totalJobs;
    const medianProposals = filteredAndSortedJobs.sort((a, b) => a.proposals - b.proposals)[Math.floor(totalJobs / 2)].proposals;
    
    const skillCounts = filteredAndSortedJobs
      .flatMap(job => job.skills)
      .reduce((acc, skill) => {
        acc[skill] = (acc[skill] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    
    const sortedTopSkills = Object.entries(skillCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const jobsPostedLast24Hours = filteredAndSortedJobs.filter(job => 
      (new Date().getTime() - job.timePosted.getTime()) / (1000 * 60 * 60) <= 24
    ).length;

    const competitionLevel = totalProposals / totalJobs > 10 ? 'High' : totalProposals / totalJobs > 5 ? 'Medium' : 'Low';

    return {
      totalJobs,
      totalBudget,
      avgBudget: avgBudget.toFixed(2),
      medianBudget,
      totalProposals,
      avgProposals: avgProposals.toFixed(1),
      medianProposals,
      topSkills: sortedTopSkills,
      jobsPostedLast24Hours,
      competitionLevel,
    };
  }, [filteredAndSortedJobs]);

  const formatTimePosted = (date: Date) => {
    const diff = (new Date().getTime() - date.getTime()) / 1000;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const handleApply = (jobId: number) => {
    setAppliedJobs(prev => [...prev, jobId]);
  };

  const handleAdvancedSearch = () => {
    setAdvancedSearch(!advancedSearch);
  };

  const generateAIInsights = () => {
    // Simulating AI-generated insights
    const insights = [
      "Based on current trends, React.js and Node.js skills are in high demand.",
      "Jobs with budgets over $3000 tend to receive 20% more proposals.",
      "Remote jobs are becoming increasingly popular, with a 30% increase in the last month.",
      "Freelancers with a combination of frontend and backend skills are more likely to be hired.",
      "Projects requiring AI/ML skills have the highest average budget.",
    ];
    setAiInsights(insights[Math.floor(Math.random() * insights.length)]);
  };

  return (
    <div className="flex flex-col p-4 bg-black text-white max-w-6xl mx-auto text-sm">
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search jobs, skills, or keywords..."
            className="w-full pl-8 pr-2 py-1 border border-gray-700 rounded bg-black text-white text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="absolute left-2 top-2 text-gray-400 text-xs" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faFilter} className="mr-2 text-gray-400 text-xs" />
            <select
              className="bg-black text-white border border-gray-700 rounded px-2 py-1 text-xs"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option>All</option>
              <option>React.js</option>
              <option>Node.js</option>
              <option>WordPress</option>
              <option>Vue.js</option>
              <option>React Native</option>
            </select>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faSortAmountDown} className="mr-2 text-gray-400 text-xs" />
            <select
              className="bg-black text-white border border-gray-700 rounded px-2 py-1 text-xs"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="timePosted">Time Posted</option>
              <option value="budget">Budget</option>
              <option value="proposals">Proposals</option>
            </select>
          </div>
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold py-1 px-2 rounded transition-colors duration-200"
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
          >
            <FontAwesomeIcon icon={sortOrder === 'desc' ? faSortAmountDown : faSortAmountUp} />
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded transition-colors duration-200"
            onClick={() => setShowAnalysis(!showAnalysis)}
          >
            <FontAwesomeIcon icon={faChartBar} className="mr-1" />
            {showAnalysis ? 'Hide Analysis' : 'Show Analysis'}
          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-1 px-2 rounded transition-colors duration-200"
            onClick={handleAdvancedSearch}
          >
            Advanced Search
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1 px-2 rounded transition-colors duration-200"
            onClick={generateAIInsights}
          >
            <FontAwesomeIcon icon={faRobot} className="mr-1" />
            AI Insights
          </button>
        </div>
      </div>

      {advancedSearch && (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Advanced Search</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-1">Experience Level</label>
              <select 
                className="w-full bg-black text-white border border-gray-700 rounded px-2 py-1 text-xs"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                <option>Any</option>
                <option>Entry</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Project Duration</label>
              <select 
                className="w-full bg-black text-white border border-gray-700 rounded px-2 py-1 text-xs"
                value={projectDuration}
                onChange={(e) => setProjectDuration(e.target.value)}
              >
                <option>Any</option>
                <option>Less than 1 month</option>
                <option>1-3 months</option>
                <option>3-6 months</option>
                <option>More than 6 months</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Location</label>
              <input 
                type="text" 
                placeholder="e.g. Remote, New York" 
                className="w-full bg-black text-white border border-gray-700 rounded px-2 py-1 text-xs"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {aiInsights && (
        <div className="mb-4 p-4 bg-green-800 rounded-lg">
          <h3 className="text-lg font-bold mb-2">AI Insight</h3>
          <p>{aiInsights}</p>
        </div>
      )}

      {showAnalysis && (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Job Market Analysis</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>Total Jobs: {analysis.totalJobs}</p>
              <p>Total Budget: ${analysis.totalBudget.toLocaleString()}</p>
              <p>Average Budget: ${analysis.avgBudget}</p>
              <p>Median Budget: ${analysis.medianBudget.toLocaleString()}</p>
              <p>Total Proposals: {analysis.totalProposals}</p>
              <p>Average Proposals: {analysis.avgProposals}</p>
              <p>Median Proposals: {analysis.medianProposals}</p>
            </div>
            <div>
              <p>Jobs Posted (Last 24h): {analysis.jobsPostedLast24Hours}</p>
              <p>Competition Level: {analysis.competitionLevel}</p>
              <p className="font-bold mt-2">Top Skills:</p>
              <ul>
                {analysis.topSkills.map(([skill, count]) => (
                  <li key={skill}>{skill}: {count} jobs</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {filteredAndSortedJobs.map((job) => (
          <div key={job.id} className="bg-black border border-gray-700 rounded-lg shadow-md p-4 hover:border-gray-500 transition-colors duration-200">
            <h2 className="text-base font-bold mb-2">{job.title}</h2>
            <p className="text-xs mb-2">{job.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {job.skills.map((skill, index) => (
                <span key={index} className="bg-gray-800 text-xs px-2 py-1 rounded">{skill}</span>
              ))}
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Budget: ${job.budget.toFixed(2)}</span>
              <span>Proposals: {job.proposals}</span>
              <span>{formatTimePosted(job.timePosted)}</span>
            </div>
            <div className="flex justify-between items-center text-xs mt-2">
              <span>Location: {job.location}</span>
              <span>Duration: {job.duration}</span>
              <span>Experience: {job.experienceLevel}</span>
            </div>
            <div className="mt-4 text-right">
              <button 
                className={`${appliedJobs.includes(job.id) ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'} text-white text-xs font-bold py-2 px-4 rounded transition-colors duration-200`}
                onClick={() => handleApply(job.id)}
                disabled={appliedJobs.includes(job.id)}
              >
                {appliedJobs.includes(job.id) ? 'Applied' : 'Apply'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
