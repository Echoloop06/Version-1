import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { auth } from '../firebase';
import PrivateChat from './privatechat';

const ConnectionList = () => {
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const user = auth.currentUser;
    if (!user) return;

    const userConnectionsRef = ref(db, `connections/${user.uid}`);

    onValue(userConnectionsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedConnections = [];

      if (data) {
        Object.keys(data).forEach((uid) => {
          loadedConnections.push({ uid, ...data[uid] });
        });
      }

      setConnections(loadedConnections);
    });
  }, []);

  const handleBack = () => {
    setSelectedConnection(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Connections</h2>
      {selectedConnection ? (
        <>
          <button onClick={handleBack} style={{ marginBottom: '10px' }}>← Back to Connections</button>
          <PrivateChat recipient={selectedConnection} />
        </>
      ) : (
        <>
          {connections.length === 0 ? (
            <p>You don't have any connections yet.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {connections.map((conn) => (
                <li key={conn.uid} style={{ marginBottom: '10px' }}>
                  <strong>{conn.name || conn.email}</strong>{' '}
                  <button onClick={() => setSelectedConnection(conn)}>Chat</button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ConnectionList;
