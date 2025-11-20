import { useApi } from '../hooks/useApi';

export const Dashboard = () => {
  const { data: health, loading, error } = useApi('/api/health');
  const { data: courses } = useApi('/api/courses');
  const { data: announcements } = useApi('/api/announcements');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard">
      <h1>KU Student Portal</h1>
      
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
            <div key={course.id}>{course.name}</div>
          ))}
        </div>
      )}

      {announcements && (
        <div className="announcements-card">
          <h3>Announcements</h3>
          {announcements.map(announcement => (
            <div key={announcement.id}>
              <strong>{announcement.title}</strong>
              <span>{announcement.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
