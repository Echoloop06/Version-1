import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { auth } from '../firebase';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const loadedUsers = [];

      for (let uid in data) {
        if (uid !== auth.currentUser.uid) {
          loadedUsers.push({ uid, ...data[uid] });
        }
      }

      setUsers(loadedUsers);
    });
  }, []);

  const handleConnect = async (user) => {
    const db = getDatabase();
    const currentUserId = auth.currentUser.uid;

    await set(ref(db, `connections/${currentUserId}/${user.uid}`), {
      name: user.preferredName || user.email,
      email: user.email,
    });

    await set(ref(db, `connections/${user.uid}/${currentUserId}`), {
      name: auth.currentUser.email,
      email: auth.currentUser.email,
    });

    alert(`Connection request sent to ${user.preferredName || user.email}`);
  };

  const filteredUsers = users.filter((user) =>
    (user.preferredName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Find Users</h2>
      <input
        type="text"
        placeholder="Search users by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '15px', padding: '8px', width: '100%', maxWidth: '400px' }}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.uid} style={{ marginBottom: '10px' }}>
            <strong>{user.preferredName || user.email}</strong> <br />
            <small>{user.email}</small> <br />
            <button onClick={() => handleConnect(user)}>Connect</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;
