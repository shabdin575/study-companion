import { Heart } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between px-4 py-4 max-w-lg mx-auto">
        <div>
          <h1 className="text-xl font-serif font-semibold text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary animate-pulse-soft" fill="currentColor" />
        </div>
      </div>
    </header>
  );
};

export default Header;
