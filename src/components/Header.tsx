import { Activity, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Page } from '../App';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage?: Page;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center space-x-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Activity className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl text-foreground">DentalAI</span>
        </button>

        <nav className="flex items-center space-x-2 md:space-x-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate('landing')}
            className="hidden md:inline-flex"
          >
            Home
          </Button>
          <Button
            variant="ghost"
            onClick={() => onNavigate('dashboard')}
            className="hidden md:inline-flex"
          >
            My Scans
          </Button>
          <Button onClick={() => onNavigate('upload')} className="bg-primary hover:bg-primary/90">
            <Upload className="mr-2 h-4 w-4" />
            Upload X-Ray
          </Button>
        </nav>
      </div>
    </header>
  );
}
