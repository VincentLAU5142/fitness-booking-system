import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/FitnessClass.css";

interface FitnessClass {
  id: number;
  name: string;
  time: string;
  instructor: string;
  capacity: number;
  enrolled: number;
  image: string;
}

interface FitnessClassCardProps {
  fitnessClass: FitnessClass;
  isAuthenticated: boolean;
}

const FitnessClassCard: React.FC<FitnessClassCardProps> = ({
  fitnessClass,
  isAuthenticated,
}) => {
  const navigate = useNavigate();
  const { name, time, instructor, capacity, enrolled, image } = fitnessClass;

  return (
    <div className="fitness-class-card">
      <div className="class-image">
        <img
          src={image}
          alt={name}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/placeholder-image.jpg";
          }}
        />
      </div>
      <div className="class-info">
        <h2>{name}</h2>
        <p>Time: {time}</p>
        <p>Instructor: {instructor}</p>
        <p>Remaining Capacity: {capacity - enrolled}</p>
      </div>
      <button
        className="enroll-button"
        onClick={() => navigate(`/dashboard`)}
        disabled={!isAuthenticated}
      >
        Book Now
      </button>
    </div>
  );
};

export default FitnessClassCard;