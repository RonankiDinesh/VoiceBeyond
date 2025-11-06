import { Github, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-blue-500/20 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Neural Ninjas for accessibility at Hackathon 2025</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="View on GitHub"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <p className="text-sm text-muted-foreground">
              Making the web accessible for everyone
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
