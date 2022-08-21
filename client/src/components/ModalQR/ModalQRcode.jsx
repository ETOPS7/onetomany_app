import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import QRCode from 'react-qr-code';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

export default function ModalQRcode() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const location = `${process.env.REACT_APP_CLIENT_PATH}`;

  return (
    <div>
      <Button onClick={handleOpen}>Показать QR-code</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <QRCode
            value={location}
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            viewBox="0 0 256 256"
          />
        </Box>
      </Modal>
    </div>
  );
}
