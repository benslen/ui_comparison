/**
 * Shared types for the reference screen.
 *
 * Every app in this workspace renders the same screen from the same data, so
 * these types are the contract each library implementation codes against.
 */

export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'draft';

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: 'Starter' | 'Growth' | 'Scale' | 'Enterprise';
  status: InvoiceStatus;
  amount: number;
  seats: number;
  signedUp: string; // ISO date
}

export type TrendDirection = 'up' | 'down';

/** Icon is referenced by name; each app maps names to its own icon set. */
export type StatIcon = 'revenue' | 'customers' | 'orders' | 'churn';

export interface Stat {
  id: string;
  label: string;
  value: string;
  delta: number; // percentage points, signed
  direction: TrendDirection;
  /** True when `direction: 'down'` is a good thing (e.g. churn). */
  invertGood: boolean;
  icon: StatIcon;
  caption: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface MenuItem {
  id: string;
  label: string;
  /** Renders a separator above this item. */
  dividerBefore?: boolean;
  danger?: boolean;
}

export interface CurrentUser {
  name: string;
  email: string;
  initials: string;
  role: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface TabItem {
  id: string;
  label: string;
  heading: string;
  body: string;
  bullets: string[];
}

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

export type ToastTone = 'success' | 'error' | 'info' | 'warning';

export interface ToastSpec {
  tone: ToastTone;
  title: string;
  description: string;
}
