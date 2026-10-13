import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Partners from './components/Partners.jsx';
import Services from './components/Services.jsx';
import Compliance from './components/Complians.jsx'; 
import Projects from './components/Projects.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';

const Home = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900 font-sans scroll-smooth">
    <Nav />
    {/* Adding pt-20 (mobile) and md:pt-0 (desktop if Hero handles it) */}
    <main className="pt-20 md:pt-0"> 
      <Hero />
      <Partners />
      <section id="services" className="scroll-mt-24"><Services /></section>
      <section id="compliance" className="scroll-mt-24"><Compliance /></section>
      <section id="projects" className="scroll-mt-24"><Projects /></section>
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes> 
        {/* Public Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Send any unknown path back to the landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;