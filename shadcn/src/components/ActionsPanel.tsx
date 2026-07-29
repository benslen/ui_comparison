import { useState } from 'react';
import { modalCopy, pageCopy, toastSpecs } from '@data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SectionHeader } from './SectionHeader';
import { showToast } from '@/toast';

export function ActionsPanel() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="h-full">
      <CardContent className="p-5">
        <SectionHeader title={pageCopy.actionsTitle} subtitle={pageCopy.actionsSubtitle} />
        <div className="mt-4 flex flex-col gap-2.5">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Open modal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{modalCopy.title}</DialogTitle>
                <DialogDescription>{modalCopy.body}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-2">
                <Label htmlFor="invite-email">Email address</Label>
                <Input id="invite-email" type="email" placeholder="teammate@example.com" />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  {modalCopy.cancelLabel}
                </Button>
                <Button
                  onClick={() => {
                    setOpen(false);
                    showToast(toastSpecs.success);
                  }}
                >
                  {modalCopy.confirmLabel}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="text-success border-success/40 hover:bg-success/10"
            onClick={() => showToast(toastSpecs.success)}
          >
            Success toast
          </Button>
          <Button
            variant="outline"
            className="text-destructive border-destructive/40 hover:bg-destructive/10"
            onClick={() => showToast(toastSpecs.error)}
          >
            Error toast
          </Button>
          <Button
            variant="outline"
            className="text-primary border-primary/40 hover:bg-primary/10"
            onClick={() => showToast(toastSpecs.info)}
          >
            Info toast
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
