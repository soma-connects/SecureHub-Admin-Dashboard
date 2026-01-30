import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Services from './pages/Services';
import Offices from './pages/Offices';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

import { Login } from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { RequireAuth } from './components/auth/RequireAuth';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/orders" element={<RequireAuth><Orders /></RequireAuth>} />
          <Route path="/customers" element={<RequireAuth><Customers /></RequireAuth>} />
          <Route path="/services" element={<RequireAuth><Services /></RequireAuth>} />
          <Route path="/offices" element={<RequireAuth><Offices /></RequireAuth>} />
          <Route path="/notifications" element={<RequireAuth><Notifications /></RequireAuth>} />
          <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
