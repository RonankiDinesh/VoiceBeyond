import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ColorBends from '@/components/ColorBends';
import TiltedCard from '@/components/TiltedCard';


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
  const features = [
    {
      icon: Languages,
      title: "Multilingual Support",
      description: "Real-time captions in all major Indian languages plus global languages",
      color: "from-[#ff4567] to-[#006aff]"
    },
    {
      icon: Accessibility,
      title: "Accessible Design",
      description: "High contrast, customizable fonts, and WCAG 2.1 AAA compliant",
      color: "from-[#ff4567] to-[#006aff]"
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Ultra-low latency captioning with advanced speech recognition",
      color: "from-[#ff4567] to-[#006aff]"
    },
    {
      icon: Globe,
      title: "Universal Access",
      description: "Works with YouTube, uploaded videos, and live microphone input",
      color: "from-[#ff4567] to-[#006aff]"
    }
  ];

  return (
    <div className="min-h-screen relative">

      {/* Background (fixed, full-viewport) */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-black  ">
        <div className="w-screen h-screen overflow-hidden">
          <ColorBends
            colors={["#ff4567", "#de5cff", "#006aff"]}
            rotation={0}
            speed={0.2}
            scale={1}
            frequency={1}
            warpStrength={1}
            mouseInfluence={1}
            parallax={0.5} /* disable parallax for static background */
            noise={0.1}
            transparent
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Content */}
  <div className="relative z-10 min-h-screen">
        <Header />
        {/* Hero Section */}
        <section
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        >
          <motion.div
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
              className="text-5xl md:text-7xl font-bold mb-6 text-white text-shadow-lg"
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

          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-transparent">
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
                  className="transition-smooth"
                >
                  <TiltedCard
                    // imageSrc={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='}
                    altText={feature.title}
                    captionText={feature.title}
                    containerHeight={'300px'}
                    imageHeight={'260px'}
                    imageWidth={'360px'}
                    useBackground={true}
                    backgroundClassName={`bg-gradient-to-tr ${feature.color}`}
                    scaleOnHover={1.03}
                    rotateAmplitude={8}
                    showMobileWarning={false}
                    displayOverlayContent={true}
                    overlayContent={
                      <div className="p-6 bg-blue-300/30 rounded-2xl text-white flex flex-col h-full justify-between">
                        <div>
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-tr ${feature.color} flex items-center justify-center mb-4 shadow-primary`}>
                            <feature.icon className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                          <p className="text-md text-white/90">{feature.description}</p>
                        </div>
                      </div>
                    }
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 ">
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
    </div>);
}
