import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { addWord } from '../../Redux/actions/wordsActions';
import { socketInit } from '../../Redux/actions/wsActions';

const theme = createTheme();

export default function FromAnswerCloud() {
  const crprt = useSelector((state) => state.currentpresent);
  const ws = useSelector((state) => state.ws);
  const status = useSelector((state) => state.state);
  // console.log('currentpresent 5 ======>', crprt);
  // console.log('status 5 ======>', status);
  const [loading, setLoading] = React.useState(false);
  const [hasBeenSent, setHasBeenSent] = React.useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log('data---->', data.set);
    dispatch(
      addWord({
        word: data.get('word'),
        present_id: crprt.id
      })
    );
  };
  const handleClick = () => {
    setLoading(true);
  };

  React.useEffect(() => {
    if (status) {
      setTimeout(() => {
        setHasBeenSent(true);
        dispatch({
          type: 'CHANGE_STATE',
        });
      }, 2000);
      setTimeout(() => {
        setHasBeenSent(false);
      }, 8000);
    }
  }, [status]);
  React.useEffect(() => {
    dispatch(socketInit());
  }, []);
  React.useEffect(() => {
    if (ws) dispatch({ type: 'SET_ROOM', payload: crprt.id });
    return () => {
      dispatch({ type: 'SET_ROOM', payload: null });
    };
  }, [ws]);

  // console.log('Has been sent: ', hasBeenSent);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {crprt.question}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="word"
              label="Введите ваш ответ"
              name="word"
              autoComplete="word"
              autoFocus
            />
            <LoadingButton
              type="submit"
              fullWidth
              onClick={handleClick}
              loading={status}
              loadingPosition="end"
              variant="contained"
              endIcon={hasBeenSent ? <AddTaskIcon /> : <SendIcon />}
              sx={{
                mt: 3, mb: 2, backgroundColor: '#008964', '&:hover': { backgroundColor: '#3bba92' }
              }}
            >
              ОТВЕТИТЬ
            </LoadingButton>
          </Box>
          {/* {status && (
            <Typography component="h1" variant="h5">
              Ваш ответ принят!
            </Typography>
          )} */}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
