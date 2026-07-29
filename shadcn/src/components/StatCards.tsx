import { ArrowDown, ArrowUp, CircleDollarSign, FileText, TrendingDown, Users } from 'lucide-react';
import { stats } from '@data';
import type { StatIcon } from '@data';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
          <Card key={stat.id}>
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="bg-muted text-primary grid size-10 shrink-0 place-items-center rounded-lg">
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-muted-foreground truncate text-sm">{stat.label}</p>
                  <p className="text-2xl leading-tight font-bold">{stat.value}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span
                  className={cn(
                    'inline-flex items-center gap-0.5 rounded-sm px-1.5 py-0.5 text-xs font-semibold',
                    isGood
                      ? 'bg-success/12 text-success'
                      : 'bg-destructive/12 text-destructive',
                  )}
                >
                  <TrendIcon className="size-3" strokeWidth={2.5} />
                  {stat.delta}%
                </span>
                <span className="text-muted-foreground text-xs">{stat.caption}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
