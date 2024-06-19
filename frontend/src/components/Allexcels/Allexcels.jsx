import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllExcels = () => {
  const [excels, setExcels] = useState([]);

  useEffect(() => {
    fetchExcels();
  }, []);

  const fetchExcels = () => {
    axios.get('/excels')
      .then(response => {
        setExcels(response.data.excels);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Excel Files</h1>
      <ul>
        {excels.map(excel => (
          <li key={excel}>
            <a href={`/excels/${excel}`}>{excel}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllExcels;
