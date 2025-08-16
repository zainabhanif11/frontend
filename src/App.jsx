import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import Dashboard from './components/Dashboard';
import CVPage from './components/CVpage';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    github: '',
    skills: '',
    email: '',
    profilePic: null,
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<UserForm formData={formData} setFormData={setFormData} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard formData={formData} setFormData={setFormData} />}
        />
        <Route
          path="/cv"
          element={<CVPage formData={formData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
