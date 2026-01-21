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
import ImpactMetrics from '@/components/ImpactMetrics';
import Industries from '@/components/Industries';
import Newsletter from '@/components/Newsletter';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Clients from '@/components/Clients';
import Awards from '@/components/Awards';
import Comparison from '@/components/Comparison';
import CaseStudiesTeaser from '@/components/CaseStudiesTeaser';
import EngagementModels from '@/components/EngagementModels';
import Principles from '@/components/Principles';

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className={`min-h-screen bg-background overflow-x-hidden ${loading ? 'invisible' : 'visible'}`}>
        <Navbar />
        <Hero />
        <Clients />
        <Services />
        <About />
        <WhyChooseUs />
        <Projects />
        <CaseStudiesTeaser />
        <ImpactMetrics />
        <Process />
        <EngagementModels />
        <Testimonials />
        <Industries />
        <Awards />
        <Comparison />
        <Principles />
        <FAQ />
        <Team />
        <TechStack />
        <Blog />
        <Newsletter />
        <CTA />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
