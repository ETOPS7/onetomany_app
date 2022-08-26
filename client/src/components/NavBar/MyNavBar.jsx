import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../Redux/actions/userActions';

const pages = ['Все презентации', 'Создать презентацию', 'Регистрация', 'Авторизация'];
const settings = ['Выход', 'О проекте'];
const urls = ['/presents', '/templates', 'signup', 'signin'];

function MyNavBar() {
  const user = useSelector((state) => state.user);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    // navigate('/');
    window.location = '/';
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#3bba92' }}>
      <Container maxWidth="xl" sx={{ backgroundColor: '#3bba92' }}>
        <Toolbar disableGutters sx={{ backgroundColor: '#3bba92' }}>
          <CheckBoxIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              ONETOMANY
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, textDecoration: 'none' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none', textDecoration: 'none' },
              }}
            >
              {pages.map((page, i) => (
                user.id ? (
                  i < pages.length - 2 && (
                    <Link key={`menumap2${i}`} to={urls[i]} style={{ textDecoration: 'none' }}>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography sx={{ textDecoration: 'none' }} textAlign="center">
                          {page}
                        </Typography>
                      </MenuItem>
                    </Link>
                  )
                ) : (
                  i < pages.length - 2 && (
                    <Link key={`menumap2${i}`} to={urls[i]} style={{ textDecoration: 'none' }}>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography sx={{ textDecoration: 'none' }} textAlign="center">
                          {page}
                        </Typography>
                      </MenuItem>
                    </Link>
                  ))
              ))}
            </Menu>
          </Box>
          <CheckBoxIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              ONETOMANY
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, textDecoration: 'none' }}>
            {pages.map((page, i) => (
              user.id ? (
                i < pages.length - 2 && (
                  <Link key={`menumap${i}`} to={urls[i]} style={{ textDecoration: 'none' }}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2, color: 'white', display: 'block', textDecoration: 'none'
                      }}
                    >
                      {page}
                    </Button>
                  </Link>
                )
              ) : (
                i >= pages.length - 2 && (
                  <Link key={`menumap${i}`} to={urls[i]} style={{ textDecoration: 'none' }}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2, color: 'white', display: 'block', textDecoration: 'none'
                      }}
                    >
                      {page}
                    </Button>
                  </Link>
                )
              )
            ))}
          </Box>
          {user.id && <Typography>{user.name}</Typography>}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Открыть настройки">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ m: 1, bgcolor: 'lavender', color: '#008964' }}>
                  <ManageAccountsIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                user.id ? (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        if (setting === 'Выход') {
                          logoutHandler();
                        }
                        if (setting === 'О проекте') {
                          navigate('/about');
                        }
                      }}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ) : (
                  setting !== 'Выход' && (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => {
                          if (setting === 'Выход') {
                            logoutHandler();
                          }
                          if (setting === 'О проекте') {
                            navigate('/about');
                          }
                        }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  )
                )
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MyNavBar;
