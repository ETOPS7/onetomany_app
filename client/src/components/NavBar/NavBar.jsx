import { Mail, Notifications, Pets } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));
function NavBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky" id="color">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
          ONETOMANY
        </Typography>
        <Box>
          <Button
            sx={{ color: 'white' }}
            onClick={() => navigate('/presents')}
          >
            Презентации

          </Button>
        </Box>
        <Box>
          <Button
            sx={{ color: 'white' }}
            onClick={() => navigate('/templates')}
          >
            Шаблоны

          </Button>
        </Box>
        <Box>
          <Button
            sx={{ color: 'white' }}
            onClick={() => navigate('/template/:id')}
          >
            Облако слов

          </Button>
        </Box>
        <Box>
          <Button
            sx={{ color: 'white' }}
            onClick={() => navigate('/template')}
          >
            Создать презентацию

          </Button>
        </Box>
        <Box>
          <Button
            sx={{ color: 'white' }}
            onClick={() => navigate('/signin')}
          >
            Авторизоваться

          </Button>
        </Box>
        <Box>
          <Button
            sx={{ color: 'white' }}
            onClick={() => navigate('/signup')}
          >
            Зарегистрироваться

          </Button>
        </Box>
        <Pets sx={{ display: { xs: 'block', sm: 'none' } }} />
        <Icons>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <Typography variant="span">John</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default NavBar;
