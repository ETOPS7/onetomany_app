import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { addWord } from '../../Redux/actions/wordsActions';
import { socketInit } from '../../Redux/actions/wsActions';

const theme = createTheme();

export default function FromAnswerCloud() {
  const [input, setInput] = React.useState([]);
  const [error, setError] = React.useState(false);
  // const currentpresent = useSelector((state) => state.currentpresent);
  const crprt = useSelector((state) => state.currentpresent);
  const [loading, setLoading] = React.useState(false);
  const ws = useSelector((state) => state.ws);
  const status = useSelector((state) => state.state);
  const navigate = useNavigate();
  const [hasBeenSent, setHasBeenSent] = React.useState(false);
  const dispatch = useDispatch();
  function checkWord(arr) {
    const res = arr.join(' ').split(' ');
    if (res.length === 1) {
      return true;
    }
    return false;
  }

  const changeHandler = (e) => {
    setInput((prev) => [e.target.value]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (checkWord(input)) {
      dispatch(
        addWord({
          word: data.get('word').toUpperCase(),
          present_id: crprt.id,
        })
      );
      setInput('');
    } else {
      setError(true);
    }
  };

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [error]);

  const handleClick = () => {
    setLoading(true);
  };

  const handleExitClick = () => {
    window.location = '/';
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
    if (!crprt.id) navigate('/');
  }, []);

  React.useEffect(() => {
    if (ws) dispatch({ type: 'SET_ROOM', payload: crprt.id });
    return () => {
      dispatch({ type: 'SET_ROOM', payload: null });
    };
  }, [ws]);

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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {error ? (
              <>
                <TextField
                  margin="normal"
                  required
                  error
                  fullWidth
                  id="word"
                  label="Некорректные данные"
                  name="word"
                  onChange={changeHandler}
                  autoComplete="word"
                  autoFocus
                />
                <Typography sx={{ color: '#b71c1c' }}>
                  *в поле ответа можно ввести только одно слово
                </Typography>
              </>
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="word"
                label="Введите ваш ответ"
                name="word"
                onChange={changeHandler}
                autoComplete="word"
                autoFocus
              />
            )}
            <LoadingButton
              type="submit"
              fullWidth
              onClick={handleClick}
              loading={status}
              loadingPosition="end"
              variant="contained"
              endIcon={hasBeenSent ? <AddTaskIcon /> : <SendIcon />}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#008964',
                '&:hover': { backgroundColor: '#3bba92' },
              }}
            >
              ОТВЕТИТЬ
            </LoadingButton>
            <Button
              onClick={handleExitClick}
              id="btn"
              variant="outlined"
              sx={{
                mt: 10,
                height: '50px',
                width: '93px',
              }}
            >
              Выход
              <ExitToAppIcon />
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
