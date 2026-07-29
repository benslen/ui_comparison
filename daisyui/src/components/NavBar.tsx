import { ChartNoAxesCombined, Moon, Sun } from 'lucide-react';
import { appName, avatarMenu, currentUser, navLinks } from '@data';
import { useTheme } from '../theme';

export function NavBar() {
  const { isDark, toggle } = useTheme();

  return (
    <header className="navbar bg-base-100 border-base-300 sticky top-0 z-50 border-b px-4">
      <div className="mr-6 flex items-center gap-2.5">
        <div className="bg-primary text-primary-content grid size-8 place-items-center rounded-lg">
          <ChartNoAxesCombined className="size-[18px]" />
        </div>
        <span className="font-bold">{appName}</span>
      </div>

      <nav className="hidden md:block">
        <ul className="menu menu-horizontal gap-1 px-0">
          {navLinks.map((link, index) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={index === 0 ? 'text-primary font-bold' : 'text-base-content/70'}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-1" />

      <button
        type="button"
        className="btn btn-ghost btn-circle"
        aria-label="Toggle color mode"
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={toggle}
      >
        {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
      </button>

      {/* daisyUI dropdowns are CSS-driven: focus on the trigger reveals the
          content. No JS, but also no focus trap or Escape handling. */}
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          aria-label="Open account menu"
          className="btn btn-ghost btn-circle avatar avatar-placeholder ml-1"
        >
          <div className="bg-primary text-primary-content w-[34px] rounded-full">
            <span className="text-xs font-semibold">{currentUser.initials}</span>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box border-base-300 z-10 mt-2 w-58 border p-2 shadow-lg"
        >
          <li className="menu-title px-3 py-1.5">
            <div>
              <div className="text-base-content text-sm font-semibold">{currentUser.name}</div>
              <div className="text-base-content/60 text-xs font-normal">{currentUser.email}</div>
            </div>
          </li>
          {avatarMenu.map((item) => (
            <li key={item.id} className={item.dividerBefore ? 'border-base-300 mt-1 border-t pt-1' : ''}>
              <a className={item.danger ? 'text-error' : ''}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
