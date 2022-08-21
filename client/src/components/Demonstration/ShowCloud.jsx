/* eslint-disable max-len */
import {
  Button, Card, CardContent, Container, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { TagCloud } from 'react-tagcloud';
import PersonIcon from '@mui/icons-material/Person';
import './ShowCloud.module.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function ShowCloud() {
  const data = [
    { value: 'Повтор', count: 1 },
    { value: 'Судоку', count: 1 },
    { value: 'React', count: 5 },
    { value: 'Чекпоинт', count: 2 },
    { value: 'Антон', count: 33 },
    { value: 'Киты', count: 18 },
    { value: 'Стендап', count: 25 },
    { value: 'Повтор', count: 5 },
    { value: 'Судоку', count: 1 },
    { value: 'React', count: 45 },
    { value: 'Чекпоинт', count: 1 },
    { value: 'Антон', count: 2 },
    { value: 'Киты', count: 2 },
    { value: 'Стендап', count: 50 },
  ];

  return (
    <Container id="container">
      <Container id="container1">
        <Button
          id="btn"
          variant="outlined"
          sx={{
            mt: 10,
            height: '50px',
            width: '93px',
            '&:hover': { backgroundColor: 'lavender' }
          }}
        >
          Выход
          <ExitToAppIcon />
        </Button>
        <Typography id="url" variant="h2">
          Перейдите по ссылке
          {' '}
          <strong>www.onetomany.com</strong>
          {' '}
          и введите код
          {' '}
          <strong>
            451113
          </strong>
        </Typography>
        <Typography
          id="textMain"
          variant="h2"
          sx={{
            textAlign: 'center',
            fontSize: '50px',
            textDecoration: 'underline solid #80d7ff9a',
            mb: 10
          }}
        >
          С чем у вас ассоциируется Эльбрус?
        </Typography>
      </Container>
      <Box id="container2" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TagCloud
          minSize={19}
          maxSize={70}
          tags={data}
          className="simple-cloud"
          colorOptions={{
            luminosity: 'dark',
          }}
          style={{
            textAlign: 'center',
          }}
        />
      </Box>
      <Container id="container3">
        <Typography
          id="bottomText"
          variant="h6"
          sx={{
            fontWeight: 300,
            textAlign: 'center',
            mt: 10
          }}
        >
          Пользователи онлайн:

        </Typography>
        <Typography id="text45" sx={{ color: 'black', textAlign: 'center' }}>
          <PersonIcon id="icon" fontSize="large" sx={{ paddingTop: '5px' }} viewBox="0 -7.5 24 27" />
          12
        </Typography>
      </Container>
    </Container>
  );
}
