import React, { useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import "./Excelpage.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import sideimg from "../images/excel.png"
import xlsimg from "../images/xls.png"




const Excelpage = () => {
  const [file, setFile] = useState(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); 
  };

  const generateRandomString = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let randomString = "";
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      randomString += letters.charAt(randomIndex);
    }
    return randomString;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.reset();

    const randomString = generateRandomString();
    const newFilename = file.name.replace(/(\.[\w\d_-]+)$/i, `_${randomString}$1`);

    // Create a FormData object
    const formData = new FormData();
    formData.append("file", file, newFilename);
    const val=(e)=>{
      localStorage.setItem("filename", newFilename);
    }
    axios
      .post("http://127.0.0.1:5000/uploadexcel", formData)
      .then((response) => {
        console.log(response.data.message);
        val(e)
        navigate("/expand");
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert("No file uploaded");
      });
  };

  return (
    <div>
      <div className="nav">
        <Navbar />
      </div>
      <div className="excelcontainer">
      <div><img className='excel-img' src={sideimg} alt="sideimg" /></div>
        <div className="upload-page">
          <h1>Upload Excel Sheet</h1>
          <img className='xlsimg' src={xlsimg} alt="xlsimg" />
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="excel-file">Select Excel File:</label>
              <input
                type="file"
                id="excel-file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
              />
            </div>
            <button id="upload-button"  type="submit">Upload</button>
          </form>
          {/* <div className='all-button'><Link to="/all"><button type="view">Go to All</button></Link></div> */}
        </div>
      </div>
    </div>
  );
};

export default Excelpage;
