import React, { useState, useEffect } from 'react';
import './LogReg.css'; // Ensure this path is correct

const LogReg = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRegister = () => {
    if (password === confirmPassword && email && password) {
      localStorage.setItem('user', JSON.stringify({ email, password }));
      setIsRegistering(false);
    } else {
      alert('Passwords do not match or fields are empty.');
    }
  };

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email === email && user.password === password) {
      onLogin();
    } else {
      alert('Invalid login credentials.');
    }
  };

  return (
    <main className="container">
      <div className="datetime">
        {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
      </div>
      <header>
        <h1>Welcome to My App</h1>
      </header>
      {isRegistering ? (
        <div>
          <h2>Register</h2>
          <form>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="button" onClick={handleRegister}>
              Register
            </button>
            <p>Already have an account? <button type="button" onClick={() => setIsRegistering(false)}>Login</button></p>
          </form>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>
              Login
            </button>
            <p>Don't have an account? <button type="button" onClick={() => setIsRegistering(true)}>Register</button></p>
          </form>
        </div>
      )}
    </main>
  );
};

export default LogReg;
