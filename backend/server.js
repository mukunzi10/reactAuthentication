const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Database Connection Pool
const db = mysql.createPool(dbConfig);

// Test Database Connection
db.getConnection((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  } else {
    console.log('Connected to the database');
  }
});

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification error:', err); // Debugging log
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = user;
    next();
  });
};


// Routes

// Test Endpoint
app.get('/add', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Register User
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Login User
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? LIMIT 1';

  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  });
});

// Get Logged-in User
app.get('/user', authenticateToken, (req, res) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [req.user.id], (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result[0]);
  });
});

// Get All Users
app.get('/users',authenticateToken, (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(result);
  });
});


// Get User by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result[0]);
  });
});

app.post('/api/students', (req, res) => {
  const { name, email, age, grade } = req.body;
  const sql = 'INSERT INTO students (name, email, age, grade) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, age, grade], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Failed to add student', details: err.message });
    } else {
      res.status(201).json({ id: result.insertId, name, email, age, grade });
    }
  });
});


// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

//add Students
// app.post('/api/students', (req, res) => {
//   const { name, email, age, grade } = req.body;
//   const query = 'INSERT INTO students (name, email, age, grade) VALUES (?, ?, ?, ?)';
//   db.query(query, [name, email, age, grade], (err, result) => {
//     if (err) {
//       res.status(500).json({ error: 'Failed to add student' });
//     } else {
//       res.status(201).json({ id: result.insertId, name, email, age, grade });
//     }
//   });
// });


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
