/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-boolean-value */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  Button, TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function WelcomePage() {
  const [input, setInput] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const submitHandler = (e) => {
    const test = /^[0-9]+$/.test(input[0]);
    e.preventDefault();
    if (input[0].length < 5 || input[0].length >= 6) {
      setError(true);
    } else if (!test) {
      setError(true);
    } else {
      navigate('/template/:id');
    }
  };

  const changeHandler = (e) => {
    setInput((prev) => ([e.target.value]));
    console.log(input);
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
          mt: 9, mb: 2, mr: 15, ml: { xs: '2px', sm: '70px' }
        }}
        maxWidth="sm"
      >
        <Typography
          sx={{
            pl: 2, fontSize: { xs: '20px', sm: '34px' }, mt: 3, ml: '-10px'
          }}
          variant="h5"
          component="h2"
          gutterBottom
        >
          welcome to
        </Typography>
        <Typography
          variant="h2"
          component="h1"
          id="maintext"
          sx={{ fontSize: { xs: '50px', sm: '80px' }, pr: { xs: '35px', sm: '100px' }, display: 'flex' }}
          gutterBottom
        >
          <CheckBoxIcon sx={{ fontSize: 'inherit' }} viewBox="2 -2.9 20 25" />
          ONETOMANY
        </Typography>
        <Typography sx={{ mr: 5 }}>Введите код для голосования</Typography>
        <Box onSubmit={submitHandler} component="form" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          {error
            ? (
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
                      borderColor: 'white'
                    }
                  },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    '& > fieldset': {
                      borderColor: 'red',
                      color: 'white'
                    }
                  },
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': { borderColor: 'green' }
                  },
                }}
                inputProps={{
                  style: { color: 'white' }
                }}
              />
            )
            : (
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
                      borderColor: 'white'
                    }
                  },
                  '& .MuiOutlinedInput-root.Mui-focused': {
                    '& > fieldset': {
                      borderColor: 'white',
                      color: 'white'
                    }
                  },
                }}
                inputProps={{
                  style: { color: 'white' }
                }}
              />
            )}
          <Button
            type="submit"
            variant="text"
            size="large"
            sx={{
              color: 'white',
              // '&:hover': { color: 'yellow' },
              mt: '7px',
              width: '120px',
              height: '56px',
              border: '2px dotted white',
              borderLeft: '0'
            }}
          >
            зайти
          </Button>
        </Box>
        {error && (
          <>
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
            mt: 35,
            backgroundColor: 'white',
            '&:hover': { backgroundColor: 'white', color: '#3cba92' },
            disableElevation: 'true',
          }}
          onClick={() => navigate('/signin')}
        >
          зайти как админ

        </Button>
      </Container>
    </Box>
  );
}
