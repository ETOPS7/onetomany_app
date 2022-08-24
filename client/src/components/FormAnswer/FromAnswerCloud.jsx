import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { addWord } from '../../Redux/actions/wordsActions';

const theme = createTheme();

export default function FromAnswerCloud() {
  const [input, setInput] = useState([]);
  const [error, setError] = useState(false);
  const currentpresent = useSelector((state) => state.currentpresent);

  function checkWord(arr) {
    const res = arr.join(' ').split(' ');
    if (res.length === 1) {
      return true;
    }
    return false;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!checkWord(input)) {
      setError(true);
      console.log('error');
    } else {
      dispatchEvent(
        addWord({
          word: data.get('word'),
          present_id: currentpresent.payload.id
        })
      );
      setInput('');
    }
  };

  const changeHandler = (e) => {
    setInput((prev) => ([e.target.value]));
    console.log(input);
  };

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
            С чем у вас ассоциируется Эльбрус?
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {error
              ? (
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
                  <Typography sx={{ color: '#b71c1c' }}>*в поле ответа можно ввести только одно слово</Typography>
                </>
              )
              : (
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3, mb: 2, backgroundColor: '#008964', '&:hover': { backgroundColor: '#3bba92' }
              }}
            >
              ОТВЕТИТЬ
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
