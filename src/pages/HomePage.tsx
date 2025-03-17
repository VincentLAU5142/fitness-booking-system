import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import FitnessClassCard from "../components/FitnessClass/FitnessClassCard";
import "../styles/HomePage.css";
import Loading from "../components/common/Loading";
import AnimationWrapper from "../components/Animation/AnimationWrapper";

interface Class {
  id: number;
  name: string;
  time: string;
  instructor: string;
  capacity: number;
  enrolled: number;
  enrolledCount: number;
  description: string;
  image: string;
  duration: number; 
}

interface Auth {
  isAuthenticated: boolean;
}

const HomePage = () => {
  const auth = useAuth() as unknown as Auth;
  const isAuthenticated = auth?.isAuthenticated ?? false;
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("/data/classes.json");
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }
        const data: Class[] = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchClasses();
  }, []);

  if (loading) {
    return <Loading message="Fetching fitness classes..." />; 
  }

  return (
    <div className="home-page">
      <header className="heading">
        <div className="overlay">
          <h1>Welcome to FitClub</h1>
          <p>"Sweat Today, Shine Tomorrow"</p>
        </div>
      </header>
      <main>
        <div className="fitness-class-list">
          {classes.map((fitnessClass) => (
            <AnimationWrapper key={fitnessClass.id}>
              <FitnessClassCard
                fitnessClass={fitnessClass}
                isAuthenticated={isAuthenticated}
              />
            </AnimationWrapper>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;