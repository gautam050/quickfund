import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handle(e){
    e.preventDefault();
    try{
      await dispatch(login({ email, password })).unwrap();
      navigate('/dashboard');
    }catch(err){
      alert('Login failed: ' + err);
    }
  }

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handle}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <p>Don't have account? <Link to="/signup">Signup</Link></p>
    </div>
  );
}
