import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

export const DelDialog = ({ openDia, handleClickClose, handleClickDel }) => {
  return (
    <div>
      <Dialog
        open={openDia}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you shure delete a contact?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            it is break all
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Nope</Button>
          <Button onClick={handleClickDel} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
