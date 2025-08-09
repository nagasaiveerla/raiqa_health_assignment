const ListView = ({ numbers, onSort, sortOrder, onReset }) => {
  const getHighestLowest = () => {
    if (numbers.length === 0) return { highest: null, lowest: null };
    const sorted = [...numbers].sort((a, b) => a - b);
    return { 
      highest: sorted[sorted.length - 1], 
      lowest: sorted[0] 
    };
  };

  const { highest, lowest } = getHighestLowest();

  const getItemStyle = (number) => {
    let baseStyle = "flex items-center justify-between p-2 rounded";
    
    if (number === highest && number === lowest && numbers.length === 1) {
      // Single item is both highest and lowest
      baseStyle += " bg-purple-100 border border-purple-300";
    } else if (number === highest) {
      baseStyle += " bg-green-100 border border-green-300";
    } else if (number === lowest) {
      baseStyle += " bg-red-100 border border-red-300";
    } else {
      baseStyle += " bg-gray-50";
    }
    
    return baseStyle;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Numbers List</h2>
        <div className="flex gap-2">
          <button
            onClick={onReset}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors font-medium"
          >
            Reset
          </button>
          <button
            onClick={onSort}
            disabled={numbers.length === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Sort {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {numbers.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No numbers added yet</p>
        ) : (
          numbers.map((number, index) => (
            <div key={index} className={getItemStyle(number)}>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{number}</span>
                <span className="text-sm text-gray-500">#{index + 1}</span>
              </div>
              <span className="text-gray-400">×</span>
            </div>
          ))
        )}
      </div>
      
      {numbers.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-blue-600">
            Total numbers: {numbers.length}
          </p>
          {numbers.length > 1 && (
            <div className="flex gap-4 mt-2 text-xs">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                Highest: {highest}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
                Lowest: {lowest}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};