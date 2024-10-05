import React, { useState } from 'react';
import StudentLogin from './StudentLogin';
import AdminView from './AdminView';

function App() {
  const [loggedInStudent, setLoggedInStudent] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
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
