'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Gig {
  id: number;
  title: string;
  description: string;
  budget: number;
  skills: string[];
  proposals: string;
  postedAgo: string;
}

interface RecommendedGigsContextType {
  recommendedGigs: Gig[];
  addRecommendedGig: (gig: Gig) => void;
}

const RecommendedGigsContext = createContext<RecommendedGigsContextType | undefined>(undefined);

export const RecommendedGigsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recommendedGigs, setRecommendedGigs] = useState<Gig[]>([]);

  const addRecommendedGig = (gig: Gig) => {
    setRecommendedGigs(prevGigs => [...prevGigs, gig]);
  };

  return (
    <RecommendedGigsContext.Provider value={{ recommendedGigs, addRecommendedGig }}>
      {children}
    </RecommendedGigsContext.Provider>
  );
};

export const useRecommendedGigs = () => {
  const context = useContext(RecommendedGigsContext);
  if (context === undefined) {
    throw new Error('useRecommendedGigs must be used within a RecommendedGigsProvider');
  }
  return context;
};