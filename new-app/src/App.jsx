import React, { useState } from 'react';
import './App.css';
import Main from './main'; // Import the Main component
import LogReg from './components/LogReg'; // Import LogReg once

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        <LogReg onLogin={handleLogin} />
      ) : (
        <Main />
      )}
    </div>
  );
}

export default App;
