import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-primary group-hover:shadow-glow transition-smooth">
            <Mic className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SunoSab
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
            Home
          </Link>
          <Link to="/select" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
            Start Captioning
          </Link>
          {(location.pathname !== "/") ?
            <a href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Features
            </a> :<a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
              Features
            </a>}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isHome && (
            <Button asChild className="shadow-primary hover:shadow-glow transition-smooth">
              <Link to="/select">Get Started</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
};
