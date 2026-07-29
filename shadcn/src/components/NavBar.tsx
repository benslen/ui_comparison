import { useTheme } from 'next-themes';
import { ChartNoAxesCombined, Moon, Sun } from 'lucide-react';
import { appName, avatarMenu, currentUser, navLinks } from '@data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function NavBar() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <header className="bg-card sticky top-0 z-50 border-b">
      <div className="flex h-15 items-center gap-2 px-4">
        <div className="mr-6 flex items-center gap-2.5">
          <div className="bg-primary text-primary-foreground grid size-8 place-items-center rounded-lg">
            <ChartNoAxesCombined className="size-[18px]" />
          </div>
          <span className="font-bold">{appName}</span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link, index) => (
            <a
              key={link.id}
              href={link.href}
              className={cn(
                'text-sm transition-colors',
                index === 0
                  ? 'text-primary font-bold'
                  : 'text-muted-foreground hover:text-foreground font-medium',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex-1" />

        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle color mode"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
        >
          {isDark ? <Sun /> : <Moon />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 cursor-pointer rounded-full" aria-label="Open account menu">
              <Avatar className="size-[34px]">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {currentUser.initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-58">
            <div className="px-2 py-1.5">
              <p className="text-sm font-semibold">{currentUser.name}</p>
              <p className="text-muted-foreground text-xs">{currentUser.email}</p>
            </div>
            {avatarMenu.map((item) => (
              <div key={item.id}>
                {item.dividerBefore && <DropdownMenuSeparator />}
                <DropdownMenuItem variant={item.danger ? 'destructive' : 'default'}>
                  {item.label}
                </DropdownMenuItem>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
