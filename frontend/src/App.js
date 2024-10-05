import React, { useState } from 'react';
import StudentLogin from './StudentLogin';
import AdminView from './AdminView';
import styles from './App.module.css';

function App() {
  const [loggedInStudent, setLoggedInStudent] = useState(null);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Group Attendance App</h1>
        {!loggedInStudent ? (
          <StudentLogin onLoginSuccess={setLoggedInStudent} />
        ) : (
          <p>Welcome, {loggedInStudent.name}!</p>
        )}
        <AdminView />
      </header>
    </div>
  );
}

export default App;
