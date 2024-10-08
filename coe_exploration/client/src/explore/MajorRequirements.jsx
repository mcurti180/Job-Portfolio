import React, { useState, useEffect } from 'react';

const MajorRequirements = ({ major }) => {
    const [data, setData] = useState({ classes: {}, other_requirements: {} });
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Dynamically import the JSON file based on the major
          const data = await import(
            `./classes/${major.replace(/ /g, '')}Classes.json`
          );
          setData(data);
        } catch (error) {
          console.error('Error fetching JSON:', error);
          setError(error.message);
        }
      };
  
      fetchData();
    }, [major]);
  
    if (error) {
      return <div>Unable to find classes for {major}</div>; // Display a more user-friendly error message instead of the raw error
    }
  
    return (
        <div className="major-requirements">
          <h1>{major} - Class Lists</h1>
          <table className="requirements-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Title</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.classes).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value.title}</td>
                  <td>{value.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
    
          <h1>{major} - Other Requirements</h1>
          <table className="requirements-table">
            <thead>
              <tr>
                <th>Requirement</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.other_requirements).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    
    export default MajorRequirements;
    
  