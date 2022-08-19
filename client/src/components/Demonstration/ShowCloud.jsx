import {
  Button, Container, Typography,
} from '@mui/material';
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
        <Button id="btn" variant="outlined">
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
        <Typography id="textMain" variant="h2">
          С чем у вас ассоциируется Эльбрус?
        </Typography>
      </Container>
      <Container id="container2">
        <TagCloud
          minSize={19}
          maxSize={70}
          tags={data}
          className="simple-cloud"
          colorOptions={{
            luminosity: 'dark',
          }}
        />
      </Container>
      <Container id="container3">
        <Typography id="bottomText" variant="h2">Пользователи онлайн:</Typography>
        <Typography id="text">
          <PersonIcon id="icon" fontSize="large" />
          12
        </Typography>
      </Container>
    </Container>
  );
}
