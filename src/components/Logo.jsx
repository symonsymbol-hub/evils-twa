import React from 'react';
import { motion } from 'framer-motion';

function Logo({ width = 40, height = 40 }) {
  const svgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  const pathVariants = (delay = 0) => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut", delay }
    }
  });

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      variants={svgVariants}
      initial="hidden"
      animate="visible"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Голова и уши */}
      <motion.path
        d="M 50 10 C 20 10, 20 90, 50 90 C 80 90, 80 10, 50 10 Z 
           M 30 20 L 40 40 L 35 45 Z
           M 70 20 L 60 40 L 65 45 Z"
        fill="none"
        stroke="#FF0033"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
        variants={pathVariants(0.5)}
        filter="url(#glow)"
      />
      
      {/* Глаза */}
      <motion.path
        d="M 35 55 L 45 60 M 65 55 L 55 60"
        fill="none"
        stroke="#F5F5F5"
        strokeWidth="5"
        strokeLinecap="round"
        variants={pathVariants(1.5)}
      />
    </motion.svg>
  );
}

export default Logo;