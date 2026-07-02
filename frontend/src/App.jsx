import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import TaskPage from './pages/TaskPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<TaskPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
export default App;
