# React UI library comparison

Six standalone apps, one per library, all rendering the **same reference screen**
from the **same fake data**. The library is the only variable.

```
mui/       → http://localhost:5001
mantine/   → http://localhost:5002
chakra/    → http://localhost:5003
antd/      → http://localhost:5004
shadcn/    → http://localhost:5005
daisyui/   → http://localhost:5006
data/      → shared fixtures + sort/format helpers (no UI code)
```

## Quick start

```bash
npm install          # root tooling (concurrently)
npm run install:all  # installs all six apps in parallel
npm run dev          # boots all six at once, ports 5001–5006
```

Other scripts: `npm run build:all`, `npm run typecheck:all`, `npm run sizes`
(bundle report), `npm run clean`.

Each app is genuinely standalone — `cd mui && npm install && npm run dev` works
on its own. There is no monorepo tooling, no shared `node_modules`, and no
hoisting, so nothing one library does can affect another's build.

## The reference screen

Every app renders exactly this, in this order:

1. **Sticky top nav** — logo, four links, dark-mode toggle, avatar menu with a
   header block, dividers, and a destructive "Sign out" item
2. **Four stat cards** — icon, label, value, coloured trend chip with an arrow
3. **Data table** — 23 records, sortable on 7 columns, pagination with a
   page-size selector, status badges in four tones
4. **Form** — text input, select, date picker, checkbox, submit; invalid submit
   fires an error toast, valid submit fires a success toast and resets
5. **Modal** — triggered by a button, contains a field, confirm fires a toast
6. **Toasts** — success / error / info
7. **Tabs** (3 panels) and **accordion** (4 items), side by side
8. **Light/dark toggle** driving the whole page

### Shared data

Everything renders from `/data`, imported via a `@data` alias in each app's
Vite + TS config:

| File | Contents |
| --- | --- |
| `types.ts` | Shared types — the contract each app codes against |
| `customers.ts` | 23 customer records (deliberately not a multiple of the page size, so the last page is partial) |
| `content.ts` | Nav, stats, menu, form/tab/accordion/toast copy |
| `table.ts` | Sort comparators, pagination, currency/date formatters, status→tone map |

Sorting and formatting live in `/data` rather than in each app on purpose. Plan
sorts by tier (not alphabetically) and status by urgency, so if each app
reimplemented it they would quietly diverge and the comparison would be
measuring my code, not the libraries.

## Comparison

Bundle sizes are the **production build of this exact screen**, from
`npm run build:all && npm run sizes`. Same app, same data, same feature set.

| | Total gz | JS gz | CSS gz | Components | License | Styling |
| --- | --- | --- | --- | --- | --- | --- |
| **DaisyUI** 5.7 | **80.0 kB** | 66.4 | 13.6 | 61 | MIT | Tailwind plugin, pure CSS classes |
| **shadcn/ui** | **152.6 kB** | 144.9 | 7.8 | ~50 registry / 15 vendored here | MIT | Tailwind v4 + CVA, source in your repo |
| **Chakra UI** 3.36 | **194.3 kB** | 194.3 | 0.0 | 108 | MIT | CSS-in-JS, token/recipe system |
| **Mantine** 9.5 | **202.7 kB** | 166.8 | 35.9 | 127 | MIT | Static CSS + CSS modules, PostCSS preset |
| **MUI** 9.2 | **215.2 kB** | 215.1 | 0.0 | 72 | MIT | Emotion CSS-in-JS, `sx` prop + theme |
| **Ant Design** 6.5 | **344.9 kB** | 343.7 | 1.1 | 67 | MIT | CSS-in-JS (`@ant-design/cssinjs`), design tokens |

**How to read the size column.** MUI and Chakra emit ~0 kB of CSS not because
they are free, but because their styles are generated at runtime from JS — that
cost is already inside their JS number. DaisyUI and shadcn ship real CSS files
and much smaller JS, which is why they win here. Every app is a single unsplit
chunk with no code splitting or tree-shaking tricks; a real app would improve
all six, but not evenly.

**How component counts were derived.** Counted from the installed packages, not
from marketing pages, and collapsed to component *families* so the number means
the same thing everywhere — `Accordion`, `AccordionItem`, and `AccordionTrigger`
count once, since libraries differ wildly in how many sub-parts they export.
Raw export counts are much larger and much less comparable (Chakra exports 824
component symbols that collapse to 108 families). DaisyUI is a count of CSS
component files. **shadcn's ~50 is the one number I could not verify** — its
registry is a network service and it was blocked in this environment (see
below); 15 is what this app actually vendors.

### Honest take on the aesthetic

**Mantine** — my pick for this kind of screen. Sharp, neutral, slightly
tighter than MUI, and it looks like a considered product rather than a theme.
Dark mode is genuinely good out of the box instead of "light mode with the
lights off," which is rarer than it should be. Nothing here fought me.

**shadcn/ui** — the best-looking of the six, and the most work. Restrained
spacing, excellent focus rings, the most tasteful defaults. It also has no
opinion you can't override, because it's your code. The tradeoff is real:
15 files got vendored into `src/components/ui/` and every one is now mine to
maintain. Great if you intend to customise deeply, overkill if you want to ship
a CRUD admin panel this week.

**Chakra UI v3** — clean and modern, close to shadcn in feel with far less
setup. The compound-component API (`Select.Root` → `Control` → `Trigger` →
`Positioner` → `Content` → `Item`) is verbose but predictable, and the escape
hatches are good. Slightly more generic than Mantine — it looks like a design
system, not like a product.

**MUI** — still unmistakably Material. Whether that's good depends entirely on
whether you want your app to look like a Google product; there's no neutral
setting, and theming it into something that *isn't* Material is a real project.
Enormously capable, best-documented of the six, and the most components that
work properly on first use.

**Ant Design** — dense, information-heavy, and unashamedly enterprise. It looks
like an internal admin tool, which is exactly right if that's what you're
building and wrong if it isn't. The default type scale is small and the
information density is high. Also the only library whose table did sorting and
pagination for me — that's a genuine day-one productivity difference. Heaviest
bundle by a wide margin.

**DaisyUI** — the friendliest and the least serious-looking. Rounded, colourful,
slightly playful defaults; the 35 bundled themes are fun but most are unusable
in a real product. Because it's pure CSS it's a third the size of anything else
here, and it composes with Tailwind perfectly. It gives you the *skin* and
nothing else — see below.

### If I had to choose

For a product I intend to maintain: **Mantine**, or **shadcn/ui** if the design
is a differentiator and I have the time. For an internal admin tool where
speed-to-ship wins: **Ant Design**, and I'd accept the bundle. For a marketing
-adjacent app already on Tailwind: **DaisyUI**.

## Where each library made me do the work

This is the part the size table hides. The reference screen needs sorting,
pagination, a toast queue, and a date picker — how much of that you get for free
varies enormously.

| | Table sort/paginate | Toasts | Date picker | Dark mode |
| --- | --- | --- | --- | --- |
| MUI | sort label + paginator, wiring by hand | Snackbar only — queue is yours | `@mui/x-date-pickers` (separate pkg) | `useColorScheme` ✅ |
| Mantine | by hand | `@mantine/notifications` ✅ | `@mantine/dates` (separate pkg) | `useMantineColorScheme` ✅ |
| Chakra | Pagination component, sort by hand | `createToaster` ✅ | ❌ none — native input | ❌ needs `next-themes` |
| Ant Design | **both built in** ✅ | `notification` API ✅ | built in ✅ | theme algorithm swap |
| shadcn/ui | by hand (or add TanStack Table) | ❌ re-exports Sonner | Popover + react-day-picker recipe | ❌ needs `next-themes` |
| DaisyUI | by hand | ❌ CSS classes only — queue is yours | ❌ none — native input | `data-theme` attribute, by hand |

Three of six have no date picker at all. Two have no toast system — DaisyUI
gives you an `.alert` class and a `.toast` position, and the queue, timers, and
dismissal are entirely application code (`daisyui/src/ToastHost.tsx`, ~80 lines
that exist purely because the library doesn't).

## Libraries that fought me during setup

Ordered by how much time each cost.

### Chakra UI — the most friction

- **`useColorMode` no longer exists.** v3 delegates dark mode entirely to
  `next-themes`, a separate dependency. Every Chakra project rewrites the same
  shim (`chakra/src/color-mode.tsx`). For a library this size, shipping no
  first-party colour-mode hook is a strange gap.
- **Custom palettes silently do nothing.** Defining `colors.brand` in the theme
  and then using `colorPalette="brand"` renders unstyled until you *also*
  define `semanticTokens.colors.brand` with `solid`/`contrast`/`fg`/`muted`
  slots. No error, no warning — the prop just has no effect.
- **No date picker**, so the form uses a native `<input type="date">`.
- `extendTheme` is gone in favour of `defineConfig` + `createSystem`, and
  `Select` needs `createListCollection` rather than a plain array.

### Ant Design — three deprecations in one screen

v6 renamed props that v5 code uses everywhere, and they only surface as console
warnings at runtime, not as type errors:

- `<Space direction>` → `orientation`
- `<Collapse expandIconPosition>` → `expandIconPlacement`
- `notification({ message })` → `title`

All three typechecked fine and warned only in the browser. Worth knowing if
you're migrating a v5 codebase. Everything else about antd was the smoothest of
the six — its `Table` alone saved more code than the rest of the library cost.

### shadcn/ui — blocked by the network, by design

`npx shadcn@latest add ...` fetches every component from `ui.shadcn.com` at
install time. **That host is blocked by this environment's network policy**
(npm is allowed; arbitrary hosts are not), so the CLI failed:

```
Request to https://ui.shadcn.com/r/styles/new-york-v4/button.json failed
```

Since shadcn/ui *is* vendored source by design, the 15 components in
`shadcn/src/components/ui/` were written directly against the same primitives
the CLI would have installed (Radix, CVA, `tailwind-merge`, lucide, Sonner,
react-day-picker). The app is fully working and the approach is the one shadcn
intends — but be aware that in an air-gapped or locked-down CI environment the
CLI is a hard dependency on a third-party web service, which the other five
libraries are not.

Also worth noting: `shadcn init` now scaffolds whole projects from templates
rather than adding config to an existing app, so `components.json` was written
by hand.

### Mantine — one rename, one required plugin

- `<Grid gutter>` was renamed to `gap` in v9. Caught at typecheck, 30 seconds.
- Requires `postcss-preset-mantine` **and** `postcss-simple-vars` with the
  breakpoint variables declared; without them the library's own stylesheet
  doesn't compile. Documented, but it's a config file you can't skip.
- Per-package CSS imports (`@mantine/core/styles.css`, then dates, then
  notifications) and the order matters.

### MUI — v9 removed system props

- `<Typography fontWeight={600}>` no longer compiles; system props were dropped
  from `Typography`, so it's `sx={{ fontWeight: 600 }}` now.
- `<ListItemText primaryTypographyProps>` → `slotProps={{ primary: … }}`.
- `Grid` uses `size={{ xs: 12, md: 3 }}` rather than the old `xs={12} md={3}`.

All three were caught at typecheck with clear errors. Annoying to migrate,
painless to write fresh.

### DaisyUI — nothing broke, but it's CSS only

No setup friction at all: one `@plugin "daisyui"` line in the stylesheet and
it works. The cost is elsewhere — there is **no JavaScript in the box**. The
dropdown is CSS `:focus-within` (no focus trap, no Escape handling), the modal
is the native `<dialog>` element, the accordion is grouped radio inputs, and
the toast system is ~80 lines I wrote. That's a fair trade for 80 kB, but
"61 components" means 61 *skins*, not 61 behaviours.

### Toolchain notes (not library-specific)

TypeScript 7 removed `baseUrl`, so every app's `tsconfig.json` uses `paths`
alone — they now resolve relative to the config file, which is what you want
anyway.

## Verification

Each app was checked before moving to the next one: `tsc --noEmit` clean, a
production `vite build`, then loaded in headless Chromium to confirm it renders
the shared data, sorts the table, opens the modal, fires a toast, and toggles
dark mode — **with zero console errors**. All six pass.

The three antd deprecation warnings above were found by that browser check, not
by the compiler, which is exactly why the check exists.
