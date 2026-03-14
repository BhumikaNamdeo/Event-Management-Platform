import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

import Login from '../components/Login';
import Home from '../components/Home';
import Explore from '../components/Explore';
import Organizer from '../components/Organizer';
import EventForm from '../components/EventFrom';
import EventDetials from '../components/EventDetials';
import Dashboard from '../components/Dashboard';
import ShowAllEvent from '../pages/ShowAllEvent';
import Success from '../pages/Succes';
import Cancel from '../pages/Cancel';
import Contact from '../components/Contact';
import Blog from '../pages/Blog';
import EventView from "../pages/EventView"

// Role-based Protected Route
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (!user) return <Navigate to="/login" />; // not logged in
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />; // role not allowed

  return children;
};

const AppRoutes = () => {
  const handleSubmit = (eventData) => {
    console.log("Event Data:", eventData);
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />

      {/* User & Admin Routes */}
      <Route
        path="/explore"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <Explore />
          </ProtectedRoute>
        }
      />


      <Route
  path="/event/viewDetail/:id"
  element={
    <ProtectedRoute>
      <ShowAllEvent />  /
    </ProtectedRoute>
  }
/>

      <Route
        path="/event/view"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <ShowAllEvent />
          </ProtectedRoute>
        }
      />


       <Route
        path="/event/view"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <EventView/>
          </ProtectedRoute>
        }
      />

      {/* Organizer/Admin Routes */}
      <Route
        path="/organizer"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Organizer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/organizer-event"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <EventForm onSubmit={handleSubmit} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/organizer/event/:id"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <Elements stripe={stripePromise}>
              <EventDetials />
            </Elements>
          </ProtectedRoute>
        }
      />
      <Route
        path="/organizer/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Payment / Success / Cancel Routes */}
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />

      {/* Unauthorized Access */}
      <Route
        path="/unauthorized"
        element={
          <div className="p-10 text-center text-red-600 font-bold text-2xl">
            You do not have access to this page!
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
