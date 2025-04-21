// src/components/ConnectionRequests.js
import React, { useEffect, useState } from 'react';
import { auth, database } from '../firebase';
import { ref, onValue, remove, set } from 'firebase/database';

const ConnectionRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const uid = auth.currentUser.uid;
    const requestsRef = ref(database, `connectionRequests/${uid}`);

    onValue(requestsRef, (snapshot) => {
      const data = snapshot.val();
      const incoming = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      setRequests(incoming);
    });
  }, []);

  const acceptRequest = async (senderId, name) => {
    const uid = auth.currentUser.uid;

    // Save connection for both users
    await set(ref(database, `connections/${uid}/${senderId}`), { name });
    await set(ref(database, `connections/${senderId}/${uid}`), { name: auth.currentUser.displayName });

    // Remove the connection request
    await remove(ref(database, `connectionRequests/${uid}/${senderId}`));
  };

  return (
    <div>
      <h3>Incoming Connection Requests</h3>
      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req.id}>
              {req.name} <button onClick={() => acceptRequest(req.id, req.name)}>Accept</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConnectionRequests;
