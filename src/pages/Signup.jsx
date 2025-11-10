import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // ✅ unwrap() throws automatically if rejected
      const userData = await dispatch(signup({ email, password, name })).unwrap();
      
      console.log('✅ Signup successful:', userData);
      alert('🎉 Signup successful! Redirecting to login...');
      navigate('/login');
    } catch (err) {
      console.error('❌ Signup error:', err);
      alert('Signup failed: ' + err);
    }
  };

  return (
    <div className="auth-page">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
