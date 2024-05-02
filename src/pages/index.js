import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react';
import ForceGraph from './force-graph';

const Home = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    // Fetch the CSV data from the server
    fetch('/conference-dashboard/src/pages/api/data.js')
      .then((response) => response.text())
      .then((csvData) => setData(csvData));
  }, []);

  return (
    <div style={{ backgroundColor: '#F0F8FF' }}> {/* Changed background color to light gray */}
      <Sidebar />
      <main className="flex-grow ml-64 relative">
        <Navbar />
        {data && <ForceGraph data={data} src="/conference-dashboard"/>}
      </main>
    </div>
  );
};

export default Home;