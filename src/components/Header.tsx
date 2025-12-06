import { Zap } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold gradient-text">MediaFlow</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#converter" className="text-muted-foreground hover:text-foreground transition-colors">
            კონვერტერი
          </a>
          <a href="#youtube" className="text-muted-foreground hover:text-foreground transition-colors">
            YouTube
          </a>
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            ფუნქციები
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
