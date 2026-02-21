'use client';

import { Search, NotificationsNone, Person } from '@mui/icons-material';
import { MovieFilter } from '@mui/icons-material';
import { useTranslation } from '../../lib/useTranslation';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const navItems = [
    { key: 'projects' as const, id: 'nav-projects', path: '/dashboard' },
    { key: 'templates' as const, id: 'nav-templates', path: '#' },
    { key: 'assets' as const, id: 'nav-assets', path: '#' },
    { key: 'settings' as const, id: 'nav-settings', path: '/settings' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 h-24 flex items-center justify-between px-12 bg-gradient-to-b from-black via-black/90 to-transparent pointer-events-none" suppressHydrationWarning>
      <div className="pointer-events-auto flex items-center">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-4">
          <MovieFilter className="text-black text-[18px]" />
        </div>
        <h1 className="font-light text-xl tracking-tight text-white/90">{t('app.name')}</h1>
      </div>

      <nav className="pointer-events-auto hidden md:flex space-x-12">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          let label = '';
          if (item.key === 'projects') label = t('nav.projects');
          else if (item.key === 'templates') label = t('nav.templates');
          else if (item.key === 'assets') label = t('nav.assets');
          else if (item.key === 'settings') label = t('nav.settings');

          return (
            <a
              key={item.id}
              href={item.path}
              className={`nav-link text-sm font-light hover:text-white transition-colors tracking-wide ${
                isActive ? 'text-white/90' : 'text-white/50'
              }`}
            >
              {label}
            </a>
          );
        })}
      </nav>

      <div className="pointer-events-auto flex items-center space-x-6">
        <button className="text-white/50 hover:text-white transition-colors">
          <Search className="font-light text-[22px]" />
        </button>
        <button className="text-white/50 hover:text-white transition-colors relative">
          <NotificationsNone className="font-light text-[22px]" />
          <span className="absolute top-1 right-0.5 w-1.5 h-1.5 bg-white rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden ml-2 cursor-pointer hover:ring-1 hover:ring-white/50 transition-all">
          <img
            alt="User"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
          />
        </div>
      </div>

      <style jsx>{`
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -4px;
          left: 50%;
          background-color: white;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </header>
  );
}
