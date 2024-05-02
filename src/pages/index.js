import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react';
import ForceGraph from './force-graph';
import ErrorBoundary from './ErrorBoundary';
const Home = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    // Fetch the CSV data from the server
    fetch('/api/data')
      .then((response) => response.text())
      .then((csvData) => setData(csvData));
  }, []);

  return (
    <div style={{ backgroundColor: '#F0F8FF' }}> {/* Changed background color to light gray */}
    <ErrorBoundary>
      <Sidebar />
      <main className="flex-grow ml-64 relative">
        <Navbar />
        {data && <ForceGraph data={data} />}
      </main>
    </ErrorBoundary>
    </div>
  );
};

export default Home;