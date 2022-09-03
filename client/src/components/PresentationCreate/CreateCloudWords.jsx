import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import './CreateCloudWords.nodule.css';
import { Container } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  presentAdd,
  presentAddState,
} from '../../Redux/actions/currentPresentActions';

const theme = createTheme();

export default function CreateCloudWords() {
  const type = useSelector((state) => state.type);
  const currentpresent = useSelector((state) => state.currentpresent);
  const state = useSelector((state1) => state1.state);
  const port = process.env.REACT_APP_SERVER_PATH;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = React.useState({ name: '', question: '', type });

  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onlySaveHandler = (e) => {
    e.preventDefault();
    dispatch(presentAdd(input));
    // window.location = '/presents';
    navigate('/presents');
  };

  const saveAndShowHandler = (e) => {
    e.preventDefault();
    dispatch(presentAddState(input));
  };

  React.useEffect(() => {
    if (state && currentpresent) { navigate(`/${currentpresent.id}/${currentpresent.pincode}`); }
  }, [state]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundColor: 'white',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Typography id="url" variant="h2">
            Перейдите по ссылке
            {' '}
            <strong>{port}</strong>
            {' '}
            и введите pin-код
            {' '}
            <strong>#####</strong>
          </Typography>
          <Divider />

          <Typography
            id="quest"
            sx={{
              textAlign: 'center',
              fontSize: '50px',
              textDecoration: 'underline solid #80d7ff9a',
              mb: 10,
            }}
          >
            {input.question}
          </Typography>
          <Container id="container3">
            <Typography
              id="bottomText"
              sx={{ color: 'black', textAlign: 'center', fontSize: '23px' }}
            >
              <PersonIcon
                id="icon"
                fontSize="large"
                sx={{ paddingTop: '5px' }}
                viewBox="0 -7.5 24 27"
              />
              0
            </Typography>
          </Container>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" id="text">
              Создание презентации
            </Typography>

            <Box
              onSubmit={onlySaveHandler}
              component="form"
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                name="name"
                onChange={inputHandler}
                value={input.name}
                margin="normal"
                label="Имя презентации"
                required
                fullWidth
              />
              <TextField
                name="question"
                onChange={inputHandler}
                value={input.question}
                margin="normal"
                required
                fullWidth
                label="Введите вопрос"
              />
              <Button
                onClick={onlySaveHandler}
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#008964',
                  '&:hover': { backgroundColor: '#3bba92' },
                }}
              >
                Добавить и сохранить
              </Button>
            </Box>
            <Button
              type="submit"
              fullWidth
              onClick={saveAndShowHandler}
              variant="outlined"
              sx={{
                mt: 25,
                mb: 2,
                backgroundColor: 'white',
                color: '#008964',
                height: '100px',
              }}
              id="btn2"
              startIcon={<PlayCircleOutlineIcon />}
            >
              <Typography id="begin">Начать презентацию</Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
