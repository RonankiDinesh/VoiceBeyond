import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  Languages, 
  Accessibility, 
  Zap, 
  Globe, 
  ChevronDown,
  Sparkles,
  Users,
  Volume2
} from "lucide-react";
import { useRef } from "react";

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const features = [
    {
      icon: Languages,
      title: "Multilingual Support",
      description: "Real-time captions in all major Indian languages plus global languages",
      color: "from-primary to-secondary"
    },
    {
      icon: Accessibility,
      title: "Accessible Design",
      description: "High contrast, customizable fonts, and WCAG 2.1 AAA compliant",
      color: "from-secondary to-accent"
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Ultra-low latency captioning with advanced speech recognition",
      color: "from-accent to-primary"
    },
    {
      icon: Globe,
      title: "Universal Access",
      description: "Works with YouTube, uploaded videos, and live microphone input",
      color: "from-primary to-accent"
    }
  ];


  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero pt-16"
      >
        <motion.div 
          style={{ y, opacity }}
          className="container mx-auto px-4 text-center z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Built for CodeUtsava 2025</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          >
            Real-Time Multilingual
            <br />
            Accessible Captions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Breaking communication barriers for Deaf and Hard-of-Hearing communities
            with AI-powered real-time captions in 20+ languages
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="shadow-primary hover:shadow-glow transition-smooth text-lg px-8">
              <Link to="/select">
                Start Captioning
                <Volume2 className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8">
              <a href="#features">Watch Demo</a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
          >
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-primary" />
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Accessibility-First Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed with inclusivity at its core, powered by cutting-edge AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-2xl bg-card shadow-card border border-border hover:shadow-primary transition-smooth"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-primary`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Users className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Join the Accessibility Revolution
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Experience real-time captions that adapt to your needs. Start now, no signup required.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 shadow-glow">
              <Link to="/select">
                Get Started Free
                <ChevronDown className="ml-2 w-5 h-5 rotate-[-90deg]" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
