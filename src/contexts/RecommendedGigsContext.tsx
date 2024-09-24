'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Application {
    freelancerId: number;
    freelancerName: string;
    freelancerEmail: string;
    freelancerSkills: string[];
}

interface Gig {
    id: number;
    title: string;
    description: string;
    budget: number;
    skills: string[];
    proposals: string;
    timePosted: string;
    recommendation?: string;
    applications?: Application[];
    applied?: boolean;
}

interface RecommendedGigsContextType {
    recommendedGigs: Gig[];
    addRecommendedGig: (gig: Gig) => void;
    applyToGig: (gigId: number) => void;
}

const RecommendedGigsContext = createContext<RecommendedGigsContextType | undefined>(undefined);

export const RecommendedGigsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [recommendedGigs, setRecommendedGigs] = useState<Gig[]>([]);

    const addRecommendedGig = (gig: Gig) => {
        setRecommendedGigs(prevGigs => [...prevGigs, { ...gig, applications: [] }]);
    };

    const applyToGig = (gigId: number) => {
        setRecommendedGigs(prevGigs => prevGigs.map(gig => {
            if (gig.id === gigId) {
                const newApplication: Application = {
                    freelancerId: 1, // This should be the actual freelancer's ID
                    freelancerName: 'John Doe', // This should be the actual freelancer's name
                    freelancerEmail: 'john@example.com', // This should be the actual freelancer's email
                    freelancerSkills: ['JavaScript', 'React', 'Node.js'], // This should be the actual freelancer's skills
                };
                return {
                    ...gig,
                    applied: true,
                    applications: [...(gig.applications || []), newApplication],
                };
            }
            return gig;
        }));
    };

    return (
        <RecommendedGigsContext.Provider value={{ recommendedGigs, addRecommendedGig, applyToGig }}>
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