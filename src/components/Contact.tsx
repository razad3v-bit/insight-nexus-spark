import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content', {
        scrollTrigger: {
          trigger: '.contact-content',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: -60,
        opacity: 0,
        duration: 1,
      });

      gsap.from('.contact-form', {
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        x: 60,
        opacity: 0,
        duration: 1,
      });

      // Parallax floating elements
      gsap.to('.contact-float', {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const subject = encodeURIComponent(formData.subject || 'Website Inquiry');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:hello@insightexus.com?subject=${subject}&body=${body}`;

    toast({
      title: 'Email Client Opened!',
      description: 'Please send the email from your mail application.',
    });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@insightexus.com', href: 'mailto:hello@insightexus.com' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: '#' },
    { icon: Clock, label: 'Working Hours', value: 'Mon-Fri: 9AM-6PM PST', href: '#' },
  ];

  const quickLinks = [
    { label: 'Schedule a Call', icon: Phone },
    { label: 'Get a Quote', icon: MessageSquare },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="relative w-screen py-16 sm:py-20 lg:py-28 xl:py-32 overflow-hidden"
      style={{ marginLeft: 'calc(-50vw + 50%)' }}
    >
      {/* Background glows */}
      <div className="absolute bottom-0 right-0 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-glow pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-gradient-glow pointer-events-none opacity-50" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-[10%] contact-float opacity-20">
        <Mail className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute bottom-32 left-[5%] contact-float opacity-20">
        <MessageSquare className="w-12 h-12 text-primary" />
      </div>

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-primary font-medium mb-3 sm:mb-4 block text-sm sm:text-base">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Let's Build Something <span className="text-gradient">Amazing</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Ready to start your next project? We'd love to hear from you. Send us a message
            and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Contact info - 2 columns */}
          <div className="contact-content lg:col-span-2">
            <div className="space-y-6 mb-10">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center gap-4 group p-4 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">{info.label}</div>
                    <div className="font-medium text-sm sm:text-base group-hover:text-primary transition-colors">
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick action buttons */}
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href="#contact"
                  className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{link.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </a>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-8 aspect-video rounded-2xl bg-gradient-card border border-border overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-glow opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">San Francisco, CA</p>
                  <p className="text-xs text-muted-foreground mt-1">Silicon Valley Hub</p>
                </div>
              </div>
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }} />
            </div>
          </div>

          {/* Contact form - 3 columns */}
          <div className="contact-form lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-card p-6 sm:p-8 lg:p-10 rounded-2xl border border-border shadow-card relative overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />

              <div className="relative z-10 space-y-5 sm:space-y-6">
                {/* Name and Email row */}
                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm sm:text-base"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm sm:text-base"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm sm:text-base"
                    placeholder="Project Discussion"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none text-sm sm:text-base"
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </div>

                {/* Submit button */}
                <button type="submit" className="btn-primary w-full group text-base">
                  Send Message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                {/* Privacy note */}
                <p className="text-center text-xs text-muted-foreground">
                  By submitting this form, you agree to our privacy policy. We'll never share your data.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
