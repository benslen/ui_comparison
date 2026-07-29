import { useState } from 'react';
import type { FormEvent } from 'react';
import { formCopy, planOptions } from '@data';
import { SectionHeader } from './SectionHeader';
import { useToast } from '../ToastHost';

export function CustomerForm() {
  const showToast = useToast();
  const [name, setName] = useState('');
  const [plan, setPlan] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [welcome, setWelcome] = useState(true);
  const [touched, setTouched] = useState(false);

  const nameInvalid = touched && name.trim() === '';
  const planInvalid = touched && plan === '';

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (name.trim() === '' || plan === '') {
      showToast(formCopy.validationToast);
      return;
    }
    showToast(formCopy.successToast);
    setName('');
    setPlan('');
    setTouched(false);
  };

  return (
    <div className="card bg-base-100 border-base-300 h-full border">
      <div className="card-body p-5">
        <SectionHeader title={formCopy.title} subtitle={formCopy.subtitle} />
        <form onSubmit={handleSubmit} noValidate className="mt-3 flex flex-col gap-4">
          <fieldset className="fieldset p-0">
            <legend className="fieldset-legend">{formCopy.nameLabel}</legend>
            <input
              type="text"
              className={`input w-full ${nameInvalid ? 'input-error' : ''}`}
              placeholder={formCopy.namePlaceholder}
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            />
            {nameInvalid && <p className="label text-error">Required</p>}
          </fieldset>

          <fieldset className="fieldset p-0">
            <legend className="fieldset-legend">{formCopy.planLabel}</legend>
            <select
              className={`select w-full ${planInvalid ? 'select-error' : ''}`}
              value={plan}
              onChange={(event) => setPlan(event.currentTarget.value)}
            >
              <option value="" disabled>
                {formCopy.planPlaceholder}
              </option>
              {planOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {planInvalid && <p className="label text-error">Required</p>}
          </fieldset>

          {/* daisyUI has no date picker at all — this is the native browser control. */}
          <fieldset className="fieldset p-0">
            <legend className="fieldset-legend">{formCopy.dateLabel}</legend>
            <input
              type="date"
              className="input w-full"
              value={startDate}
              onChange={(event) => setStartDate(event.currentTarget.value)}
            />
          </fieldset>

          <label className="label cursor-pointer justify-start gap-3">
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-sm"
              checked={welcome}
              onChange={(event) => setWelcome(event.currentTarget.checked)}
            />
            <span className="text-base-content">{formCopy.consentLabel}</span>
          </label>

          <button type="submit" className="btn btn-primary btn-block">
            {formCopy.submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
