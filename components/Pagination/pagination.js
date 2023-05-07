import React from "react";

const Pagination = ({ currentPage, setCurrentPage, itemsPerPage }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  }; 

  return (
    <div className="flex justify-center items-center mt-4 mb-8">
      <button
        onClick={handlePrevious}
        className={`font-mono font-semibold text-[#1F1D1B] cursor-pointer bg-[#DD9F00] px-4 py-2 rounded-md mr-2 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#DD9F00]/80"
        }`}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className="font-mono font-semibold text-white
      ">
        Page {currentPage}
      </div>
      <button
        onClick={handleNext}
        className="font-mono font-semibold text-[#1F1D1B] cursor-pointer bg-[#DD9F00] px-4 py-2 rounded-md ml-2 hover:bg-[#DD9F00]/80"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
