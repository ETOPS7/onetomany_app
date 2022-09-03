import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Grid, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from '@mui/x-data-grid-generator';
import { allPresent, deletePresent } from '../../Redux/actions/presentsActions';
import { onePresSlice } from '../../Redux/actions/currentPresentActions';

let idCounter = 0;
const createRandomRow = () => {
  idCounter += 1;
  return { id: idCounter, name: randomTraderName(), age: randomCreatedDate() };
};

function RenderDate(props) {
  const { hasFocus, value } = props;
  const buttonElement = React.useRef(null);
  const rippleRef = React.useRef(null);

  React.useLayoutEffect(() => {
    if (hasFocus) {
      const input = buttonElement.current?.querySelector('input');
      input?.focus();
    } else if (rippleRef.current) {
      // Only available in @mui/material v5.4.1 or later
      rippleRef.current.stop({});
    }
  }, [hasFocus]);

  return (
    <IconButton
      component="button"
      ref={buttonElement}
      touchRippleRef={rippleRef}
      variant="contained"
      size="small"
      sx={{ fontSize: 'large', ml: '1rem' }}
      // Remove button from tab sequence when cell does not have focus
      tabIndex={hasFocus ? 0 : -1}
      onKeyDown={(event) => {
        if (event.key === ' ') {
          // Prevent key navigation when focus is on button
          event.stopPropagation();
        }
      }}
    >
      <PlayCircleFilledIcon />
    </IconButton>
  );
}

RenderDate.propTypes = {
  /**
   * If true, the cell is the active element.
   */
  hasFocus: PropTypes.bool.isRequired,
  /**
   * The cell value, but if the column has valueGetter, use getValue.
   */
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.instanceOf(Date),
};

// const initialRows = [
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 25,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//     date: new Date(1979, 0, 1),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 36,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//     date: new Date(1979, 0, 1),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 19,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//     date: new Date(1979, 0, 1),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 28,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//     date: new Date(1979, 0, 1),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 23,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//     date: new Date(1979, 0, 1),
//   },
// ];

export default function AllMyPresentations() {
  const presents = useSelector((state) => state.presents);
  const currentpresent = useSelector((state) => state.currentpresent);
  const state = useSelector((state1) => state1.state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!presents.length) {
      dispatch(allPresent());
    }
  }, [presents]);

  React.useEffect(() => {
    if (state && currentpresent) navigate(`/${currentpresent.id}/${currentpresent.pincode}`);
  }, [state]);

  const [rows, setRows] = React.useState(presents);
  /* const [rowModesModel, setRowModesModel] = React.useState({}); */

  const handleAddRow = () => {
    navigate('/templates');
  };

  const handleDeleteClick = (id) => () => {
    dispatch(deletePresent({ id }));
    /* setRows(rows.filter((row) => row.id !== id)); */
  };

  const handlePlayClick = (id, pincode) => () => {
    const [pres] = presents.filter((el) => el.id === id);
    dispatch(onePresSlice(pres));
  };

  const columns = [
    {
      field: 'play',
      type: 'actions',
      headerName: 'PLAY',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'actions',
      // width: 150,
      flex: 1,
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<PlayCircleFilledIcon />}
          label="Delete"
          onClick={handlePlayClick(id)}
          color="inherit"
        />,
      ],
    },
    {
      field: 'name',
      headerName: 'Имя презентации',
      headerClassName: 'super-app-theme--header',
      // width: 180,
      flex: 1,
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Тип шаблона',
      headerClassName: 'super-app-theme--header',
      // width: 180,
      flex: 1,
      editable: true,
    },
    {
      field: 'user',
      headerName: 'Автор',
      headerClassName: 'super-app-theme--header',
      // width: 180,
      flex: 1,
      editable: true,
    },
    {
      field: 'createdAt',
      headerName: 'Дата создания',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      // width: 180,
      flex: 1,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      headerClassName: 'super-app-theme--header',
      // width: 100,
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ],
    },
  ];

  return (
    <>
      <Box
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            margin: '4rem 12rem',
          }}
        >
          <Button
            size="large"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              minWidth: 'max-content',
              backgroundColor: '#3bba92',
              color: 'white',
              '&:hover': { backgroundColor: '#f9d423' },
            }}
            disableElevation
            onClick={handleAddRow}
          >
            Создать презентацию
          </Button>
        </Box>
      </Box>

      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{
          height: 100,
          width: '60%',
          margin: 'auto',
          '& .super-app-theme--header': {
            backgroundColor: '#3bba92',
            color: 'white',
          },
        }}
      >
        <Typography
          sx={{
            mt: '-38px',
            mb: '13px',
            color: '#008964',
            marginRight: 'auto',
            fontSize: '24px',
          }}
        >
          Мои презентации:
        </Typography>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              height: 525,
              width: '100%',
              '& .actions': {
                color: '#3bba92',
              },
              '& .textPrimary': {
                color: '#3bba92',
              },
            }}
          >
            <DataGrid
              sx={{
                boxShadow: 2,
                border: 2,
                borderColor: '#3bba92',
                '& .MuiDataGrid-cell:hover': {
                  color: '#3bba92',
                },
              }}
              rows={presents}
              columns={columns}
              /* componentsProps={{
              toolbar: { setRows },
            }} */
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
