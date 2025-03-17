import React, { useState, useEffect } from "react";
import FitnessClassCard from "./FitnessClassCard";
import "../../styles/FitnessClass.css";

interface FitnessClass {
  id: number;
  name: string;
  time: string;
  instructor: string;
  capacity: number;
  enrolled: number;
  image: string;
  description: string;
  duration: number;
}

interface FitnessClassListProps {
  isAuthenticated: boolean;
}

const FitnessClassList: React.FC<FitnessClassListProps> = ({
  isAuthenticated,
}) => {
  const [classes, setClasses] = useState<FitnessClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchClasses = async () => {
      try {
        const data = await getFitnessClasses();
        if (mounted) {
          setClasses(data ?? []); // Using nullish coalescing operator
        }
      } catch (err) {
        if (mounted) {
          const error = err as Error;
          setError(error.message ?? "Failed to load fitness classes");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchClasses();

    return () => {
      mounted = false; // Cleanup to prevent setting state on unmounted component
    };
  }, []);

  if (loading) return <div className="loading">Loading classes...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!classes.length)
    return <div className="loading">No classes available</div>;

  return (
    <div className="fitness-class-list">
      {classes.map((fitnessClass) => (
        <FitnessClassCard
          key={fitnessClass.id || Math.random()} // Fallback for missing IDs
          fitnessClass={fitnessClass}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  );
};

export default FitnessClassList;

export const getFitnessClasses = async (): Promise<FitnessClass[]> => {
  try {
    const response = await fetch('/public/data/fitness-classes.json');
    if (!response.ok) {
      throw new Error('Failed to fetch fitness classes');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching fitness classes:', error);
    return [];
  }
};

export const bookFitnessClass = async (classId: number): Promise<void> => {
  // Implementation for booking a fitness class
};