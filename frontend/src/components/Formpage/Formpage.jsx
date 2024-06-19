  import React, { useState } from 'react';
  import axios from 'axios';
  import "./Formpage.css"
  import sideimg from "../images/b.png"
  import Navbar from "../Navbar/Navbar";
  import { useNavigate } from 'react-router-dom';

  const Formpage = () => {
    const navigate=useNavigate()

    const initialFormData = {
      Name: '',
      Gender: '',
      Graduation: '',
      State: '',
      Current_Employment_Sector: '',
      Salary: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleClick = () => {
      navigate('/expandform');
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      const updatedValue = name === "Salary" ? parseInt(value) : value;
      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue,
      }));
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://127.0.0.1:5000/submit', formData)
        .then((response) => {
          console.log(response.data);
          setFormData(initialFormData);
          // navigate('/expandform')
        })
        .catch((error) => {
          console.error(error)
        });
    };

    return (
      <div className='whole'>
        <div className="nav">
          <Navbar />
        </div>
      <div className='formcontainer'>
        <div><img className='form-img' src={sideimg} alt="sideimg" /></div>
        <div className='form'>
      <form onSubmit={handleSubmit}>
      <h2>Employe Form</h2>
      <label for="Name">Name:</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            placeholder='Name'
          />
        <br />
        <label for="Gender">Gender:</label>
          <select name="Gender" value={formData.Gender} onChange={handleChange}>
          <option value="">Select your Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        <br />
        <label for="graduation">Graduation:</label>
          <select
            type="text" name="Graduation" value={formData.Graduation} onChange={handleChange} placeholder='Graduation'>
            <option value="">Select your Graduation</option>
            <option value="B.Tech">B.Tech</option>
            <option value="Degree">Degree</option>
            </select>
        <br />
        <label for="state">State:</label>
          <select
            type="text" name="State" value={formData.State} onChange={handleChange} placeholder='State'
          >
            <option value="">Select your State</option>
            <option value="Andhra pradesh">Andhra pradesh</option>
            <option value="Telangana">Telangana</option>
            
          </select>
        <br />
        <label for="currentemploymentsector">Current Employement Sector:</label>
          <select type="text" name="Current_Employment_Sector" value={formData.Current_Employment_Sector} onChange={handleChange}>
          <option value="">Select your Employment</option>
            <option value="Software Job">Software Job</option>
            <option value="Government Job">Government Job</option>
            <option value="Business">Business</option>
            <option value="Other Sector">Other Sector</option>

            </select>
        <br />
        <label htmlFor="salary">Salary:</label>
        <input
            type="number"
            name="Salary"
            value={formData.Salary}
            onChange={handleChange}
            placeholder='Salary'
          />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br/>
      <button onClick={handleClick}>Go to visualization</button>
      </div>
      
      </div>
      </div>
    );
  };

  export default Formpage;
