import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [activeStudentForm, setActiveStudentForm] = useState('signin');
  const [activeLecturerForm, setActiveLecturerForm] = useState('signin');

  const toggleStudentForm = () => {
    setActiveStudentForm(activeStudentForm === 'signin' ? 'create' : 'signin');
  };

  const toggleLecturerForm = () => {
    setActiveLecturerForm(activeLecturerForm === 'signin' ? 'create' : 'signin');
  };

  const handleSignIn = (userType) => {
    // For now, just redirect to dashboard
    // In a real app, you would validate credentials with your backend
    navigate('/dashboard');
  };

  const handleCreateAccount = (userType) => {
    // For now, just redirect to dashboard
    // In a real app, you would send data to your backend
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      {/* Header */}
      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo-container">
              <div className="logo-placeholder">KU Logo</div>
              <div>
                <div className="university-name">KENYATTA UNIVERSITY</div>
                <div className="department-name">Department of Plant Pathology</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to the Department of Plant Pathology</h1>
          <p>Advancing knowledge in plant health, disease management, and sustainable agriculture through cutting-edge research and education.</p>
        </div>
      </section>

      {/* Login Section */}
      <section className="login-section">
        <div className="container">
          <h2 className="section-title">Access Your Account</h2>
          <div className="login-container">
            {/* Student Login Card */}
            <div className="login-card">
              <h3 className="card-title">Student Portal</h3>
              
              {/* Student Sign In Form */}
              <div className={activeStudentForm === 'signin' ? '' : 'hidden'}>
                <div className="form-group">
                  <label htmlFor="student-email">Email Address</label>
                  <input type="email" id="student-email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <label htmlFor="student-password">Password</label>
                  <input type="password" id="student-password" placeholder="Enter your password" />
                </div>
                <button className="btn" onClick={() => handleSignIn('student')}>Sign In</button>
                <div className="toggle-form">
                  <a href="#" onClick={(e) => { e.preventDefault(); toggleStudentForm(); }}>
                    Don't have an account? Create one
                  </a>
                </div>
              </div>
              
              {/* Student Create Account Form */}
              <div className={activeStudentForm === 'create' ? '' : 'hidden'}>
                <div className="form-group">
                  <label htmlFor="student-fullname">Full Name</label>
                  <input type="text" id="student-fullname" placeholder="Enter your full name" />
                </div>
                <div className="form-group">
                  <label htmlFor="student-id">Student ID</label>
                  <input type="text" id="student-id" placeholder="Enter your student ID" />
                </div>
                <div className="form-group">
                  <label htmlFor="student-new-email">Email Address</label>
                  <input type="email" id="student-new-email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <label htmlFor="student-new-password">Password</label>
                  <input type="password" id="student-new-password" placeholder="Create a password" />
                </div>
                <div className="form-group">
                  <label htmlFor="student-confirm-password">Confirm Password</label>
                  <input type="password" id="student-confirm-password" placeholder="Confirm your password" />
                </div>
                <button className="btn" onClick={() => handleCreateAccount('student')}>Create Account</button>
                <div className="toggle-form">
                  <a href="#" onClick={(e) => { e.preventDefault(); toggleStudentForm(); }}>
                    Already have an account? Sign in
                  </a>
                </div>
              </div>
            </div>
            
            {/* Lecturer Login Card */}
            <div className="login-card">
              <h3 className="card-title">Lecturer Portal</h3>
              
              {/* Lecturer Sign In Form */}
              <div className={activeLecturerForm === 'signin' ? '' : 'hidden'}>
                <div className="form-group">
                  <label htmlFor="lecturer-email">Email Address</label>
                  <input type="email" id="lecturer-email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <label htmlFor="lecturer-password">Password</label>
                  <input type="password" id="lecturer-password" placeholder="Enter your password" />
                </div>
                <button className="btn" onClick={() => handleSignIn('lecturer')}>Sign In</button>
                <div className="toggle-form">
                  <a href="#" onClick={(e) => { e.preventDefault(); toggleLecturerForm(); }}>
                    Don't have an account? Create one
                  </a>
                </div>
              </div>
              
              {/* Lecturer Create Account Form */}
              <div className={activeLecturerForm === 'create' ? '' : 'hidden'}>
                <div className="form-group">
                  <label htmlFor="lecturer-fullname">Full Name</label>
                  <input type="text" id="lecturer-fullname" placeholder="Enter your full name" />
                </div>
                <div className="form-group">
                  <label htmlFor="lecturer-id">Staff ID</label>
                  <input type="text" id="lecturer-id" placeholder="Enter your staff ID" />
                </div>
                <div className="form-group">
                  <label htmlFor="lecturer-new-email">Email Address</label>
                  <input type="email" id="lecturer-new-email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <label htmlFor="lecturer-new-password">Password</label>
                  <input type="password" id="lecturer-new-password" placeholder="Create a password" />
                </div>
                <div className="form-group">
                  <label htmlFor="lecturer-confirm-password">Confirm Password</label>
                  <input type="password" id="lecturer-confirm-password" placeholder="Confirm your password" />
                </div>
                <button className="btn" onClick={() => handleCreateAccount('lecturer')}>Create Account</button>
                <div className="toggle-form">
                  <a href="#" onClick={(e) => { e.preventDefault(); toggleLecturerForm(); }}>
                    Already have an account? Sign in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Our Department Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Academic Programs</h3>
              <p>Comprehensive undergraduate and graduate programs in plant pathology and related fields.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔬</div>
              <h3>Research Facilities</h3>
              <p>State-of-the-art laboratories and field stations for cutting-edge plant disease research.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Field Work</h3>
              <p>Hands-on experience in disease diagnosis, management, and sustainable agriculture practices.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Expert Faculty</h3>
              <p>Learn from renowned researchers and educators in the field of plant pathology.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">KU Logo</div>
            <p>Department of Plant Pathology</p>
            <p>Kenyatta University</p>
            <div className="footer-links">
              <a href="#">About Us</a>
              <a href="#">Contact</a>
              <a href="#">Privacy Policy</a>
            </div>
            <div className="copyright">
              &copy; 2025 Kenyatta University. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
