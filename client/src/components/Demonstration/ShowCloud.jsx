/* eslint-disable max-len */
import {
  Button, Card, CardContent, Container, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { TagCloud } from 'react-tagcloud';
import PersonIcon from '@mui/icons-material/Person';
import './ShowCloud.module.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShowCloud() {
  const currentpresent = useSelector((state) => state.currentpresent);
  console.log('currentpresent 3 ======>', currentpresent);

  const words = useSelector((state) => state.words);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch({ type: 'GET_WORDS', payload: currentpresent.payload.id });
    dispatch({ type: 'SET_ROOM', payload: currentpresent.id });
  }, [words]);
  console.log('words ======>', words);
  const navigate = useNavigate();
  const handleClick = () => {
    // dispatch()
    navigate('/presents');
  };

  return (
    <Container id="container">
      <Container id="container1">
        <Button
          onSubmit={handleClick}
          id="submit"
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
            { currentpresent.pincode}
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
          {currentpresent.question}
        </Typography>
      </Container>
      <Box id="container2" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TagCloud
          minSize={19}
          maxSize={70}
          tags={words}
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
