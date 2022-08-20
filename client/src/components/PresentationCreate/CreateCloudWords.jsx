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
import { TagCloud } from 'react-tagcloud';
import './CreateCloudWords.nodule.css';
import { Container } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import { Divider } from '@mui/material';

const theme = createTheme();


export default function CreateCloudWords() {
  const data = [
    { value: 'Повтор', count: 1 },
    { value: 'Судоку', count: 1 },
    { value: 'React', count: 5 },
    { value: 'Чекпоинт', count: 2 },
    { value: 'Антон', count: 33 },
    { value: 'Киты', count: 18 },
    { value: 'Стендап', count: 25 },
    { value: 'Гоша', count: 12 },
    { value: 'Javascript', count: 10 },
    { value: 'Express', count: 22 },
    { value: 'Настолки', count: 29 },
    { value: 'Саша', count: 21 },
    { value: 'Пятница', count: 18 },
    { value: 'npm i', count: 4 },
  ];

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
          <Typography id="url">
            Перейдите по ссылке
            {' '}
            <strong>www.onetomany.ru</strong>
            {' '}
            и введите код
            {' '}
            <strong>451241</strong>
          </Typography>
          <Divider />

          <Typography id="quest">
            С чем у вас ассоциируется Эльбрус?
          </Typography>

          <TagCloud
            minSize={15}
            maxSize={40}
            tags={data}
            className="simple-cloud"
            colorOptions={{
              luminosity: 'light',
            }}
            sx={{ mr: 3 }}
          />
          <Container id="container3">
            <Typography id="bottomText" variant="h2">Пользователи онлайн:</Typography>
            <Typography id="bottomText">
              <PersonIcon id="icon" fontSize="large" />
              12
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
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                label="Имя презентации"
                required
                fullWidth
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Введите вопрос"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Добавить и сохранить
              </Button>
              <Button
                type="submit"
                // fullWidth
                variant="contained"
                sx={{ mt: 25, mb: 2 }}
                id="btn2"
                startIcon={<PlayCircleOutlineIcon fontSize="large" />}
              >
                <Typography id="begin">
                  Начать презентацию
                </Typography>
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
