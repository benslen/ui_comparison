import { useRef } from 'react';
import { modalCopy, pageCopy, toastSpecs } from '@data';
import { SectionHeader } from './SectionHeader';
import { useToast } from '../ToastHost';

export function ActionsPanel() {
  const showToast = useToast();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const confirmInvite = () => {
    dialogRef.current?.close();
    showToast(toastSpecs.success);
  };

  return (
    <div className="card bg-base-100 border-base-300 h-full border">
      <div className="card-body p-5">
        <SectionHeader title={pageCopy.actionsTitle} subtitle={pageCopy.actionsSubtitle} />
        <div className="mt-3 flex flex-col gap-2.5">
          <button type="button" className="btn btn-primary" onClick={() => dialogRef.current?.showModal()}>
            Open modal
          </button>
          <button
            type="button"
            className="btn btn-outline btn-success"
            onClick={() => showToast(toastSpecs.success)}
          >
            Success toast
          </button>
          <button
            type="button"
            className="btn btn-outline btn-error"
            onClick={() => showToast(toastSpecs.error)}
          >
            Error toast
          </button>
          <button
            type="button"
            className="btn btn-outline btn-info"
            onClick={() => showToast(toastSpecs.info)}
          >
            Info toast
          </button>
        </div>
      </div>

      {/* daisyUI's modal is the native <dialog> element — the browser handles
          the backdrop, focus trap and Escape key, not the library. */}
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-semibold">{modalCopy.title}</h3>
          <p className="text-base-content/70 py-3 text-sm">{modalCopy.body}</p>
          <fieldset className="fieldset p-0">
            <legend className="fieldset-legend">Email address</legend>
            <input type="email" className="input w-full" placeholder="teammate@example.com" />
          </fieldset>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost">{modalCopy.cancelLabel}</button>
            </form>
            <button type="button" className="btn btn-primary" onClick={confirmInvite}>
              {modalCopy.confirmLabel}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
