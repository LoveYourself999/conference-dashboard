// app/dashboard.js
import * as d3 from 'd3';
// Dummy function to extract keywords from a summary
// const extractKeywords = (summary) => {
//   const stopwords = ['and', 'or', 'but', 'because', 'on', 'the', 'is'];
//   return summary.toLowerCase().split(/\W+/)
//     .filter(word => word.length > 3 && !stopwords.includes(word));
// };

// Function to process CSV data and return a Promise
export function processData() {
  return new Promise((resolve, reject) => {
    fetch('/conference_data.csv')
      .then(response => response.text())
      .then(data => {
        const parsedData = d3.csvParse(data);
        let keywordOccurrences = {};
        let links = [];

        parsedData.forEach(row => {
          const keywords = row.keywords.split(',').map(keyword => keyword.trim());
          keywords.forEach((key) => {
            if (!keywordOccurrences[key]) {
              keywordOccurrences[key] = {
                id: key,
                count: 0,
                connections: {}
              };
            }
            keywordOccurrences[key].count += 1;

            keywords.forEach((innerKey) => {
              if (key !== innerKey) {
                if (!keywordOccurrences[key].connections[innerKey]) {
                  keywordOccurrences[key].connections[innerKey] = 0;
                }
                keywordOccurrences[key].connections[innerKey] += 1;
              }
            });
          });
        });

        let nodes = Object.values(keywordOccurrences).map(keyword => ({
          id: keyword.id,
          size: Math.sqrt(keyword.count) * 5 // Example size scaling
        }));

        Object.values(keywordOccurrences).forEach(keyword => {
          Object.keys(keyword.connections).forEach(connectionKey => {
            if (keyword.connections[connectionKey] > 1) { // Filter to stronger connections
              links.push({
                source: keyword.id,
                target: connectionKey,
                value: keyword.connections[connectionKey]
              });
            }
          });
        });

        // Resolve the Promise with the processed data
        resolve({ nodes, links });
      })
      .catch(error => {
        // Reject the Promise if there's an error
        reject(error);
      });
  });
}
