import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
  const [mode, setMode] = useState('signup'); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const navigate = useNavigate();

  function Modal({ show, onClose, title, children }) {
    if (!show) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>{title}</h2>
          <div>{children}</div>
          <button className="modal-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload =
      mode === 'signup' ? { name, email, password } : { email, password };

    const url = mode === 'signup' ? 'http://localhost:8080/signup' : 'http://localhost:8080/login';

    try {
      const res = await axios.post(url, payload);

      if (mode === 'signup') {
        setModalMessage(`Signup Successful! Welcome, ${name}!`);
        setName('');
        setEmail('');
        setPassword('');
      } else {
        const userNameFromResponse = res.data.name || email;
        setModalMessage(`Login Successful! Welcome back, ${userNameFromResponse}!`);
        navigate('/dashboard');
      }

      setShowModal(true);
      setMessage('');
    } catch (err) {
      setModalMessage('Something went wrong!');
      setShowModal(true);
    }
  };

  return (
    <div className="auth-form">
      <h2>{mode === 'signup' ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {/* Removed role select dropdown */}
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{mode === 'signup' ? 'Sign Up' : 'Login'}</button>
      </form>

      <p className="toggle-link">
        {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
        <button onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>
          {mode === 'signup' ? 'Login' : 'Sign Up'}
        </button>
      </p>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={mode === 'signup' ? 'Signup Success' : 'Login Success'}
      >
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
}

export default AuthForm;
