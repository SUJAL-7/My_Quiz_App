import React from 'react';

const ProgressBar = ({ current, total }) => {
  const progressPercentage = (current / total) * 100;

  return (
    <div className="w-full bg-slate-700 rounded-full h-4 mb-4 border-2 border-slate-500">
      <div
        className="bg-cyan-400 h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;