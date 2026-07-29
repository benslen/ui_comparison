import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { modalCopy, pageCopy, toastSpecs } from '@data';
import { SectionHeader } from './SectionHeader';
import { useToast } from '../ToastHost';

export function ActionsPanel() {
  const showToast = useToast();
  const [open, setOpen] = useState(false);

  const confirmInvite = () => {
    setOpen(false);
    showToast(toastSpecs.success);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <SectionHeader title={pageCopy.actionsTitle} subtitle={pageCopy.actionsSubtitle} />
        <Stack spacing={1.25} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Open modal
          </Button>
          <Button variant="outlined" color="success" onClick={() => showToast(toastSpecs.success)}>
            Success toast
          </Button>
          <Button variant="outlined" color="error" onClick={() => showToast(toastSpecs.error)}>
            Error toast
          </Button>
          <Button variant="outlined" color="info" onClick={() => showToast(toastSpecs.info)}>
            Info toast
          </Button>
        </Stack>
      </CardContent>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{modalCopy.title}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>{modalCopy.body}</DialogContentText>
          <TextField
            autoFocus
            label="Email address"
            placeholder="teammate@example.com"
            type="email"
            size="small"
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)} color="inherit">
            {modalCopy.cancelLabel}
          </Button>
          <Button onClick={confirmInvite} variant="contained">
            {modalCopy.confirmLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
