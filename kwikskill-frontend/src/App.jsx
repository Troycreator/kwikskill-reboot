import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CreateProfile from './pages/CreateProfile';
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import AuthGuard from "./components/AuthGuard";
import ServiceListing from './pages/services/ServiceListing';
import ServiceDetails from './pages/services/ServiceDetails';
import ServiceForm from './pages/services/ServiceForm';
import BookingForm from './pages/BookingForm';
import BecomeProvider from './pages/BecomeProvider';
import ProviderDashboard from './pages/dashboard/ProviderDashboard';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard/*" 
          element={
            <AuthGuard>
              <Layout>
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </Layout>
            </AuthGuard>
          }
        />

        <Route 
          path="/create-profile" 
          element={
            <AuthGuard>
              <CreateProfile />
            </AuthGuard>
          } 
        />

        {/* Service Routes - Now Protected */}
        <Route 
          path="/services" 
          element={
            <AuthGuard>
              <Layout>
                <ServiceListing />
              </Layout>
            </AuthGuard>
          } 
        />
        <Route 
          path="/services/:id" 
          element={
            <AuthGuard>
              <Layout>
                <ServiceDetails />
              </Layout>
            </AuthGuard>
          } 
        />
        <Route 
          path="/dashboard/services/new" 
          element={
            <AuthGuard>
              <Layout>
                <ServiceForm />
              </Layout>
            </AuthGuard>
          } 
        />
        <Route 
          path="/dashboard/services/edit/:id" 
          element={
            <AuthGuard>
              <Layout>
                <ServiceForm />
              </Layout>
            </AuthGuard>
          } 
        />

        <Route 
          path="/dashboard/bookings/new/:serviceId" 
          element={
            <AuthGuard>
              <Layout>
                <BookingForm />
              </Layout>
            </AuthGuard>
          } 
        />

        <Route 
          path="/dashboard/provider" 
          element={
            <AuthGuard>
              <Layout>
                <ProviderDashboard />
              </Layout>
            </AuthGuard>
          } 
        />
        <Route 
          path="/become-provider" 
          element={
            <AuthGuard>
              <Layout>
                <BecomeProvider />
              </Layout>
            </AuthGuard>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;