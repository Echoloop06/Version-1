import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';
import { auth } from '../firebase';

const ProfileSetup = () => {
  const [dob, setDob] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [bio, setBio] = useState('');
  const [isProfileSaved, setIsProfileSaved] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const db = getDatabase();
      const userId = auth.currentUser.uid;
      const profileRef = ref(db, 'users/' + userId);
      const snapshot = await get(profileRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        setDob(data.dob || '');
        setPreferredName(data.preferredName || '');
        setBio(data.bio || '');
        setIsProfileSaved(true);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getDatabase();
    const userId = auth.currentUser.uid;

    await set(ref(db, 'users/' + userId), {
      dob,
      preferredName,
      bio,
      email: auth.currentUser.email,
    });

    setIsProfileSaved(true);
    alert('Profile saved! 🚀');
  };

  return (
    <div style={{ padding: '20px' }}>
      {!isProfileSaved ? (
        <>
          <h2>Set Up Your Profile</h2>
          <form onSubmit={handleSubmit}>
            <label>DOB: </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
            <br /><br />
            <label>Preferred Name: </label>
            <input
              type="text"
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
              required
            />
            <br /><br />
            <label>Short Bio (What do you do?):</label>
            <br />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="E.g., Web developer, artist, gamer..."
              rows={3}
              style={{ width: '100%', maxWidth: '400px' }}
              required
            />
            <br /><br />
            <button type="submit">Save Profile</button>
          </form>
        </>
      ) : (
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2>My Profile</h2>
          <h3 style={{ color: '#333' }}>@{preferredName}</h3>
          <p style={{ color: '#666' }}>DOB: {dob}</p>
          <p style={{ fontStyle: 'italic', marginTop: '10px' }}>“{bio}”</p>
          <button onClick={() => setIsProfileSaved(false)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfileSetup;
