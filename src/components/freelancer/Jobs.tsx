import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('All');

  const jobs = [
    { id: 1, title: "Full Stack Web Application Development", description: "We're seeking a skilled full-stack developer to build a robust web application for our e-commerce platform...", budget: "$3000.00", skills: ["React.js", "Node.js", "Express.js", "MongoDB", "RESTful APIs"], proposals: "10-15", timePosted: "2h ago" },
    { id: 2, title: "WordPress Website Redesign", description: "Our company is looking for an experienced WordPress developer to redesign and optimize our existing website...", budget: "$1500.00", skills: ["WordPress", "PHP", "MySQL", "HTML5", "CSS3"], proposals: "5-10", timePosted: "1d ago" },
    { id: 3, title: "Frontend Development for SaaS Dashboard", description: "We need a talented frontend developer to create a modern, intuitive dashboard for our SaaS product...", budget: "$2500.00", skills: ["Vue.js", "JavaScript", "HTML5", "CSS3", "D3.js"], proposals: "<5", timePosted: "3h ago" },
    { id: 4, title: "Mobile App Development for iOS and Android", description: "Looking for a mobile developer to create a cross-platform app for both iOS and Android...", budget: "$5000.00", skills: ["React Native", "JavaScript", "iOS", "Android", "API Integration"], proposals: "15-20", timePosted: "5h ago" },
    { id: 5, title: "Data Visualization Expert for Analytics Platform", description: "We need a data visualization specialist to create interactive charts and graphs for our analytics platform...", budget: "$3500.00", skills: ["D3.js", "JavaScript", "SVG", "Canvas", "Data Analysis"], proposals: "5-10", timePosted: "1d ago" },
    { id: 6, title: "Backend Developer for Scalable Microservices", description: "Seeking a backend developer to design and implement scalable microservices for our cloud-based platform...", budget: "$4000.00", skills: ["Java", "Spring Boot", "Microservices", "Docker", "Kubernetes"], proposals: "10-15", timePosted: "4h ago" },
    { id: 7, title: "UI/UX Designer for Fintech Application", description: "We're looking for a talented UI/UX designer to create intuitive and visually appealing interfaces for our fintech app...", budget: "$2800.00", skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"], proposals: "<5", timePosted: "6h ago" },
    { id: 8, title: "DevOps Engineer for CI/CD Pipeline Optimization", description: "Need an experienced DevOps engineer to optimize our CI/CD pipeline and improve deployment processes...", budget: "$4500.00", skills: ["Jenkins", "AWS", "Docker", "Kubernetes", "Terraform"], proposals: "5-10", timePosted: "2d ago" },
    { id: 9, title: "Machine Learning Engineer for NLP Project", description: "We're seeking a machine learning engineer to develop and implement NLP models for our text analysis platform...", budget: "$6000.00", skills: ["Python", "TensorFlow", "NLP", "Machine Learning", "Deep Learning"], proposals: "10-15", timePosted: "8h ago" },
    { id: 10, title: "Blockchain Developer for DeFi Platform", description: "Looking for a blockchain developer to build smart contracts and implement DeFi protocols on Ethereum...", budget: "$5500.00", skills: ["Solidity", "Ethereum", "Web3.js", "Smart Contracts", "DeFi"], proposals: "5-10", timePosted: "12h ago" },
    { id: 11, title: "Game Developer for Unity 3D Project", description: "We need a skilled game developer to create an immersive 3D game using Unity engine...", budget: "$4000.00", skills: ["Unity", "C#", "3D Modeling", "Game Design", "Animation"], proposals: "15-20", timePosted: "1d ago" },
    { id: 12, title: "Cybersecurity Specialist for Penetration Testing", description: "Seeking a cybersecurity expert to conduct thorough penetration testing on our web applications...", budget: "$3800.00", skills: ["Penetration Testing", "Network Security", "Ethical Hacking", "OWASP", "Security Auditing"], proposals: "5-10", timePosted: "3h ago" },
    { id: 13, title: "AR/VR Developer for Immersive Training App", description: "We're looking for an AR/VR developer to create an immersive training application for industrial equipment operators...", budget: "$5200.00", skills: ["Unity", "ARKit", "VR Development", "3D Modeling", "C#"], proposals: "10-15", timePosted: "9h ago" },
    { id: 14, title: "Full Stack Developer for E-learning Platform", description: "Need a full stack developer to build a comprehensive e-learning platform with video streaming capabilities...", budget: "$4500.00", skills: ["React", "Node.js", "MongoDB", "WebRTC", "AWS"], proposals: "15-20", timePosted: "7h ago" },
  ];

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterBy === 'All' || job.skills.includes(filterBy))
  );

  return (
    <div className="flex flex-col p-4 bg-black text-white max-w-6xl mx-auto text-sm">
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full pl-8 pr-2 py-1 border border-gray-700 rounded bg-black text-white text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="absolute left-2 top-2 text-gray-400 text-xs" />
        </div>
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
      </div>
      
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-black border border-gray-700 rounded-lg shadow-md p-4 hover:border-gray-500 transition-colors duration-200">
            <h2 className="text-base font-bold mb-2">{job.title}</h2>
            <p className="text-xs mb-2">{job.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {job.skills.map((skill, index) => (
                <span key={index} className="bg-gray-800 text-xs px-2 py-1 rounded">{skill}</span>
              ))}
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Budget: {job.budget}</span>
              <span>Proposals: {job.proposals}</span>
              <span>{job.timePosted}</span>
            </div>
            <div className="mt-4 text-right">
              <button className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded transition-colors duration-200">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
