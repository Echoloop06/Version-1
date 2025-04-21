import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { motion } from 'framer-motion';

const Login = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Logged in as:', user.displayName);
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl bg-white overflow-hidden w-full max-w-4xl"
      >
        {/* Left side */}
        <div className="bg-blue-600 text-white flex items-center justify-center flex-col p-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to Echoloop</h1>
          <p className="text-lg text-center max-w-sm">
            Connect. Chat. Loop into the conversation.
          </p>
        </div>

        {/* Right side (Login) */}
        <div className="flex items-center justify-center p-10">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Login to Continue</h2>
            <button
              onClick={handleLogin}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-full shadow hover:shadow-lg transition flex items-center gap-3"
            >
              
              Sign in with Google
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
