import { motion } from "framer-motion";
import React from "react";

interface AnimationWrapperProps {
  children: React.ReactNode;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;