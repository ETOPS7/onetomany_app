/* eslint-disable max-len */
import { ImageList, ImageListItem, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import GitHubIcon from '@mui/icons-material/GitHub';
import React from 'react';
import Logo from './stack_logo.svg';

export default function AboutPage() {
  return (
    <Box
      sx={{
        bgcolor: '#3bba92',
        pt: 8,
        pb: 6,
        height: '100vh',
      }}
    >
      <Container
        // maxWidth="sm"
        sx={{
          display: 'flex-column',
          justifyContent: 'center',
          alignItems: 'center',
          bgColor: '#3bba92',
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          align="start"
          color="white"
          gutterBottom
          sx={{
            width: '80%',
          }}
        >
          ONETOMANY - онлайн-инструмент для создания презентаций с
          интерактивными элементами
        </Typography>
        <Typography
          variant="h5"
          align="start"
          color="white"
          paragraph
          sx={{ mt: 5, width: '90%', textAlign: 'justify' }}
        >
          Во время показа презентаций участники могут проходить подготовленные
          опросы. Наш сервис подойдёт для демонстрации презентаций на брифингах,
          удалённым командам и для личного использования.
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              mt: 5,
              borderLeft: '2px solid white',
              pl: 2,
              ml: 3,
              width: '80%',
            }}
          >
            Взаимодействие с ONETOMANY происходит в несколько этапов:
            подготовка, вовлечение и получение результата. На первом этапе
            организатор подготавливает презентацию в редакторе из заготовленных
            шаблонов и конфигурирует его под свою задачу.
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
            Этап вовлечения подразумевает под собой показ готовой презентации.
            Презентацию можно демонстрировать как онлайн, так и показывать её
            «живой» аудитории. Во время показа в реальном времени, «живые»
            зрители могут взаимодействовать с презентацией посредством мобильных
            телефонов, проходить опросы, отвечать на вопросы и использовать
            интерактивные элементы.
          </Typography>
        </Typography>
        <Container
          sx={{
            width: '100%',
            height: 100,
            mt: 3,
            mb: 3,
            ml: '-15px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alighItems: 'flex-start',
          }}
        >
          <img src={Logo} alt="React Logo" width="100%" />
          <Typography
            variant="subtitle1"
            align="start"
            color="white"
            component="p"
            sx={{ borderLeft: '2px solid white', pl: 1, mt: 2 }}
          >
            © Приложение разработано командой: Артем, Анна, Дарья, Алмас
          </Typography>
        </Container>
      </Container>
    </Box>
  );
}
