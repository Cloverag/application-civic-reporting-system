"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, User } from 'lucide-react';
import { useTheme } from '@/contexts/theme-provider';
import { useLanguage } from '@/contexts/language-provider';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { languages, type Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';


export function AppHeader() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/report', label: t('form.title') },
  ];

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold tracking-tight font-headline">{t('header.title')}</h1>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "transition-colors hover:text-primary",
                            pathname === item.href ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>

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

          <Link href="/auth/sign-in">
             <Button variant="ghost" size="sm">
                <User className="mr-2 h-4 w-4"/>
                {t('auth.signin.title')}
             </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
