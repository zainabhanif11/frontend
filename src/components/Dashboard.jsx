import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ formData, setFormData }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      profilePic: file || null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.github || !formData.skills) {
      alert("Please fill all fields");
      return;
    }
    navigate('/cv');
  };

  return (
    <div className="form-container">
      <h2>CV Generator</h2>
      <form onSubmit={handleSubmit}>
        <div className="profile-name-group">
          <label className="profile-pic-label">
            Profile Picture:
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
            {formData.profilePic && <small>Selected: {formData.profilePic.name}</small>}
          </label>
          <label>
            Full Name:
            <input 
              name="fullName" 
              value={formData.fullName || ''} 
              onChange={handleChange} 
              required 
              className='text-white'
            />
          </label>
        </div>

        <label>
          GitHub Link:
          <input 
            name="github" 
            value={formData.github || ''} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>
          Skills:
          <textarea 
            name="skills" 
            value={formData.skills || ''} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>
          Email:
          <input 
            type="email" 
            name="email" 
            value={formData.email || ''} 
            onChange={handleChange} 
            required 
          />
        </label>

        <button type="submit">Generate CV</button>
      </form>
    </div>
  );
};

export default Dashboard;
