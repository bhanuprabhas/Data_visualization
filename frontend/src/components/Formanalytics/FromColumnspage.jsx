import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./FormColumnspage.css";
import Navbar from "../Navbar/Navbar";
import ExcelViewer from "../Exceldisplay/excelview";
// import Heatmap from 'react-heatmap-grid';

const FormColumnspage = () => {
  const [columns, setColumns] = useState([]);
  const [columnData, setColumnData] = useState({});
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [display, setDisplay] = useState(false);

  // const labels = Object.keys(columnData);
  // const values = Object.values(columnData).map((obj) => Object.values(obj));


  const handleColumnClick = (columnName) => {
    setSelectedColumn(columnName);
  };

  const fetchData = () => {
    axios
      .get("http://127.0.0.1:5000/columns/Data")
      .then((response) => {
        const { columns, data } = response.data;
        setColumns(columns);
        setColumnData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("columns:", columns);
  console.log("columnData:", columnData);
  console.log("selectedColumn:", selectedColumn);

  const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
      colors.push(color);
    }
    return colors;
  };


  return (
    <div>
      <div className="nav">
        <Navbar />
      </div>
      <br />
      <br />
      <br />
      <button
        className={display === false ? "excelbutton" : "excelbutton active"}
        onClick={() => {
          display === false ? setDisplay(true) : setDisplay(false);
        }}
      >
        {display === false ? "View Excel" : "Close Excel"}
      </button>
      {display === false ? (
        ""
      ) : (
        <div className="excelview">
          <ExcelViewer />
        </div>
      )}
      <div className="columnform-page">
        <h2>Columns</h2>
        <div className="columns-container">
          {columns.length > 0 ? (
            columns.map((columnName) => (
              <button
                key={columnName}
                onClick={() => handleColumnClick(columnName)}
                className={`column-button ${
                  selectedColumn === columnName ? "active" : ""
                }`}
              >
                {columnName}
              </button>
            ))
          ) : (
            <p>No columns found.</p>
          )}
        </div>
        <div>
          {selectedColumn && columnData[selectedColumn] ? (
            <div className="chart-container">
              {/* <h3>{selectedColumn}</h3> */}
              <div className="pie-chart">
                <h4>Pie Chart</h4>
                <PieChart width={400} height={300}>
                  <Pie
                    data={Object.entries(columnData[selectedColumn]).map(
                      ([name, value]) => ({ name, value })
                    )}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                  >
                    {Object.entries(columnData[selectedColumn]).map(
                      ([name], index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            generateColors(
                              Object.entries(columnData[selectedColumn]).length
                            )[index]
                          }
                        />
                      )
                    )}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{ overflow: "auto", maxHeight: 300 }}
                  />
                </PieChart>
              </div>
            </div>
          ) : (
            <p>Select a column to view its data.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormColumnspage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { PieChart, Pie, Legend, Tooltip } from 'recharts';
// import "./Columnsform.css";

// const Columnsform = () => {
//   const [columns, setColumns] = useState([]);
//   const [selectedColumn, setSelectedColumn] = useState(null);
//   const [columnData, setColumnData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Make API call to retrieve column data
//     axios
//       .get('http://127.0.0.1:5000/columns/Data')
//       .then((response) => {
//         const { columns, data } = response.data;
//         console.log(columns); // Check the received columns data in the console
//         console.log(data); // Check the received data object in the console
//         setColumns(columns);
//         setColumnData(data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }, []);

//   const handleColumnClick = (columnName) => {
//     setSelectedColumn(columnName);
//   };

//   const handleGoBack = () => {
//     navigate(-1); // Go back to the previous page
//   };

//   return (
//     <div>
//       <h2>Column Data</h2>
//       {/* <div>
//         <button onClick={handleGoBack}>Go Back</button>
//       </div> */}
//       <div className="column-data-container">
//         <div className="column-list">
//           {columns && columns.length > 0 ? (
//             <ul>
//               {columns.map((columnName) => (
//                 <li
//                   key={columnName}
//                   onClick={() => handleColumnClick(columnName)}
//                   className={selectedColumn === columnName ? 'active' : ''}
//                 >
//                   {columnName}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No columns found.</p>
//           )}
//         </div>
//         <div className="form-chart-container">
//           {selectedColumn && columnData[selectedColumn] ? (
//             <div className="chart">
//               <h3>{selectedColumn}</h3>
//               <div className="form-pie-chart">
//                 <PieChart width={400} height={300}>
//                   <Pie
//                     data={Object.entries(columnData[selectedColumn]).map(([name, value]) => ({
//                       name,
//                       value,
//                     }))}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={100}
//                     fill="#8884d8"
//                   />
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </div>
//             </div>
//           ) : (
//             <p>Select a column to view its data.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Columnsform;
