import React from "react";
import "./Homepage.css"; // Import the CSS file for styling
import Navbar from "../Navbar/Navbar";
import homeimg from "../images/home2.png";
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();

    const handleFormClick = () => {
        navigate('/form');
      };

    const handleExcelClick = () => {
        navigate('/excel');
      };
  return (
    <div>
      <div className="nav">
        <Navbar />
      </div>
      <h1>SIMPLE VISUALIZTION</h1>
      <div className="homepage-container">
        <div className="content-side">
          <p>
            We specialize in providing advanced analytics solutions to help you
            gain valuable insights from your data. Whether you have form
            submissions or Excel data, our platform is designed to handle
            various data formats and perform in-depth analysis.
          </p>
          <br />
          <p>Our user-friendly interface makes it easy for you to upload your data and customize the analysis parameters.</p>
          <div className="button-side">
          <button onClick={handleFormClick}>Form</button>
          <button onClick={handleExcelClick}>Excel</button>
          </div>
        </div>
        <div>
          <img className="home-img" src={homeimg} alt="sideimg" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
