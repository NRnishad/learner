import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PublicRoute from './components/PublicRoute';
import RoleBasedRoute from './components/RoleBasedRoute'; // Import new guard

// Import Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (Login) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Route>

        {/* 🎓 STUDENT ROUTES */}
        <Route element={<RoleBasedRoute allowedRoles={['student']} />}>
           <Route path="/student/dashboard" element={<StudentDashboard />} />
           {/* Add /student/my-courses, /student/profile here */}
        </Route>

        {/* 👨‍🏫 INSTRUCTOR ROUTES */}
        <Route element={<RoleBasedRoute allowedRoles={['instructor']} />}>
           <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
           {/* Add /instructor/create-course here */}
        </Route>

        {/* 👑 ADMIN ROUTES */}
        <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
           <Route path="/admin/dashboard" element={<AdminDashboard />} />
           {/* We will add /admin/categories here in the next step */}
        </Route>

        {/* Error Pages */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;