import React from 'react';
import Navbar from '../src/components/Navbar.jsx';
import Home from '../src/components/Home.jsx';
import Footer from '../src/components/Footer.jsx';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Blogs from '../src/pages/Blogs.jsx';
import About from '../src/pages/About.jsx';
import Contact from '../src/pages/Contact.jsx';
import Login from '../src/pages/Login.jsx';
import Register from '../src/pages/Register.jsx';
import Dashboard from '../src/pages/Dashboard.jsx';
import Creators from '../src/pages/Creators.jsx';
import { useAuth } from './context/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import UpdateBlog from '../src/dashboard/UpdateBlog.jsx';
import Detail from '../src/pages/Detail.jsx';
import NotFound from '../src/pages/NotFound.jsx';

function App() {
  const location = useLocation();
  const hideNavbarFooter = ['/dashboard', '/login', '/register'].includes(location.pathname);
  const { blogs, isAuthenticated } = useAuth();
  let token = localStorage.getItem('jwt'); // Retrieve the token directly from the localStorage to maininting the routes protect (Go to login.jsx)
  console.log(blogs);
  console.log(isAuthenticated); // it is not using because every page refresh it was redirected to /login

  return (
    <div className="p-5">
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to={'/login'} />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Single page route */}
        <Route path="/blog/:id" element={<Detail />} />

        {/* Update page route */}
        <Route path="/blog/update/:id" element={<UpdateBlog />} />

        {/* Universal route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
