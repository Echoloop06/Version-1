import React, { useState } from 'react';
import ProfileSetup from './profilesetup';
import ConnectionList from './connectionlist';
import AllUsers from './allusers';
import { auth } from '../firebase';
// import PublicChat from './publicchat'; // Uncomment if using Public Chat

const MainTabs = () => {
  const [activeTab, setActiveTab] = useState('connections');

  return (
    <div className="container">
      <div className="tab-buttons">
        {/* Uncomment if Public Chat is added */}
        {/* <button onClick={() => setActiveTab('chat')}>Public Chat</button> */}
        <button onClick={() => setActiveTab('connections')}>My Connections</button>
        <button onClick={() => setActiveTab('profile')}>Profile</button>
        <button onClick={() => setActiveTab('all')}>Find Users</button>
        <button onClick={() => auth.signOut()}>Logout</button>
      </div>

      {activeTab === 'connections' && <ConnectionList />}
      {activeTab === 'profile' && <ProfileSetup />}
      {activeTab === 'all' && <AllUsers />}
      {/* {activeTab === 'chat' && <PublicChat />} */}
    </div>
  );
};

export default MainTabs;
