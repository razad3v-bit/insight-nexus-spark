import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Briefcase, ChevronDown, ChevronUp, ExternalLink, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const positions = [
  {
    id: 1,
    title: 'Senior Full-Stack Developer',
    department: 'Engineering',
    location: 'Remote / New York',
    type: 'Full-time',
    experience: '5+ years',
    description: 'We are looking for an experienced Full-Stack Developer to join our team and help build scalable web applications.',
    responsibilities: [
      'Design, develop, and maintain web applications using React and Node.js',
      'Collaborate with cross-functional teams to define and implement features',
      'Write clean, maintainable, and well-documented code',
      'Mentor junior developers and conduct code reviews',
      'Participate in architectural decisions and technical planning',
    ],
    requirements: [
      '5+ years of experience in full-stack development',
      'Strong proficiency in React, TypeScript, and Node.js',
      'Experience with cloud platforms (AWS, GCP, or Azure)',
      'Familiarity with CI/CD pipelines and DevOps practices',
      'Excellent communication and teamwork skills',
    ],
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote / San Francisco',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Join our design team to create beautiful, user-centered interfaces for enterprise applications.',
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Collaborate with developers to ensure design implementation',
      'Maintain and evolve our design system',
      'Present designs to stakeholders and incorporate feedback',
    ],
    requirements: [
      '3+ years of experience in UI/UX design',
      'Proficiency in Figma and other design tools',
      'Strong portfolio showcasing web and mobile designs',
      'Understanding of accessibility standards',
      'Experience with design systems and component libraries',
    ],
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Remote',
    type: 'Full-time',
    experience: '4+ years',
    description: 'Help us build and maintain robust, scalable infrastructure for our growing client base.',
    responsibilities: [
      'Design and implement CI/CD pipelines',
      'Manage cloud infrastructure on AWS and Azure',
      'Monitor system performance and implement improvements',
      'Automate deployment and operational processes',
      'Ensure security best practices are followed',
    ],
    requirements: [
      '4+ years of experience in DevOps or SRE roles',
      'Strong knowledge of Docker and Kubernetes',
      'Experience with Terraform or CloudFormation',
      'Proficiency in scripting (Python, Bash)',
      'Understanding of security and compliance requirements',
    ],
  },
  {
    id: 4,
    title: 'Project Manager',
    department: 'Operations',
    location: 'New York / Hybrid',
    type: 'Full-time',
    experience: '5+ years',
    description: 'Lead cross-functional teams to deliver complex software projects on time and within budget.',
    responsibilities: [
      'Manage project timelines, resources, and budgets',
      'Communicate with clients and stakeholders',
      'Identify and mitigate project risks',
      'Lead agile ceremonies and sprint planning',
      'Ensure quality deliverables and client satisfaction',
    ],
    requirements: [
      '5+ years of project management experience',
      'PMP or Scrum Master certification preferred',
      'Experience with software development projects',
      'Strong leadership and communication skills',
      'Proficiency in project management tools (Jira, Asana)',
    ],
  },
];

const benefits = [
  'Competitive salary & equity',
  'Remote-first culture',
  'Unlimited PTO',
  'Health, dental & vision',
  'Learning & development budget',
  'Home office stipend',
  'Team retreats',
  'Flexible hours',
];

const Careers = () => {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    linkedin: '',
    portfolio: '',
    message: '',
  });

  const toggleJob = (id: number) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:careers@insightexus.com?subject=Application for ${formData.position || 'Open Position'}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ALinkedIn: ${formData.linkedin}%0D%0APortfolio: ${formData.portfolio}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-glow pointer-events-none opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-primary font-medium mb-4 block">Careers at Insightexus</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Join Our <span className="text-gradient">Team</span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto mb-8">
            We're building the future of software development. Join a team of passionate innovators 
            and work on exciting projects that make a real impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}>
              View Open Positions
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}>
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Work With Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer more than just a job. Join a culture that values growth, creativity, and work-life balance.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-gradient-card border border-border">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm sm:text-base">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Open <span className="text-gradient">Positions</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our current openings and find the perfect role for your skills and aspirations.
            </p>
          </div>

          <div className="space-y-4">
            {positions.map((job) => (
              <div key={job.id} className="rounded-2xl bg-gradient-card border border-border overflow-hidden transition-all duration-300 hover:border-primary/30">
                <button
                  onClick={() => toggleJob(job.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      {job.experience}
                    </span>
                    {expandedJob === job.id ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {expandedJob === job.id && (
                  <div className="px-6 pb-6 pt-2 border-t border-border">
                    <p className="text-muted-foreground mb-6">{job.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Responsibilities</h4>
                        <ul className="space-y-2">
                          {job.responsibilities.map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Requirements</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Button onClick={() => {
                        setFormData(prev => ({ ...prev, position: job.title }));
                        document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
                      }}>
                        Apply for this Position
                      </Button>
                      <Button variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 sm:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Apply <span className="text-gradient">Now</span></h2>
            <p className="text-muted-foreground">
              Ready to join our team? Fill out the form below and we'll get back to you within 48 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-gradient-card border border-border">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Position *</label>
              <Input
                required
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                placeholder="e.g., Senior Full-Stack Developer"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
                <Input
                  value={formData.linkedin}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Portfolio / GitHub</label>
                <Input
                  value={formData.portfolio}
                  onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Why do you want to join Insightexus? *</label>
              <Textarea
                required
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Tell us about yourself and why you'd be a great fit..."
                className="min-h-[150px]"
              />
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                By submitting this form, you'll be redirected to your email client to send your application.
                Please attach your resume to the email.
              </p>
            </div>

            <Button type="submit" size="lg" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Submit Application
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Insightexus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Careers;
