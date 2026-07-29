import { accordionItems, pageCopy } from '@data';
import { SectionHeader } from './SectionHeader';

export function FaqAccordion() {
  return (
    <div className="card bg-base-100 border-base-300 h-full border">
      <div className="p-5 pb-2">
        <SectionHeader
          title={pageCopy.accordionTitle}
          subtitle="Common billing and access questions."
        />
      </div>
      {/* daisyUI accordions are radio inputs styled by CSS — grouping by `name`
          is what makes only one panel open at a time. */}
      <div className="px-5 pb-4">
        {accordionItems.map((item, index) => (
          <div
            key={item.id}
            className="collapse-arrow collapse border-base-300 rounded-none border-b last:border-b-0"
          >
            <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
            <div className="collapse-title px-0 text-sm font-semibold">{item.question}</div>
            <div className="collapse-content px-0">
              <p className="text-base-content/60 text-sm">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
