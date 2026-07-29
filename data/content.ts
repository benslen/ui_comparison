import type {
  AccordionItem,
  CurrentUser,
  MenuItem,
  NavLink,
  SelectOption,
  Stat,
  TabItem,
  ToastSpec,
} from './types';

export const appName = 'Nimbus Analytics';

export const navLinks: NavLink[] = [
  { id: 'dashboard', label: 'Dashboard', href: '#dashboard' },
  { id: 'customers', label: 'Customers', href: '#customers' },
  { id: 'reports', label: 'Reports', href: '#reports' },
  { id: 'settings', label: 'Settings', href: '#settings' },
];

export const currentUser: CurrentUser = {
  name: 'Robin Vance',
  email: 'robin@nimbus.app',
  initials: 'RV',
  role: 'Workspace admin',
};

export const avatarMenu: MenuItem[] = [
  { id: 'profile', label: 'Your profile' },
  { id: 'billing', label: 'Billing & plans' },
  { id: 'team', label: 'Team members' },
  { id: 'prefs', label: 'Preferences', dividerBefore: true },
  { id: 'signout', label: 'Sign out', dividerBefore: true, danger: true },
];

export const stats: Stat[] = [
  {
    id: 'revenue',
    label: 'Monthly revenue',
    value: '$148,320',
    delta: 12.4,
    direction: 'up',
    invertGood: false,
    icon: 'revenue',
    caption: 'vs. last month',
  },
  {
    id: 'customers',
    label: 'Active customers',
    value: '2,847',
    delta: 4.1,
    direction: 'up',
    invertGood: false,
    icon: 'customers',
    caption: 'vs. last month',
  },
  {
    id: 'orders',
    label: 'Open invoices',
    value: '312',
    delta: 2.8,
    direction: 'down',
    invertGood: true,
    icon: 'orders',
    caption: 'vs. last month',
  },
  {
    id: 'churn',
    label: 'Churn rate',
    value: '1.9%',
    delta: 0.6,
    direction: 'up',
    invertGood: false,
    icon: 'churn',
    caption: 'vs. last month',
  },
];

export const planOptions: SelectOption[] = [
  { value: 'starter', label: 'Starter — $29/mo' },
  { value: 'growth', label: 'Growth — $99/mo' },
  { value: 'scale', label: 'Scale — $299/mo' },
  { value: 'enterprise', label: 'Enterprise — custom' },
];

export const tabItems: TabItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    heading: 'Account health',
    body: 'Revenue is tracking 12% ahead of forecast, driven mostly by Scale-tier expansions in EMEA.',
    bullets: [
      'Net revenue retention at 114%',
      'Two Enterprise renewals close this quarter',
      'Support backlog down to 14 open tickets',
    ],
  },
  {
    id: 'activity',
    label: 'Activity',
    heading: 'Recent activity',
    body: 'The last seven days of workspace events, newest first.',
    bullets: [
      'Priya Raghunathan upgraded to Enterprise',
      'Invoice INV-2057 marked overdue',
      'Lena Vogt added 12 seats to Nordkap GmbH',
    ],
  },
  {
    id: 'integrations',
    label: 'Integrations',
    heading: 'Connected services',
    body: 'Data flows into Nimbus from three sources on a 15-minute sync.',
    bullets: ['Stripe — billing events', 'Segment — product analytics', 'HubSpot — CRM contacts'],
  },
];

export const accordionItems: AccordionItem[] = [
  {
    id: 'billing',
    question: 'How is usage billed?',
    answer:
      'Seats are billed monthly in arrears. Mid-cycle additions are prorated to the day, and removals credit against the next invoice.',
  },
  {
    id: 'export',
    question: 'Can I export the raw data?',
    answer:
      'Yes. Every table exports to CSV or JSON, and Scale plans and above get a read-only Postgres replica.',
  },
  {
    id: 'sso',
    question: 'Do you support SSO and SCIM?',
    answer:
      'SAML SSO is available on Growth and above. SCIM provisioning is an Enterprise feature and supports Okta, Entra ID, and Google Workspace.',
  },
  {
    id: 'retention',
    question: 'How long is data retained?',
    answer:
      'Event data is retained for 25 months by default. Enterprise workspaces can extend retention to seven years or set a shorter deletion window.',
  },
];

export const toastSpecs: Record<'success' | 'error' | 'info', ToastSpec> = {
  success: {
    tone: 'success',
    title: 'Invoice sent',
    description: 'INV-2064 was emailed to robin@nimbus.app.',
  },
  error: {
    tone: 'error',
    title: 'Sync failed',
    description: 'Stripe returned a 429. Retrying in 30 seconds.',
  },
  info: {
    tone: 'info',
    title: 'Export queued',
    description: "We'll email a download link when the CSV is ready.",
  },
};

export const modalCopy = {
  title: 'Invite a teammate',
  body: "They'll get an email invitation to join the Nimbus Analytics workspace. Invites expire after 7 days.",
  confirmLabel: 'Send invite',
  cancelLabel: 'Cancel',
};

export const formCopy = {
  title: 'New customer',
  subtitle: 'Add a customer record and assign a plan.',
  nameLabel: 'Full name',
  namePlaceholder: 'Amara Okafor',
  planLabel: 'Plan',
  planPlaceholder: 'Select a plan',
  dateLabel: 'Start date',
  consentLabel: 'Send a welcome email',
  submitLabel: 'Create customer',
  successToast: {
    tone: 'success' as const,
    title: 'Customer created',
    description: 'The record was saved and a welcome email is on its way.',
  },
  validationToast: {
    tone: 'error' as const,
    title: 'Check the form',
    description: 'Name and plan are both required.',
  },
};

export const pageCopy = {
  title: 'Dashboard',
  subtitle: 'Revenue, customers, and invoice status across the workspace.',
  tableTitle: 'Customers',
  tableSubtitle: 'Sortable, paginated, 23 records.',
  actionsTitle: 'Actions',
  actionsSubtitle: 'Overlays and notifications.',
  tabsTitle: 'Workspace',
  accordionTitle: 'Frequently asked',
};
