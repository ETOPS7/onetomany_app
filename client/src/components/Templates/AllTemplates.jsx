/* eslint-disable max-len */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import addType from '../../Redux/actions/typeAction';

const tiers = [
  {
    title: 'Рейтинг',
    type: '1',
    color: 'red',
    backgroundImage:
      'https://miro.medium.com/max/1400/1*uhU09i05wLx3sztM2mtT0g.gif',
    description: ['тут что-то написано', 'тут что-то написано'],
    buttonText: 'Выбрать шаблон',
    buttonVariant: 'contained',
  },
  {
    title: 'Облако слов',
    type: 'wordscloud',
    subheader: '⭐⭐⭐',
    backgroundImage:
      'https://community.wolfram.com/c/portal/getImageAttachment?filename=ezgif-284582628.gif&userId=11733',
    color: 'blue',
    description: ['визуализация текста', 'живое обновление'],
    buttonText: 'Выбрать шаблон',
    buttonVariant: 'contained',
    backgroundColor: '#008964',
  },
  {
    title: 'Emoji',
    type: '3',
    price: '30',
    backgroundImage:
      'https://cdn.dribbble.com/users/829077/screenshots/4634872/rate_emoji.gif',
    color: 'pink',
    description: ['тут что-то написано', 'тут что-то написано'],
    buttonText: 'Выбрать шаблон',
    buttonVariant: 'contained',
  },
];

export default function AllTemplates() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlerTypeNavigate = (typever) => {
    dispatch(addType(typever));
    navigate(`/${typever}`);
  };
  return (
    <>
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 5, pb: 6 }}
      >
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Для создания презентации выберите шаблон
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={6} alignItems="flex-end" sx={{ mb: 10 }}>
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) => (theme.palette.mode === 'light'
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700]),
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Box
                      component="img"
                      src={tier.backgroundImage}
                      sx={{
                        height: '200px',
                        width: '380px',
                        justifyContent: 'center',
                      }}
                    />
                    {/* <Typography component="h2" variant="h3" color="text.primary">
                      $
                      {tier.price}
                    </Typography> */}
                    {/* <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography> */}
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      dispatch(addType(tier.type));
                      navigate(`/${tier.type}`);
                    }}
                    fullWidth
                    variant={tier.buttonVariant}
                    sx={{
                      backgroundColor: '#008964',
                      '&:hover': { backgroundColor: '#3bba92' },
                      color: 'white',
                    }}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
