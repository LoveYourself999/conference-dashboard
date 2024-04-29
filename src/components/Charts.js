"use client";
import React, { useEffect, useState } from 'react';
import KeywordGraph from '../components/KeywordGraph';
import { processData } from '../app/dashboard'; // Assuming processData is exported from a utility file
const Charts = () => {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });

    useEffect(() => {
        processData().then(data => {
            setGraphData(data);
        });
    }, []);

    return (
        <div>
            <h1>Keyword Co-occurrence Graph</h1>
            <KeywordGraph nodes={graphData.nodes} links={graphData.links} />
        </div>
    );
};

export default Charts;