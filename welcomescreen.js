import React from 'react';
import Login from './login';

const WelcomeScreen = () => {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: 'sans-serif'
    }}>
      {/* Left side */}
      <div style={{
        flex: 1,
        backgroundColor: '#4A90E2',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>👋 Welcome to <br /> <span style={{ fontWeight: 'bold' }}>Echoloop</span></h1>
        <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>Your space to connect privately and effortlessly.</p>
      </div>

      {/* Right side */}
      <div style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Login />
      </div>
    </div>
  );
};

export default WelcomeScreen;
