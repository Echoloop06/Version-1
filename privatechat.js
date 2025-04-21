import React, { useEffect, useState, useCallback } from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { auth } from '../firebase';

const PrivateChat = ({ recipient }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  const getChatId = useCallback(() => {
    const currentUid = auth.currentUser?.uid;
    const recipientUid = recipient.uid;
    return [currentUid, recipientUid].sort().join('_'); // consistent chat ID
  }, [recipient]);

  useEffect(() => {
    const db = getDatabase();
    const chatId = getChatId();
    const messagesRef = ref(db, `privatemessages/${chatId}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];
      for (let id in data) {
        loadedMessages.push({ id, ...data[id] });
      }
      setMessages(loadedMessages);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [getChatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    const db = getDatabase();
    const chatId = getChatId();
    const messagesRef = ref(db, `privatemessages/${chatId}/messages`);

    push(messagesRef, {
      text: newMsg,
      senderUid: auth.currentUser.uid,
      senderName: auth.currentUser.displayName || auth.currentUser.email,
      timestamp: new Date().toISOString(),
    });

    setNewMsg('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Chat with {recipient.name || recipient.email}</h3>
      <div style={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((msg) => (
          <p key={msg.id}><strong>{msg.senderName}:</strong> {msg.text}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default PrivateChat;
