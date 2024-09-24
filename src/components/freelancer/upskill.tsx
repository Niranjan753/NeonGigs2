'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faVideo, faCode, faCheckCircle, faUser, faShare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UpSkill = () => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [testMode, setTestMode] = useState(false);
  const [mentorAssigned, setMentorAssigned] = useState(false);

  const skills = [
    { name: 'React', icon: faCode },
    { name: 'Node.js', icon: faCode },
    { name: 'Python', icon: faCode },
    { name: 'Machine Learning', icon: faBook },
    { name: 'UI/UX Design', icon: faVideo },
  ];

  const freeCourses = {
    'React': [
      { name: 'React Fundamentals', url: 'https://reactjs.org/tutorial/tutorial.html' },
      { name: 'React Hooks', url: 'https://reactjs.org/docs/hooks-intro.html' },
    ],
    'Node.js': [
      { name: 'Node.js Basics', url: 'https://nodejs.dev/learn' },
      { name: 'Express.js Crash Course', url: 'https://expressjs.com/en/starter/installing.html' },
    ],
    'Python': [
      { name: 'Python for Beginners', url: 'https://www.python.org/about/gettingstarted/' },
      { name: 'Python Data Structures', url: 'https://docs.python.org/3/tutorial/datastructures.html' },
    ],
    'Machine Learning': [
      { name: 'Intro to Machine Learning', url: 'https://www.coursera.org/learn/machine-learning' },
      { name: 'TensorFlow Tutorials', url: 'https://www.tensorflow.org/tutorials' },
    ],
    'UI/UX Design': [
      { name: 'UI Design Fundamentals', url: 'https://www.coursera.org/learn/ui-design' },
      { name: 'UX Design Principles', url: 'https://www.interaction-design.org/courses/user-experience-the-beginner-s-guide' },
    ],
  };

  const skillProgressData = [
    { month: 'Jan', React: 20, 'Node.js': 15, Python: 10, 'Machine Learning': 5, 'UI/UX Design': 8 },
    { month: 'Feb', React: 25, 'Node.js': 18, Python: 12, 'Machine Learning': 7, 'UI/UX Design': 10 },
    { month: 'Mar', React: 30, 'Node.js': 22, Python: 15, 'Machine Learning': 10, 'UI/UX Design': 12 },
    { month: 'Apr', React: 35, 'Node.js': 25, Python: 18, 'Machine Learning': 12, 'UI/UX Design': 15 },
    { month: 'May', React: 40, 'Node.js': 30, Python: 22, 'Machine Learning': 15, 'UI/UX Design': 18 },
    { month: 'Jun', React: 45, 'Node.js': 35, Python: 25, 'Machine Learning': 18, 'UI/UX Design': 20 },
  ];

  const handleTakeTest = () => {
    setTestMode(true);
    setTimeout(() => {
      setMentorAssigned(true);
    }, 2000);
  };

  const handleEndTest = () => {
    setTestMode(false);
    setMentorAssigned(false);
  };

  const renderContent = () => {
    if (testMode) {
      return (
        <div className="space-y-4 text-center">
          {!mentorAssigned ? (
            <p className="text-xl">Assigning a mentor...</p>
          ) : (
            <>
              <p className="text-xl text-green-500"><FontAwesomeIcon icon={faCheckCircle} className="mr-2" />Mentor assigned</p>
              <button className="bg-black text-white px-4 py-2 rounded border border-green-600 hover:bg-green-600 transition duration-300">
                <FontAwesomeIcon icon={faShare} className="mr-2" />Share Screen
              </button>
              <button onClick={handleEndTest} className="ml-4 bg-black text-white px-4 py-2 rounded border border-red-600 hover:bg-red-600 transition duration-300">
                <FontAwesomeIcon icon={faTimes} className="mr-2" />End Test
              </button>
            </>
          )}
        </div>
      );
    }

    if (!selectedSkill) {
      return (
        <div className="text-center text-gray-400">
          <p>Select a skill to start learning</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">{selectedSkill} Learning Path</h2>
        {freeCourses[selectedSkill].map((course, index) => (
          <div key={index} className="bg-black p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition duration-300">
            <h3 className="text-lg font-medium text-white mb-2">{course.name}</h3>
            <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Start Free Course
            </a>
          </div>
        ))}
        <div className="bg-black p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition duration-300">
          <h3 className="text-lg font-medium text-white mb-2">{selectedSkill} Proficiency Test</h3>
          <p className="text-gray-300">Test your knowledge and get certified.</p>
          <button onClick={handleTakeTest} className="mt-2 bg-black text-white px-4 py-2 rounded border border-blue-600 hover:bg-blue-600 transition duration-300">
            <FontAwesomeIcon icon={faUser} className="mr-2" />Take Test
          </button>
        </div>
      </div>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black p-2 rounded shadow-md border border-gray-700">
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

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <div className="flex flex-1">
        {!testMode && (
          <div className="w-1/4 bg-black p-4 border-r border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Skills to Learn</h2>
            <ul className="space-y-2">
              {skills.map((skill) => (
                <li
                  key={skill.name}
                  className={`cursor-pointer p-2 rounded transition duration-300 ${
                    selectedSkill === skill.name ? 'bg-blue-600' : 'hover:bg-gray-800'
                  } border ${selectedSkill === skill.name ? 'border-blue-400' : 'border-gray-700'}`}
                  onClick={() => setSelectedSkill(skill.name)}
                >
                  <FontAwesomeIcon icon={skill.icon} className="mr-2" />
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={`${testMode ? 'w-full' : 'flex-1'} p-6`}>
          <h1 className="text-2xl font-bold mb-6">Upskill Your Talents</h1>
          {renderContent()}
        </div>
      </div>
      <div className="mt-8 p-6 bg-black rounded-lg shadow-lg border border-gray-700 hover:border-blue-500 transition duration-300">
        <h2 className="text-2xl font-bold mb-4 text-white">Your Skill Progress</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={skillProgressData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {skills.map((skill, index) => (
              <Line 
                key={skill.name}
                type="monotone" 
                dataKey={skill.name} 
                stroke={`hsl(${index * 60}, 70%, 50%)`}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UpSkill;
