import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Leaf, Languages } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage, dir } = useLanguage();

  const navItems = [
    { label: t('nav.home'), path: "/" },
    { label: t('nav.about'), path: "/about" },
    { label: t('nav.research'), path: "/research" },
    { label: t('nav.publications'), path: "/publications" },
    { label: t('nav.contact'), path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-primary/20">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity">
              <Leaf className="h-6 w-6" />
              <span>Seyyed Reza Sobhani</span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location === item.path
                      ? "text-primary font-bold"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full px-3 font-medium">
                  En/Fa
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-accent' : ''}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('fa')} className={language === 'fa' ? 'bg-accent' : ''}>
                  فارسی
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="default" size="sm" className="ml-4 rounded-full" asChild>
              <a href="/contact">{t('nav.cta')}</a>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full px-3 font-medium">
                  En/Fa
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-accent' : ''}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('fa')} className={language === 'fa' ? 'bg-accent' : ''}>
                  فارسی
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              className="p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background p-4 animate-in slide-in-from-top-5">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <a
                    className={cn(
                      "text-base font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-muted",
                      location === item.path
                        ? "text-primary bg-muted/50"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 mt-20">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-foreground">Seyyed Reza Sobhani</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Associate Professor at Tehran University of Medical Sciences (TUMS). 
              Dedicated to advancing sustainable diets and public health nutrition.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/research"><a className="hover:text-primary transition-colors">Research Interests</a></Link></li>
              <li><Link href="/publications"><a className="hover:text-primary transition-colors">Publications</a></Link></li>
              <li><Link href="/about"><a className="hover:text-primary transition-colors">About Me</a></Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-foreground">Connect</h3>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/seyyed-reza-sobhani-26719315b/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#0077b5] transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://scholar.google.com/citations?user=qNxmLSEAAAAJ&hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#4285F4] transition-colors"
              >
                Google Scholar
              </a>
              <a 
                href="https://www.researchgate.net/profile/Seyyed-Reza-Sobhani" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#00CCBB] transition-colors"
              >
                ResearchGate
              </a>
            </div>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Seyyed Reza Sobhani. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
