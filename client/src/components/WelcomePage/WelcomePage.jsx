/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-boolean-value */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkPincode } from '../../Redux/actions/currentPresentActions';

export default function WelcomePage() {
  const [input, setInput] = useState([]);
  const [error, setError] = useState(false);
  const [pinCheckErr, setPinCheckErr] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    const test = /^[0-9]+$/.test(input[0]);
    e.preventDefault();
    if (input[0].length < 5 || input[0].length >= 6) {
      setError(true);
    } else if (!test) {
      setError(true);
    } else {
      dispatch(checkPincode({ pincode: input[0] }, setError));
    }
  };
  const pinCheck = useSelector((state) => state.pincodeCheck);
  const crprt = useSelector((state) => state.currentpresent);
  useEffect(() => {
    if (pinCheck) {
      navigate(`/${crprt.id}/${crprt.type}/${crprt.pincode}`);
    }
  }, [pinCheck]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [error]);

  // useEffect(() => {
  //   if (pinCheckErr) {
  //     setTimeout(() => {
  //       setPinCheckErr(false);
  //     }, 2000);
  //   }
  // }, [pinCheckErr]);

  const changeHandler = (e) => {
    setInput((prev) => [e.target.value]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        minHeight: '100vh',
        backgroundColor: '#42a5f4',
        color: 'white',
        backgroundImage: 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
      }}
    >
      <CssBaseline />
      <Container
        component="main"
        sx={{
          mt: 9,
          mb: 2,
          mr: 15,
          ml: { xs: '2px', sm: '70px' },
        }}
        maxWidth="sm"
      >
        <Typography
          sx={{
            pl: 2,
            fontSize: { xs: '20px', sm: '20px' },
            mt: 3,
            ml: '-10px',
          }}
          variant="h5"
          component="h2"
          gutterBottom
        >
          Присоединяйтесь к
        </Typography>
        <Typography
          variant="h2"
          component="h1"
          id="maintext"
          sx={{
            fontSize: { xs: '50px', sm: '80px' },
            pr: { xs: '35px', sm: '100px' },
            display: 'flex',
          }}
          gutterBottom
        >
          <CheckBoxIcon sx={{ fontSize: 'inherit' }} viewBox="2 -2.9 20 25" />
          ONETOMANY
        </Typography>
        <Box sx={{ display: 'flex-column' }}>
          <Typography sx={{ mr: 5 }}>Введите код для голосования</Typography>
          <Box
            onSubmit={submitHandler}
            component="form"
            sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
          >
            {error ? (
              <TextField
                margin="normal"
                required
                fullWidth
                error
                autoFocus
                onChange={changeHandler}
                sx={{
                  borderRadius: '0%',
                  '& .MuiOutlinedInput-root:hover': {
                    '& > fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    '& > fieldset': {
                      borderColor: 'red',
                      color: 'white',
                    },
                  },
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': { border: 'none' },
                  },
                }}
                inputProps={{
                  style: {
                    color: 'white',
                    border: '3px solid #b71c1c',
                    borderRadius: '10px',
                  },
                }}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                // label="введите код для голосования"
                // autoFocus
                onChange={changeHandler}
                sx={{
                  borderRadius: '0%',
                  '& .MuiOutlinedInput-root:hover': {
                    '& > fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    '& > fieldset': {
                      borderColor: 'white',
                      color: 'white',
                    },
                  },
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': {
                      border: 'none',
                    },
                  },
                }}
                inputProps={{
                  style: {
                    color: 'white',
                    border: '3px solid white',
                    // borderRight: '0',
                    borderRadius: '10px',
                  },
                }}
              />
            )}
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                color: 'black',
                '&:hover': { backgroundColor: 'white', color: '#3cba92' },
                mt: '8px',
                ml: 1,
                width: '120px',
                height: '61.5px',
                borderRadius: '10px',
                backgroundColor: 'white',
              }}
              endIcon={<ArrowForwardIosIcon />}
            >
              зайти
            </Button>
          </Box>
          {error && (
            <>
              <Typography>* пин-код введен неправильно</Typography>
              <Typography>* в пин-коде должно быть 5 символов</Typography>
              <Typography>* пин-код должен содержать только цифры</Typography>
            </>
          )}
          <Button
            variant="contained"
            size="large"
            sx={{
              color: 'black',
              border: 'white',
              mt: 25,
              backgroundColor: 'white',
              '&:hover': { backgroundColor: 'white', color: '#3cba92' },
              disableElevation: 'true',
            }}
            onClick={() => navigate('/signin')}
          >
            зайти как админ
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
