import { accordionItems, pageCopy } from '@data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { SectionHeader } from './SectionHeader';

export function FaqAccordion() {
  return (
    <Card className="h-full">
      <div className="p-5 pb-1">
        <SectionHeader
          title={pageCopy.accordionTitle}
          subtitle="Common billing and access questions."
        />
      </div>
      <div className="px-5 pb-4">
        <Accordion type="single" collapsible defaultValue={accordionItems[0].id}>
          {accordionItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Card>
  );
}
