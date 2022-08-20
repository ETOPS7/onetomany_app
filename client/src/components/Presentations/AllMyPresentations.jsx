import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { allPresent } from '../../Redux/actions/presentsActions';

function generate(element) {
  return [0, 1, 2].map((value) => React.cloneElement(element, {
    key: value,
  }));
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function AllMyPresentation() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  const presents = useSelector((state) => state.presents);
  React.useEffect(() => {
    dispatch(allPresent());
  }, []);
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <FormGroup row>
        <FormControlLabel
          control={(
            <Checkbox
              checked={dense}
              onChange={(event) => setDense(event.target.checked)}
            />
          )}
          label="Enable dense"
        />
        <FormControlLabel
          control={(
            <Checkbox
              checked={secondary}
              onChange={(event) => setSecondary(event.target.checked)}
            />
          )}
          label="Enable secondary text"
        />
      </FormGroup>
      <Stack sx={{ justifyContent: 'flex-end' }} direction="row" spacing={2}>
        <Button variant="contained" startIcon={<AddIcon />}>
          NEW PRESENTATION
        </Button>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Avatar with text and icon
          </Typography>
          <Demo>
            <List dense={dense}>
              {generate(
                <ListItem
                  secondaryAction={(
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  )}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
