import React, { useEffect, useState } from 'react';
import axios from 'axios';
import XLSX from 'xlsx';
import "./excelview.css"


const ExcelViewer = () => {
  const [excelData, setExcelData] = useState(null);

  useEffect(() => {
    // Fetch the Excel file from the backend
    axios.get(`http://127.0.0.1:5000/excel/${localStorage.getItem("filename")}`, { responseType: 'arraybuffer' })
      .then(response => {
        const data = new Uint8Array(response.data);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setExcelData(jsonData);
      })
      .catch(error => {
        console.error('Error fetching Excel file:', error);
      });
  }, []);

  return (
    <div className='excel-container'>
    <div className="excel-viewer">
      {excelData ? (
        <table className="excel-table">
          <thead>
            <tr>
              {excelData[0].map((cell, cellIndex) => (
                <th key={cellIndex}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading Excel file...</p>
      )}
    </div>
    </div>
  );
};

export default ExcelViewer;
