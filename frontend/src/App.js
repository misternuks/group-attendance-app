import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StudentLogin from './StudentLogin';
import AdminView from './AdminView';
import StudentView from './StudentView';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <header className={styles.header}>
          <h1>Group Attendance App</h1>
          <nav>
            <Link to="/student-login">Student Login</Link> | <Link to="/admin">Admin View</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-view" element={<StudentView />} />
          <Route path="/admin" element={<AdminView />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h2>Welcome to the Group Attendance App</h2>
    <p>Please choose either the Student Login or Admin View.</p>
  </div>
);

export default App;
