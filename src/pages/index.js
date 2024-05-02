import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react';
import ForceGraph from './force-graph';
import path from 'path';
const Home = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    // Fetch the CSV data from the server
    const csvFilePath = path.join(process.cwd(), 'data', 'conference_data.csv');
    fetch('.../data/conference_data.csv')
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