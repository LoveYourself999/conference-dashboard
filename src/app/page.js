import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Dashboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/data/conference_talks.csv');
            const reader = response.body.getReader();
            const result = await reader.read(); // read all content as one chunk
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value);
            const results = Papa.parse(csv, { header: true });
            setData(results.data);
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Conference Talk Dashboard</h1>
            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="someMetric" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    );
}
