import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import WhyChooseUs from '@/components/WhyChooseUs';
import Projects from '@/components/Projects';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Team from '@/components/Team';
import TechStack from '@/components/TechStack';
import Blog from '@/components/Blog';
import FAQ from '@/components/FAQ';
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
        <WhyChooseUs />
        <Projects />
        <Process />
        <Testimonials />
        <FAQ />
        <Team />
        <TechStack />
        <Blog />
        <CTA />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
