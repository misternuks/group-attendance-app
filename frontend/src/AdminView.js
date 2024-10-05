import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import styles from './AdminView.module.css';

const socket = io('http://localhost:5000');

const AdminView = () => {
  const [classCode, setClassCode] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    socket.on('sessionStarted', (data) => {
      setClassCode(data.classCode);
    });

    socket.on('groupsUpdated', (updatedGroups) => {
      setGroups(updatedGroups);
    });
  }, []);

  const startSession = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/start-session', {
        method: 'POST'
      });
      const data = await response.json();
      setClassCode(data.classCode);
    } catch (err) {
      console.error('Error starting session:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Admin View</h2>
      <button className={styles.button} onClick={startSession}>Start New Session</button>
      {classCode && <p>Current Class Code: {classCode}</p>}
      <div>
        <h3>Groups</h3>
        {groups.map((group, index) => (
          <div key={index} className={styles.group}>
            <h4 className={styles.groupTitle}>Group {index + 1}</h4>
            <ul className={styles.list}>
              {group.map((student) => (
                <li key={student.id} className={styles.listItem}>{student.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminView;
