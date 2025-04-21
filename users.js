import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const loadedUsers = [];
      for (let id in data) {
        loadedUsers.push({ uid: id, ...data[id] });
      }
      setAllUsers(loadedUsers);
    });
  }, []);

  const filteredUsers = allUsers.filter((user) =>
    user.preferredName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleConnect = (user) => {
    alert(`Connection request sent to ${user.preferredName}`);
    // Later: Store connections in Firebase
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Find & Connect with People</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      {filteredUsers.map((user) => (
        <div key={user.uid} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc' }}>
          <p><strong>{user.preferredName}</strong> ({user.email})</p>
          <button onClick={() => handleConnect(user)}>Connect</button>
        </div>
      ))}
    </div>
  );
};

export default Users;
