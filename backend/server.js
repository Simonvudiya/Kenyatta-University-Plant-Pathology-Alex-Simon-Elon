const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'KU Portal Backend is running!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'KU Portal Backend' });
});

// ===== KU PORTAL API ROUTES =====
app.get('/api/courses', (req, res) => {
  res.json([
    { id: 1, code: 'PP401', name: 'Bacteriology', instructor: 'Dr. Kamau', credits: 3 },
    { id: 2, code: 'PP402', name: 'Nematology', instructor: 'Prof. Wanjiku', credits: 3 },
    { id: 3, code: 'PP403', name: 'Mycology', instructor: 'Dr. Otieno', credits: 4 },
    { id: 4, code: 'PP404', name: 'Virology', instructor: 'Prof. Mwangi', credits: 3 },
    { id: 5, code: 'PP405', name: 'Entomology', instructor: 'Dr. Chebet', credits: 3 },
    { id: 6, code: 'PP406', name: 'Data Analysis with R', instructor: 'Dr. Maina', credits: 4 },
    { id: 7, code: 'PP407', name: 'Data Analysis with STATA', instructor: 'Prof. Kariuki', credits: 3 },
    { id: 8, code: 'PP408', name: 'Data Analysis with SPSS', instructor: 'Dr. Wairimu', credits: 3 },
    { id: 9, code: 'PP409', name: 'Python Programming', instructor: 'Dr. Omondi', credits: 4 },
    { id: 10, code: 'PP410', name: 'Excel for Data Analysis', instructor: 'Prof. Njeri', credits: 3 }
  ]);
});

app.get('/api/announcements', (req, res) => {
  res.json([
    { 
      id: 1, 
      title: 'Welcome to Plant Pathology Portal!', 
      date: '2025-01-20', 
      content: 'The new Department of Plant Pathology portal is now live. Access your courses, assignments, and research materials here.',
      category: 'System'
    },
    { 
      id: 2, 
      title: 'Spring Semester Registration', 
      date: '2025-01-18', 
      content: 'Registration for Spring 2025 semester is now open. All Plant Pathology students must register by January 30th.',
      category: 'Academic'
    },
    { 
      id: 3, 
      title: 'Laboratory Safety Training', 
      date: '2025-01-15', 
      content: 'Mandatory laboratory safety training for all Plant Pathology students will be held this Friday at 2:00 PM in Lab B.',
      category: 'Safety'
    },
    { 
      id: 4, 
      title: 'Research Symposium', 
      date: '2025-01-12', 
      content: 'Annual Plant Pathology Research Symposium scheduled for February 15th. Submit your abstracts by January 31st.',
      category: 'Research'
    }
  ]);
});

app.get('/api/user/profile', (req, res) => {
  res.json({
    id: 12345,
    name: 'John Doe',
    email: 'john.doe@ku.edu',
    role: 'student',
    department: 'Plant Pathology',
    specialization: 'Plant Disease Management',
    semester: 'Spring 2025',
    studentId: 'KU202412345',
    year: '4th Year'
  });
});

app.get('/api/grades', (req, res) => {
  res.json([
    { course: 'Bacteriology', grade: 'A', credits: 3 },
    { course: 'Nematology', grade: 'B+', credits: 3 },
    { course: 'Mycology', grade: 'A-', credits: 4 },
    { course: 'Data Analysis with R', grade: 'A', credits: 4 }
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
