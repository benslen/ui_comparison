import { ArrowDown, ArrowUp, CircleDollarSign, FileText, TrendingDown, Users } from 'lucide-react';
import { stats } from '@data';
import type { StatIcon } from '@data';

const icons: Record<StatIcon, typeof Users> = {
  revenue: CircleDollarSign,
  customers: Users,
  orders: FileText,
  churn: TrendingDown,
};

export function StatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = icons[stat.icon];
        const isGood = stat.invertGood ? stat.direction === 'down' : stat.direction === 'up';
        const TrendIcon = stat.direction === 'up' ? ArrowUp : ArrowDown;

        return (
          <div key={stat.id} className="card bg-base-100 border-base-300 border">
            <div className="card-body p-5">
              <div className="flex items-start gap-3">
                <div className="bg-base-200 text-primary grid size-10 shrink-0 place-items-center rounded-lg">
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-base-content/60 truncate text-sm">{stat.label}</p>
                  <p className="text-2xl leading-tight font-bold">{stat.value}</p>
                </div>
              </div>

              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`badge badge-sm gap-0.5 font-semibold ${
                    isGood ? 'badge-success' : 'badge-error'
                  } badge-soft`}
                >
                  <TrendIcon className="size-3" strokeWidth={2.5} />
                  {stat.delta}%
                </span>
                <span className="text-base-content/60 text-xs">{stat.caption}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
