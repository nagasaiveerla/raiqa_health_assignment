export default function CounterListApp() {
  const [counter, setCounter] = useState(4); // Starting with 4 as shown in the sample
  const [numbers, setNumbers] = useState([21, 14, 12, 6]); // Sample data
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  const addToList = () => {
    if (counter > 0) {
      // Prevent duplicates (optional requirement)
      if (!numbers.includes(counter)) {
        setNumbers(prev => [...prev, counter]);
      }
      setCounter(0); // Reset counter after adding
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