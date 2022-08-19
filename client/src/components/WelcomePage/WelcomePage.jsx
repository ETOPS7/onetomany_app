/* eslint-disable react/jsx-boolean-value */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.module.css';

export default function WelcomePage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        minHeight: '100vh',
        backgroundColor: '#42a5f4',
        color: 'white',
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 9, mb: 2, ml: 15 }} maxWidth="sm">
        <Typography sx={{ pl: 2 }} variant="h5" component="h2" gutterBottom>
          welcome to
        </Typography>
        <Typography variant="h2" component="h1" id="maintext" gutterBottom>
          <CheckBoxIcon sx={{ fontSize: 'inherit' }} />
          ONETOMANY
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ color: 'white', border: 'white' }}
          onClick={() => navigate('/signin')}
        >
          зайти как админ

        </Button>
      </Container>
    </Box>
  );
}
