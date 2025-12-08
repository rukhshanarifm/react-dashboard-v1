import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

const Header = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <header className="header">
      <div className="container flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Course Analytics Dashboard
        </h1>
        
        <button
          onClick={toggleTheme}
          className="btn btn-secondary flex items-center gap-2"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
