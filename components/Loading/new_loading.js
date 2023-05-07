import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex space-x-1">
        <div className="w-6 h-6 bg-[#DD9F00] rounded animate-bounce delay-0"></div>
        <div className="w-6 h-6 bg-[#DD9F00] rounded animate-bounce delay-200"></div>
        <div className="w-6 h-6 bg-[#DD9F00] rounded animate-bounce delay-400"></div>
        <div className="w-6 h-6 bg-[#DD9F00] rounded animate-bounce delay-600"></div>
      </div>
    </div>
  );
};

export default Loading;