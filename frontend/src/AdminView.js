import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminView = () => {
  const [classCode, setClassCode] = useState('');
  const [groups, setGroups] = useState([]);

  const startSession = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/start-session');
      setClassCode(response.data.classCode);
    } catch (err) {
      console.error('Error starting session:', err);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/groups');
      setGroups(response.data.groups);
    } catch (err) {
      console.error('Error fetching groups:', err);
    }
  };

  useEffect(() => {
    if (classCode) {
      fetchGroups();
    }
  }, [classCode]);

  return (
    <div>
    <h2>Admin View</h2>
    <button onClick={startSession}>Start New Session</button>
    {classCode && <p>Current Class Code: {classCode}</p>}
    <div>
      <h3>Groups</h3>
      {groups.map((group, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <h4>Group {index + 1}</h4>
          <ul>
            {group.map((student) => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
  );
};

export default AdminView;
