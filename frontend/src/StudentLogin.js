import React, { useState } from 'react';
import axios from 'axios';
import styles from './StudentLogin.module.css';

const StudentLogin = ({ onLoginSuccess }) => {
  const [studentId, setStudentId] = useState('');
  const [classCode, setClassCode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        studentId,
        classCode,
      });
      onLoginSuccess(response.data.student);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Student Login</h2>
      <input
        type="text"
        className={styles.input}
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <input
        type="text"
        className={styles.input}
        placeholder="Class Code"
        value={classCode}
        onChange={(e) => setClassCode(e.target.value)}
      />
      <button className={styles.button} onClick={handleLogin}>Login</button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default StudentLogin;
