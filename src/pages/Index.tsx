import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Team from '@/components/Team';
import TechStack from '@/components/TechStack';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className={`min-h-screen bg-background overflow-x-hidden ${loading ? 'invisible' : 'visible'}`}>
        <Navbar />
        <Hero />
        <Services />
        <About />
        <Projects />
        <Testimonials />
        <Team />
        <TechStack />
        <CTA />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
