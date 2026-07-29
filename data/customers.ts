import type { Customer } from './types';

/**
 * 23 rows — deliberately not a multiple of the page size so the last page is
 * partial and pagination edge cases are visible in every app.
 */
export const customers: Customer[] = [
  { id: 'INV-2041', name: 'Amara Okafor',      email: 'amara@northwind.io',    company: 'Northwind Labs',   plan: 'Enterprise', status: 'paid',    amount: 12480.0, seats: 240, signedUp: '2023-01-14' },
  { id: 'INV-2042', name: 'Beatriz Salgado',   email: 'bea@finchpay.com',      company: 'Finchpay',         plan: 'Scale',      status: 'pending', amount: 4820.5,  seats: 96,  signedUp: '2023-02-02' },
  { id: 'INV-2043', name: 'Caleb Whitmore',    email: 'caleb@orbital.dev',     company: 'Orbital',          plan: 'Growth',     status: 'paid',    amount: 1890.0,  seats: 38,  signedUp: '2023-02-27' },
  { id: 'INV-2044', name: 'Dita Rahmawati',    email: 'dita@lumenworks.co',    company: 'Lumen Works',      plan: 'Starter',    status: 'overdue', amount: 349.0,   seats: 7,   signedUp: '2023-03-11' },
  { id: 'INV-2045', name: 'Elias Bergström',   email: 'elias@kvarn.se',        company: 'Kvarn AB',         plan: 'Scale',      status: 'paid',    amount: 6120.75, seats: 118, signedUp: '2023-03-30' },
  { id: 'INV-2046', name: 'Farida Haddad',     email: 'farida@tessellate.ai',  company: 'Tessellate',       plan: 'Enterprise', status: 'draft',   amount: 18300.0, seats: 410, signedUp: '2023-04-18' },
  { id: 'INV-2047', name: 'Grigor Petrov',     email: 'grigor@aurelia.bg',     company: 'Aurelia',          plan: 'Growth',     status: 'paid',    amount: 2240.0,  seats: 44,  signedUp: '2023-05-06' },
  { id: 'INV-2048', name: 'Hana Kobayashi',    email: 'hana@shirogane.jp',     company: 'Shirogane',        plan: 'Scale',      status: 'pending', amount: 5390.25, seats: 105, signedUp: '2023-05-24' },
  { id: 'INV-2049', name: 'Idris Bello',       email: 'idris@ravenstack.com',  company: 'Ravenstack',       plan: 'Starter',    status: 'paid',    amount: 420.0,   seats: 9,   signedUp: '2023-06-09' },
  { id: 'INV-2050', name: 'Júlia Marques',     email: 'julia@verdemar.br',     company: 'Verdemar',         plan: 'Growth',     status: 'overdue', amount: 1675.0,  seats: 33,  signedUp: '2023-06-28' },
  { id: 'INV-2051', name: 'Kwame Asante',      email: 'kwame@brightloom.gh',   company: 'Brightloom',       plan: 'Enterprise', status: 'paid',    amount: 15750.0, seats: 320, signedUp: '2023-07-15' },
  { id: 'INV-2052', name: 'Lena Vogt',         email: 'lena@nordkap.de',       company: 'Nordkap GmbH',     plan: 'Scale',      status: 'paid',    amount: 7040.0,  seats: 140, signedUp: '2023-08-01' },
  { id: 'INV-2053', name: 'Mateo Ibarra',      email: 'mateo@pampas.ar',       company: 'Pampas Digital',   plan: 'Starter',    status: 'pending', amount: 289.0,   seats: 5,   signedUp: '2023-08-19' },
  { id: 'INV-2054', name: 'Nadia Farouk',      email: 'nadia@zephyrgrid.com',  company: 'Zephyr Grid',      plan: 'Growth',     status: 'paid',    amount: 2980.5,  seats: 59,  signedUp: '2023-09-04' },
  { id: 'INV-2055', name: 'Oskar Lindqvist',   email: 'oskar@fjordline.no',    company: 'Fjordline',        plan: 'Scale',      status: 'draft',   amount: 4410.0,  seats: 88,  signedUp: '2023-09-22' },
  { id: 'INV-2056', name: 'Priya Raghunathan', email: 'priya@indigoloop.in',   company: 'Indigo Loop',      plan: 'Enterprise', status: 'paid',    amount: 21100.0, seats: 505, signedUp: '2023-10-10' },
  { id: 'INV-2057', name: 'Quentin Roche',     email: 'quentin@atelier9.fr',   company: 'Atelier Neuf',     plan: 'Growth',     status: 'overdue', amount: 1320.0,  seats: 26,  signedUp: '2023-10-29' },
  { id: 'INV-2058', name: 'Rosa Delgado',      email: 'rosa@casaverde.mx',     company: 'Casa Verde',       plan: 'Starter',    status: 'paid',    amount: 510.0,   seats: 11,  signedUp: '2023-11-13' },
  { id: 'INV-2059', name: 'Sanjay Mehta',      email: 'sanjay@ferrite.io',     company: 'Ferrite',          plan: 'Scale',      status: 'pending', amount: 6875.0,  seats: 132, signedUp: '2023-12-01' },
  { id: 'INV-2060', name: 'Tuva Antonsen',     email: 'tuva@saltbrygge.dk',    company: 'Saltbrygge',       plan: 'Growth',     status: 'paid',    amount: 2115.0,  seats: 41,  signedUp: '2023-12-20' },
  { id: 'INV-2061', name: 'Ugo Ferrante',      email: 'ugo@viaduct.it',        company: 'Viaduct SRL',      plan: 'Enterprise', status: 'draft',   amount: 16940.0, seats: 368, signedUp: '2024-01-08' },
  { id: 'INV-2062', name: 'Vera Novak',        email: 'vera@modrahora.cz',     company: 'Modrá Hora',       plan: 'Starter',    status: 'overdue', amount: 375.0,   seats: 8,   signedUp: '2024-01-26' },
  { id: 'INV-2063', name: 'Wren Halloway',     email: 'wren@pierglass.co.uk',  company: 'Pierglass',        plan: 'Scale',      status: 'paid',    amount: 5230.0,  seats: 101, signedUp: '2024-02-14' },
];
