import React from 'react';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/common/ScrollToTop';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#f8f9fc] text-slate-800 antialiased selection:bg-purple-500/20 selection:text-purple-700">
        <ScrollToTop />
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;