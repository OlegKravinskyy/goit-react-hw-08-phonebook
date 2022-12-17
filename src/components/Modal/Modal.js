import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import css from './Modal.module.css';

export const ModalEdit = ({
  handleEdit,
  dataId,
  open,
  handleClose,
  setOpen,
  isEdit,
  find,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={css.style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Edit a contact
          </Typography>
          <div id="modal-modal-description" sx={{ mt: 1 }}>
            {dataId ? (
              <form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingButton: 100,
                }}
              >
                <TextField
                  name="name"
                  id="outlined-basic"
                  label="Enter new name"
                  variant="outlined"
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  defaultValue={open && find(dataId).name}
                />
                <div style={{ margin: 10 }}></div>
                <TextField
                  name="phone"
                  id="outlined-basic"
                  label="Enter new phone"
                  variant="outlined"
                  type="tel"
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  defaultValue={open && find(dataId).number}
                />
                <div style={{ margin: 10 }}></div>
                <Button
                  sx={{ marginButton: 100 }}
                  variant="outlined"
                  startIcon={<CheckIcon />}
                  type="submit"
                  onClick={e => handleEdit(e, dataId, setOpen)}
                >
                  Submit
                </Button>
                {isEdit && <LinearProgress />}
              </form>
            ) : (
              <></>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};
