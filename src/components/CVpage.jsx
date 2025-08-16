import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CVPage.css';

const CVPage = ({ formData }) => {
  const navigate = useNavigate();
  const [profilePicURL, setProfilePicURL] = useState(null);

  useEffect(() => {
    if (!formData.fullName) {
      navigate('/');
      return;
    }

    if (formData.profilePic) {
      const url = URL.createObjectURL(formData.profilePic);
      setProfilePicURL(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [formData, navigate]);

  return (
    <div className="cv-container">
      <h1>{formData.fullName}</h1>

      {profilePicURL && (
        <img
          src={profilePicURL}
          alt="Profile"
          className="cv-profile-pic"
        />
      )}

      <div className="cv-info-box">
        <strong>Email:</strong>
        <p>{formData.email}</p>
      </div>

      <div className="cv-info-box">
        <strong>GitHub:</strong>
        <p>
          <a href={formData.github} target="_blank" rel="noreferrer">
            {formData.github}
          </a>
        </p>
      </div>

      <div className="cv-info-box skills-box">
        <strong>Skills:</strong>
        <p>{formData.skills}</p>
      </div>

      <p style={{ marginTop: '30px', fontSize: '1.2rem', color: '#66ff66' }}>
        Congratulations, your CV is here!
      </p>
    </div>
  );
};

export default CVPage;
