import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import "./ExcelColumnspage.css";
import Navbar from "../Navbar/Navbar";
import ExcelViewer from "../Exceldisplay/excelview";

const ExcelColumnspage = () => {
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [columnData, setColumnData] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    // Make API call to retrieve column data
    axios
      .get(`http://127.0.0.1:5000/columns/${localStorage.getItem("filename")}`)
      .then((response) => {
        const { columns, data } = response.data;
        console.log(columns); // Check the received columns data in the console
        console.log(data); // Check the received data object in the console
        setColumns(columns);
        setColumnData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleColumnClick = (columnName) => {
    setSelectedColumn(columnName);
  };

  useEffect(() => {
    if (selectedColumn && columnData[selectedColumn]) {
      console.log(columnData[selectedColumn]); // Check the data being passed to the pie chart
    }
  }, [selectedColumn, columnData]);



  const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
      colors.push(color);
    }
    return colors;
  };

  const renderPieChart = () => {
    if (selectedColumn && columnData[selectedColumn]) {
      const colors = generateColors(Object.entries(columnData[selectedColumn]).length);
      return (
        <div className="chart-container">
          <div className="pie-chart-container">
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
                  outerRadius={100}
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
        </div>
      );
    } else {
      return <p>Select a column to view its data.</p>;
    }
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
      <div className="columnexcel-page">
        <h2>Columns</h2>
        <div className="column-buttons">
          {columns && columns.length > 0 ? (
            columns.map((columnName) => (
              <button
                key={columnName}
                onClick={() => handleColumnClick(columnName)}
                className={selectedColumn === columnName ? "active" : ""}
              >
                {columnName}
              </button>
            ))
          ) : (
            <p>No columns found.</p>
          )}
        </div>
        {renderPieChart()}
      </div>
    </div>
  );
};

export default ExcelColumnspage;

// const ColumnDataPage = () => {
//   const [columns, setColumns] = useState([]);
//   const [selectedColumn, setSelectedColumn] = useState(null);
//   const [columnData, setColumnData] = useState([]);

//   useEffect(() => {
//     // Make API call to retrieve column data
//     axios
//       .get(`http://127.0.0.1:5000/columns/${localStorage.getItem('filename')}`)
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

//   return (
//     <div>
//   <h2>Columns</h2>
//   <div>
//     {columns && columns.length > 0 ? (
//       columns.map((columnName) => (
//         <button
//           key={columnName}
//           onClick={() => handleColumnClick(columnName)}
//           className={selectedColumn === columnName ? 'active' : ''}
//         >
//           {columnName}
//         </button>
//       ))
//     ) : (
//       <p>No columns found.</p>
//     )}
//   </div>
//   <div>
//     {selectedColumn && columnData[selectedColumn] ? (
//       <div className="chart-container">
//         <h3>{selectedColumn}</h3>
//         <div>
//           <h4>Pie Chart</h4>
//           <PieChart width={400} height={300}>
//             <Pie
//               data={Object.entries(columnData[selectedColumn])}
//               dataKey={(entry) => entry[0]}
//               nameKey={(entry) => entry[0]}
//               cx="50%"
//               cy="50%"
//               outerRadius={120}
//               fill="#8884d8"
//             />
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </div>
//       </div>
//     ) : (
//       <p>Select a column to view its data.</p>
//     )}
//   </div>
// </div>

//   );
// };

// export default ColumnDataPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./Columnspage.css"

// const ColumnDataPage = () => {
//   const [columns, setColumns] = useState([]);
//   const [selectedColumn, setSelectedColumn] = useState(null);
//   const [columnData, setColumnData] = useState([]);

//   useEffect(() => {
//     // Make API call to retrieve column data
//     axios.get(`http://127.0.0.1:5000/columns/${localStorage.getItem('filename')}`)
//       .then((response) => {
//         const { columns, data } = response.data;
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

//   return (
//     <div className='whole'>
//       <h2>Columns</h2>
//       <div className="column-buttons">
//         {columns && columns.length > 0 ? (
//           columns.map((columnName) => (
//             <button
//               key={columnName}
//               onClick={() => handleColumnClick(columnName)}
//               className={selectedColumn === columnName ? 'active' : ''}
//             >
//               {columnName}
//             </button>
//           ))
//         ) : (
//           <p>No columns found.</p>
//         )}
//       </div>
//       <div className="column-data">
//   {selectedColumn && columnData[selectedColumn] ? (
//     <div>
//       <h3>{selectedColumn}</h3>
//       {Array.isArray(columnData[selectedColumn]) ? (
//         <ul>
//           {columnData[selectedColumn].map((value, index) => (
//             <li key={index}>{value}</li>
//           ))}
//         </ul>
//       ) : (
//         <ul>
//           {Object.keys(columnData[selectedColumn]).map((key, index) => (
//             <li key={index}>
//               <strong>{key}: </strong>
//               {columnData[selectedColumn][key]}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   ) : (
//     <p>Select a column to view its data.</p>
//   )}
// </div>

//     </div>
//   );
// }

// export default ColumnDataPage;

// React, { useEffect, useState } from "react";
// import "./Expand.css"

// const Expand = () => {
//   const [columnNames, setColumnNames] = useState([]);

//   useEffect(() => {
//     // Make an API call to retrieve the column names from the backend
//     fetch(`http://127.0.0.1:5000/columns/${localStorage.getItem("filename")}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setColumnNames(data.columns);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Column Names</h2>
//       <div className="column-buttons">
//         {columnNames.map((columnName, index) => (
//           <button id="btn" key={index}>{columnName}</button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Expand;
