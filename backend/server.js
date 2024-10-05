import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5000;

// Load student data from CSV
const csvFilePath = path.resolve('./students.csv');
let students = [];
fs.readFile(csvFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading CSV file:', err);
  } else {
    students = data.split('\n').map(line => {
      const [id, name] = line.split(',');
      return { id: id.trim(), name: name.trim() };
    });
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Store session information
let currentSession = {
  classCode: '',
  students: {},
  groups: []
};

// Generate a random class code
const generateClassCode = () => Math.floor(1000 + Math.random() * 9000).toString();

// Route to start a new session
app.post('/api/start-session', (req, res) => {
  currentSession.classCode = generateClassCode();
  currentSession.students = {};
  currentSession.groups = [];
  res.json({ classCode: currentSession.classCode })
});

// Route for student login
app.post('/api/login', (req, res) => {
  const { studentId, classCode } = req.body;

  // Validate class code
  if (classCode !== currentSession.classCode) {
    return res.status(400).json({ error: 'Invalid class code '});
  }

  // Validate student ID
  const student = students.find(s => s.id === studentId);
  if (!student) {
    return res.status(400).json({ error: 'Invalid student ID' });
  }

  // Check if student is already logged in
  if (currentSession.students[studentId]) {
    return res.status(400).json({ error: 'Student already logged in' });
  }

  // Add student to the session
  currentSession.students[studenId] = student;

  // Regenerate groups
  regenerateGroups();

  res.json({ success: true, student })
});

// Route to get the current groups
app.get('/api/groups', (req, res) => {
  res.json({ groups: currentSession.groups });
});

// Function to regenerate groups
const regenerateGroups = () => {
  const studentArray = Object.values(currentSession.students);
  currentSession.groups = [];

  while (studentArray.length > 0) {
    const group = studentArray.splice(0, 4);
    currentSession.groups.push(group);
  }
};

// Basic route to ensure the server is running
app.get('/', (req, res) => {
  res.send('Backend server is running.');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});
