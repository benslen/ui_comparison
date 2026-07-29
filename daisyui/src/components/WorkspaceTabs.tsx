import { useState } from 'react';
import { tabItems } from '@data';

export function WorkspaceTabs() {
  const [active, setActive] = useState(tabItems[0].id);
  const tab = tabItems.find((item) => item.id === active) ?? tabItems[0];

  return (
    <div className="card bg-base-100 border-base-300 h-full border">
      <div className="p-5 pb-0">
        <div role="tablist" className="tabs tabs-box w-fit">
          {tabItems.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={`tab font-semibold ${active === item.id ? 'tab-active' : ''}`}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 pt-4">
        <h2 className="mb-1.5 text-lg font-semibold">{tab.heading}</h2>
        <p className="text-base-content/60 text-sm">{tab.body}</p>
        <ul className="mt-3 flex flex-col gap-1.5">
          {tab.bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-2.5">
              <span className="bg-primary size-1.5 shrink-0 rounded-full" />
              <span className="text-sm">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
