import * as React from 'react';
import {
  Button,
  Container,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { TagCloud } from 'react-tagcloud';
import PersonIcon from '@mui/icons-material/Person';
import './ShowCloud.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QrCode2Icon from '@mui/icons-material/QrCode2';
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

export default function ShowCloud() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const qrUrl = `${process.env.REACT_APP_SERVER_PATH}`;
  const port = process.env.REACT_APP_SERVER_PATH;
  const currentpresent = useSelector((state) => state.currentpresent);
  const counter = useSelector((state) => state.counteruser) - 1;

  const words = useSelector((state) => state.words);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'SET_ROOM', payload: currentpresent.id });
  }, [words]);
  useEffect(() => {
    return () => {
      dispatch({ type: 'SET_ROOM', payload: null });
      dispatch({
        type: 'ADD_PRESENT',
        payload: {},
      });
      dispatch({
        type: 'CHANGE_STATE',
      });
    };
  }, []);
  const handleClick = () => {
    window.location = '/presents';
  };

  return (
    <Container id="container">
      <Container id="container1">
        <Button
          onClick={handleClick}
          id="btn"
          variant="outlined"
          sx={{
            mt: 10,
            height: '50px',
            width: '93px',
            // '&:hover': { backgroundColor: 'lavender' },
          }}
        >
          Выход
          <ExitToAppIcon />
        </Button>
        <Button
          onClick={handleOpen}
          id="btn"
          variant="outlined"
          sx={{
            mt: 10,
            ml: '80%',
            color: '#3bba92',
            height: '50px',
            width: '93px',
            '& .MuiButton-outlinedPrimary': {
              '& > fieldset': {
                borderColor: '#3bba92',
              },
            },
          }}
        >
          QR
          <QrCode2Icon />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <QRCode
              value={qrUrl}
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              viewBox="0 0 256 256"
            />
          </Box>
        </Modal>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Перейдите по ссылке
          {' '}
          <strong>{port}</strong>
          {' '}
          и введите код
          {' '}
          <strong>{currentpresent.pincode}</strong>
        </Typography>
        <Typography
          id="textMain"
          variant="h2"
          sx={{
            textAlign: 'center',
            fontSize: '50px',
            textDecoration: 'underline solid #80d7ff9a',
            mb: 10,
          }}
        >
          {currentpresent.question}
        </Typography>
      </Container>
      <Box
        id="container2"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <TagCloud
          minSize={30}
          maxSize={90}
          tags={words}
          className="simple-cloud"
          colorOptions={{
            luminosity: 'dark',
          }}
          style={{
            width: '80%',
            margin: '20px !important',
            textAlign: 'center',
          }}
        />
      </Box>
      <Container id="container3">
        <Typography id="text45" sx={{ color: 'black', textAlign: 'center' }}>
          <PersonIcon
            id="icon"
            fontSize="large"
            sx={{ paddingTop: '5px' }}
            viewBox="0 -7.5 24 27"
          />
          {counter}
        </Typography>
      </Container>
    </Container>
  );
}
