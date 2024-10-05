import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import styles from './StudentView.module.css';

const socket = io('http://localhost:5000');

const StudentView = () => {
  const [groups, setGroups] = useState([]);
  const loggedInStudent = JSON.parse(localStorage.getItem('loggedInStudent'));

  useEffect(() => {
    // Fetch initial groups on component mount
    const fetchInitialGroups = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/groups');
        const data = await response.json();
        setGroups(data.groups);
      } catch (err) {
        console.error('Error fetching initial groups:', err);
      }
    };
    fetchInitialGroups();

    // Listen for real-time updates to groups
    socket.on('groupsUpdated', (updatedGroups) => {
      setGroups(updatedGroups);
    });

    // Cleanup listener on component unmount
    return () => {
      socket.off('groupsUpdated');
    };
  }, []);

  const studentGroup = groups.find(group => group.some(student => student.id === loggedInStudent.id));

  return (
    <div className={styles.container}>
      <h2>Welcome, {loggedInStudent.name}!</h2>
      {studentGroup ? (
        <div>
          <h3>Your Group</h3>
          <ul className={styles.list}>
            {studentGroup.map(student => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>You are not currently assigned to a group.</p>
      )}
    </div>
  );
};

export default StudentView;
