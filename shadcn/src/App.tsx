import { pageCopy } from '@data';
import { NavBar } from '@/components/NavBar';
import { StatCards } from '@/components/StatCards';
import { CustomerTable } from '@/components/CustomerTable';
import { CustomerForm } from '@/components/CustomerForm';
import { ActionsPanel } from '@/components/ActionsPanel';
import { WorkspaceTabs } from '@/components/WorkspaceTabs';
import { FaqAccordion } from '@/components/FaqAccordion';

export default function App() {
  return (
    <div className="bg-background min-h-screen">
      <NavBar />
      <main className="mx-auto w-full max-w-[1400px] px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">{pageCopy.title}</h1>
          <p className="text-muted-foreground mt-1">{pageCopy.subtitle}</p>
        </div>

        <div className="flex flex-col gap-6">
          <StatCards />

          <CustomerTable />

          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <CustomerForm />
            </div>
            <div className="md:col-span-5">
              <ActionsPanel />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <WorkspaceTabs />
            <FaqAccordion />
          </div>
        </div>
      </main>
    </div>
  );
}
