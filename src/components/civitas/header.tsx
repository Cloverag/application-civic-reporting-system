"use client";

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/theme-provider';
import { useLanguage } from '@/contexts/language-provider';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { languages, type Language } from '@/lib/i18n';

export function AppHeader() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="text-2xl font-bold tracking-tight font-headline">{t('header.title')}</h1>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {languages[lang]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(languages).map(([code, name]) => (
                <DropdownMenuItem key={code} onClick={() => setLang(code as Language)}>
                  {name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? t('header.theme.toggle.light') : t('header.theme.toggle.dark')}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  );
}
