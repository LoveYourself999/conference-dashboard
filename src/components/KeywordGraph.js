import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const KeywordGraph = ({ nodes, links }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = +svg.attr('width');
        const height = +svg.attr('height');

        // Clear previous
        svg.selectAll('*').remove();

        // Setup the force simulation
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(100))
            .force('charge', d3.forceManyBody().strength(-50))
            .force('center', d3.forceCenter(width / 2, height / 2));

        // Define the links (lines)
        const link = svg.append('g')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .selectAll('line')
            .data(links)
            .join('line');

        // Define the nodes (circles)
        const node = svg.append('g')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.5)
            .selectAll('circle')
            .data(nodes)
            .join('circle')
            .attr('r', d => d.size) // Size based on frequency
            .attr('fill', colorNode)
            .call(drag(simulation));

        node.append('title')
            .text(d => d.id);

        // Handle the simulation "ticking"
        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
        });

        // Drag functionality
        function drag(simulation) {
            function dragstarted(event) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }

            function dragged(event) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }

            function dragended(event) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }

            return d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended);
        }

        function colorNode(d) {
            return d.size > 10 ? '#ff7f0e' : '#1f77b4';  // Color based on size (frequency)
        }

    }, [nodes, links]); // Re-run when nodes or links change

    return (
        <svg ref={svgRef} width={800} height={600} style={{ border: '1px solid black' }}></svg>
    );
};

export default KeywordGraph;
