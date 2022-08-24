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
// import Redirect from 'react-router';

export default function ShowCloud() {
  const port = process.env.REACT_APP_SERVER_PATH;
  const currentpresent = useSelector((state) => state.currentpresent);
  console.log('currentpresent 3 ======>', currentpresent);
  const counter = useSelector((state) => state.counteruser) - 1;

  const words = useSelector((state) => state.words);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch({ type: 'GET_WORDS', payload: currentpresent.payload.id });
    dispatch({ type: 'SET_ROOM', payload: currentpresent.id });

    // СЛЕТАЮТ ДАННЫЕ ПО ПРЕЗЕ ПРИ ДОБАВЛЕНИИ СЛОВА,
    // СЛОВА ДОБАВЛЯЮТСЯ ВСЕ ОК,
    // НО ВОПРОС СО СТР ПРЕДСТАВЛЕНИЯ СЛЕТАЕТ!!!
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
  }, [words]);
  console.log('words ======>', words);
  const navigate = useNavigate();
  const handleClick = () => {
    // dispatch()
    // return window.location('/presents');
    navigate('/presents');
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
            '&:hover': { backgroundColor: 'lavender' }
          }}
        >
          Выход
          <ExitToAppIcon />
        </Button>
        <Typography id="url" variant="h2">
          Перейдите по ссылке
          {' '}
          <strong>{port}</strong>
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
        <Typography id="text45" sx={{ color: 'black', textAlign: 'center' }}>
          <PersonIcon id="icon" fontSize="large" sx={{ paddingTop: '5px' }} viewBox="0 -7.5 24 27" />
          {counter}
        </Typography>
      </Container>
    </Container>
  );
}
