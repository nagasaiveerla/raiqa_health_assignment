// Derived bundle for running locally without changing original files
// React hooks available as globals for this bundle
const { useState, useEffect } = React;

// ==== Counter.js (import removed) ====
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

// ==== ListView.js ====
const ListView = ({ numbers, onSort, sortOrder, onReset, onRemove }) => {
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
              <button
                aria-label={`remove ${number}`}
                onClick={() => onRemove(index)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
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

// ==== Main.js (export removed) ====
function CounterListApp() {
  const STORAGE_KEY = 'raiqa_numbers_list';
  const [counter, setCounter] = useState(4);
  const [numbers, setNumbers] = useState([21, 14, 12, 6]);
  const [sortOrder, setSortOrder] = useState('desc');

  // Load saved list from localStorage once on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(saved)) {
        setNumbers(saved);
      }
    } catch (err) {
      // ignore malformed storage
    }
  }, []);

  // Persist list whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(numbers));
    } catch (err) {
      // storage may be unavailable; fail silently
    }
  }, [numbers]);

  const addToList = () => {
    if (counter > 0) {
      if (!numbers.includes(counter)) {
        setNumbers(prev => [...prev, counter]);
      }
      setCounter(0);
    }
  };

  const sortNumbers = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    
    setNumbers(prev => {
      const sorted = [...prev].sort((a, b) => {
        return newOrder === 'asc' ? a - b : b - a;
      });
      return sorted;
    });
  };

  const resetList = () => {
    setNumbers([]);
    setCounter(0);
    try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
  };

  const removeAtIndex = (indexToRemove) => {
    setNumbers(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Counter & List App</h1>
          <p className="text-gray-600">Add numbers to your list and sort them!</p>
        </div>
        
        <Counter 
          counter={counter}
          setCounter={setCounter}
          onAddToList={addToList}
        />
        
        <ListView 
          numbers={numbers}
          onSort={sortNumbers}
          sortOrder={sortOrder}
          onReset={resetList}
          onRemove={removeAtIndex}
        />
        
        <div className="mt-6 text-center">
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Add numbers using the counter above</p>
            <p>• Sort in ascending/descending order</p>
            <p>• Highest and lowest numbers are highlighted</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mount the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CounterListApp />);
