import React from 'react';
import { useApi } from '../hooks/useApi';

const Dashboard = () => {
  const { data: health, loading, error } = useApi('/api/health');
  const { data: courses } = useApi('/api/courses');
  const { data: announcements } = useApi('/api/announcements');
  const { data: user } = useApi('/api/user/profile');

  if (loading) return <div>Loading KU Portal...</div>;
  if (error) return <div>Error connecting to server: {error}</div>;

  return (
    <div className="dashboard">
      <h1>KU Student Portal</h1>
      
      {user && (
        <div className="user-card">
          <h2>Welcome, {user.name}</h2>
          <p>Student ID: {user.studentId}</p>
          <p>Department: {user.department}</p>
          <p>Semester: {user.semester}</p>
        </div>
      )}

      {health && (
        <div className="status-card">
          <h3>System Status</h3>
          <p>Backend: {health.status}</p>
          <p>Service: {health.service}</p>
        </div>
      )}

      {courses && (
        <div className="courses-card">
          <h3>My Courses</h3>
          {courses.map(course => (
            <div key={course.id} style={{marginBottom: '10px', padding: '10px', background: 'white', borderRadius: '4px'}}>
              <strong>{course.code}: {course.name}</strong>
              <p>Instructor: {course.instructor} | Credits: {course.credits}</p>
            </div>
          ))}
        </div>
      )}

      {announcements && (
        <div className="announcements-card">
          <h3>University Announcements</h3>
          {announcements.map(announcement => (
            <div key={announcement.id} style={{marginBottom: '15px', padding: '15px', background: 'white', borderRadius: '4px'}}>
              <strong>{announcement.title}</strong>
              <p style={{color: '#666', fontSize: '0.9em'}}>{announcement.date} - {announcement.category}</p>
              <p>{announcement.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
