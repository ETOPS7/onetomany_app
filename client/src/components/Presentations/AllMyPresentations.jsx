import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Stack from '@mui/material/Stack';
import {
  DataGrid,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from '@mui/x-data-grid-generator';
import { allPresent, deletePresent } from '../../Redux/actions/presentsActions';

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
    <strong>
      {/* {value?.getFullYear() ?? ''} */}
      <Button
        component="button"
        ref={buttonElement}
        touchRippleRef={rippleRef}
        variant="contained"
        size="small"
        style={{ marginLeft: 16 }}
        // Remove button from tab sequence when cell does not have focus
        tabIndex={hasFocus ? 0 : -1}
        onKeyDown={(event) => {
          if (event.key === ' ') {
            // Prevent key navigation when focus is on button
            event.stopPropagation();
          }
        }}
      >
        PLAY
      </Button>
    </strong>
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

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    date: new Date(1979, 0, 1),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    date: new Date(1979, 0, 1),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    date: new Date(1979, 0, 1),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    date: new Date(1979, 0, 1),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    date: new Date(1979, 0, 1),
  },
];

export default function AllMyPresentations() {
  const presents = useSelector((state) => state.presents);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!presents.length) {
      dispatch(allPresent());
    }
  }, []);
  const [rows, setRows] = React.useState(presents);
  /* const [rowModesModel, setRowModesModel] = React.useState({}); */

  const handleAddRow = () => {
    setRows((prevRows) => [...prevRows, createRandomRow()]);
  };

  const handleDeleteClick = (id) => () => {
    dispatch(deletePresent({ id }));
    /* setRows(rows.filter((row) => row.id !== id)); */
  };

  const columns = [
    {
      field: 'date',
      headerName: 'PLAY',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 150,
      renderCell: RenderDate,
    },
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 180,
      editable: true,
    },
    {
      field: 'type_template',
      headerName: 'Type Template',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 180,
      editable: true,
    },
    {
      field: 'user',
      headerName: 'Name Admin',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 180,
      editable: true,
    },
    {
      field: 'createdAt',
      headerName: 'Date Created',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ]
      ,
    },
  ];

  return (
    <Box sx={{
      height: 100,
      width: '60%',
      margin: 'auto',
      /* '& .super-app-theme--header': {
        backgroundColor: 'rgba(255, 7, 0, 0.55)',
      }, */
    }}
    >
      <Stack direction="row" spacing={1}>
        <Button size="small" onClick={handleAddRow}>
          Add a row
        </Button>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: 525,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
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
    </Box>
  );
}
