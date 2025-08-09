import { useState, useEffect } from 'react';

// Counter Component
const Counter = ({ counter, setCounter, onAddToList }) => {
  const increment = () => setCounter(prev => prev + 1);
  const decrement = () => setCounter(prev => prev > 0 ? prev - 1 : 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Counter</h2>
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={decrement}
          className="w-10 h-10 rounded-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center text-xl font-bold"
        >
          -
        </button>
        <span className="text-3xl font-bold text-gray-800 min-w-[60px] text-center">
          {counter}
        </span>
        <button
          onClick={increment}
          className="w-10 h-10 rounded-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center text-xl font-bold"
        >
          +
        </button>
      </div>
      <button
        onClick={onAddToList}
        disabled={counter === 0}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
      >
        Add to List
      </button>
    </div>
  );
};
