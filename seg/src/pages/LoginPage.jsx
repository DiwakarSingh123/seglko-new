import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../login.css';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '', remember: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login for now
    console.log('Login attempt with:', form);
    alert('Login feature coming soon!');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-header__title">Welcome Back</h1>
          <p className="login-header__sub">Please sign in to access your account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <input 
              type="email" 
              placeholder="Email Address" 
              value={form.email} 
              onChange={e => setForm({ ...form, email: e.target.value })} 
              required 
            />
          </div>

          <div className="login-input-group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input 
              type="password" 
              placeholder="Password" 
              value={form.password} 
              onChange={e => setForm({ ...form, password: e.target.value })} 
              required 
            />
          </div>

          <div className="login-options">
            <label className="login-checkbox">
              <input 
                type="checkbox" 
                checked={form.remember} 
                onChange={e => setForm({ ...form, remember: e.target.checked })} 
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="login-forgot">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn">
            Sign In
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>

      </div>
    </div>
  );
}
