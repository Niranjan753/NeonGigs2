'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRecommendedGigs } from '@/contexts/RecommendedGigsContext';

interface Gig {
  id: number;
  title: string;
  description: string;
  budget: number;
  proposals: string;
  postedAgo: string;
  skills: string[];
  recommendation?: string;
  isRecommending?: boolean;
}

const initialGigs: Gig[] = [
  {
    id: 1,
    title: "Full Stack Web Application Development",
    description: "We're seeking a skilled full-stack developer to build a robust web application for our e-commerce platform...",
    budget: 3000,
    proposals: "10-15",
    postedAgo: "2h ago",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "RESTful APIs"]
  },
  // ... other gigs
];

const ClientJobs = () => {
  const [gigs, setGigs] = useState<Gig[]>(initialGigs);
  const [showModal, setShowModal] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [newGig, setNewGig] = useState<Gig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addRecommendedGig } = useRecommendedGigs();

  const handleCreateGig = async () => {
    if (!prompt.trim()) {
      setError('Please enter a job description.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCuNbaPfdAA_-j5RMA9Hg0I_Rs9ecnArRw");
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(`Based on this job description, provide a JSON object with the following properties: title, description, budget (as a number), skills (as an array of strings). Job description: ${prompt}`);
      const response = await result.response;
      const text = response.text();

      // Extract JSON from the response text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in the response');
      }

      const jsonString = jsonMatch[0];
      const generatedGig = JSON.parse(jsonString);

      setNewGig({
        id: gigs.length + 1,
        ...generatedGig,
        proposals: "0",
        postedAgo: "Just now"
      });
    } catch (error) {
      console.error('Error generating gig:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGig = () => {
    if (newGig) {
      setGigs([newGig, ...gigs]);
      setNewGig(null);
      setShowModal(false);
      setPrompt('');
    }
  };

  const handleDeleteGig = (id: number) => {
    setGigs(gigs.filter(gig => gig.id !== id));
  };

  const handleRecommend = async (gig: Gig) => {
    setGigs(gigs.map(g => g.id === gig.id ? { ...g, isRecommending: true } : g));
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCuNbaPfdAA_-j5RMA9Hg0I_Rs9ecnArRw");
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Suggest 3 specific professional roles ideal for this job. Be concise and only list the professions. Job details:
      Title: ${gig.title}
      Description: ${gig.description}
      Skills: ${gig.skills.join(', ')}
      Budget: $${gig.budget}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const recommendation = response.text();

      setGigs(gigs.map(g => g.id === gig.id ? { ...g, recommendation, isRecommending: false } : g));
      addRecommendedGig({
        id: gig.id,
        title: gig.title,
        description: gig.description,
        budget: gig.budget,
        skills: gig.skills,
        proposals: gig.proposals,
        postedAgo: gig.postedAgo
      });
    } catch (error) {
      console.error('Error generating recommendation:', error);
      setGigs(gigs.map(g => g.id === gig.id ? { ...g, isRecommending: false } : g));
    }
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">My Jobs</h1>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6 flex items-center hover:bg-blue-600 transition-colors duration-300"
        onClick={() => setShowModal(true)}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Create Gig
      </button>
      <div className="space-y-4">
        {gigs.map((gig) => (
          <div key={gig.id} className="bg-black p-6 rounded-lg border border-silver">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-white">{gig.title}</h2>
              <button 
                className="text-red-500 hover:text-red-700 transition-colors duration-300"
                onClick={() => handleDeleteGig(gig.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <p className="text-gray-400 mb-4">{gig.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {gig.skills.map((skill, index) => (
                <span key={index} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-gray-400">Budget: </span>
                <span className="text-white font-semibold">${gig.budget.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-400">Proposals: </span>
                <span className="text-white">{gig.proposals}</span>
              </div>
              <span className="text-gray-400">{gig.postedAgo}</span>
              <button 
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-300 flex items-center"
                onClick={() => handleRecommend(gig)}
                disabled={gig.isRecommending}
              >
                {gig.isRecommending ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    Recommending...
                  </>
                ) : (
                  'Recommend'
                )}
              </button>
            </div>
            {gig.recommendation && (
              <div className="mt-4 bg-gray-800 p-4 rounded-lg border border-purple-500 shadow-lg">
                <p className="text-cyan-300 font-semibold mb-2">Recommended for:</p>
                <p className="text-gray-300 italic">{gig.recommendation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-8 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Create New Gig</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <textarea
              className="w-full bg-gray-800 text-white p-4 rounded mb-4"
              rows={4}
              placeholder="Describe your gig..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleCreateGig}
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Gig'}
            </button>

            {newGig && (
              <div className="mt-4 bg-gray-800 p-4 rounded">
                <h3 className="text-xl font-semibold mb-2">{newGig.title}</h3>
                <p className="text-gray-400 mb-2">{newGig.description}</p>
                <p className="mb-2">Budget: ${newGig.budget}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {newGig.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                  onClick={handleAddGig}
                >
                  Add Gig
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientJobs;