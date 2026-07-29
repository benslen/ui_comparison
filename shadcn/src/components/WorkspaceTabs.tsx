import { tabItems } from '@data';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function WorkspaceTabs() {
  return (
    <Card className="h-full">
      <Tabs defaultValue={tabItems[0].id} className="w-full">
        <div className="p-5 pb-0">
          <TabsList>
            {tabItems.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabItems.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="p-5 pt-4">
            <h2 className="mb-1.5 text-lg font-semibold">{tab.heading}</h2>
            <p className="text-muted-foreground text-sm">{tab.body}</p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {tab.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2.5">
                  <span className="bg-primary size-1.5 shrink-0 rounded-full" />
                  <span className="text-sm">{bullet}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}
