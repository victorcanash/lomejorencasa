import { useIntl, FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const EverfreshConservation = () => {
  const intl = useIntl();

  const createData = (
    food: string,
    noVacuum: string,
    vacuumFridge: string,
    vacuumFrozen: string,
  ) => {
    return { food, noVacuum, vacuumFridge, vacuumFrozen };
  }

  const rows = [
    createData(
      intl.formatMessage({ id: 'home.conservation.table.food.1' }),
      `3-5 ${intl.formatMessage({ id: 'home.conservation.table.days' })}`,
      `2-3 ${intl.formatMessage({ id: 'home.conservation.table.weeks' })}`,
      `6-12 ${intl.formatMessage({ id: 'home.conservation.table.months' })}`
    ),
    createData(
      intl.formatMessage({ id: 'home.conservation.table.food.2' }),
      `3-5 ${intl.formatMessage({ id: 'home.conservation.table.days' })}`,
      `2-3 ${intl.formatMessage({ id: 'home.conservation.table.weeks' })}`,
      `6-12 ${intl.formatMessage({ id: 'home.conservation.table.months' })}`
    ),
    createData(
      intl.formatMessage({ id: 'home.conservation.table.food.3' }),
      `1-2 ${intl.formatMessage({ id: 'home.conservation.table.days' })}`,
      `2-3 ${intl.formatMessage({ id: 'home.conservation.table.days' })}`,
      `6-12 ${intl.formatMessage({ id: 'home.conservation.table.months' })}`
    ),
    createData(
      intl.formatMessage({ id: 'home.conservation.table.food.4' }),
      `1-2 ${intl.formatMessage({ id: 'home.conservation.table.days' })}`,
      `2-3 ${intl.formatMessage({ id: 'home.conservation.table.days' })}`,
      `6-12 ${intl.formatMessage({ id: 'home.conservation.table.months' })}`
    ),
    createData(
      intl.formatMessage({ id: 'home.conservation.table.food.5' }),
      `1-2 ${intl.formatMessage({ id: 'home.conservation.table.weeks' })}`,
      `2-32 ${intl.formatMessage({ id: 'home.conservation.table.weeks' })}`,
      `6-12 ${intl.formatMessage({ id: 'home.conservation.table.months' })}`
    ),
    createData(
      intl.formatMessage({ id: 'home.conservation.table.food.6' }),
      `1-2 ${intl.formatMessage({ id: 'home.conservation.table.weeks' })}`,
      `2-3 ${intl.formatMessage({ id: 'home.conservation.table.weeks' })}`,
      `6-12 ${intl.formatMessage({ id: 'home.conservation.table.months' })}`
    ),
    createData(
      intl.formatMessage({ id: 'home.conservation.table.food.7' }),
      `3-5 ${intl.formatMessage({ id: 'home.conservation.table.days' })}`,
      `2-3 ${intl.formatMessage({ id: 'home.conservation.table.weeks' })}`,
      `6-12 ${intl.formatMessage({ id: 'home.conservation.table.months' })}`
    ),
    createData(
      intl.formatMessage({ id: 'home.conservation.table.food.8' }),
      `3-4 ${intl.formatMessage({ id: 'home.conservation.table.weeks' })}`,
      `3-4 ${intl.formatMessage({ id: 'home.conservation.table.months' })}`,
      `6-12 ${intl.formatMessage({ id: 'home.conservation.table.months' })}`
    ),
    createData(
      intl.formatMessage({ id: 'home.conservation.table.food.9' }),
      `1-2 ${intl.formatMessage({ id: 'home.conservation.table.days' })}`,
      `1-2 ${intl.formatMessage({ id: 'home.conservation.table.weeks' })}`,
      `6-12 ${intl.formatMessage({ id: 'home.conservation.table.months' })}`
    ),
  ];

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: 'auto',
      }}
    >
      <Typography component="h2" variant="h1" align="center" mb={3}>
        <FormattedMessage id="home.conservation.title" />
      </Typography>
      <Typography component="div" variant="body1" mb={2}>
        <FormattedMessage id="home.conservation.description" />
      </Typography>
      
      <TableContainer component={Paper}>
        <Table aria-label="time-conservation-table">
          <TableHead>
            <TableRow>
              <TableCell>
                <FormattedMessage 
                  id={'home.conservation.table.head.food'} 
                />
              </TableCell>
              <TableCell align="right">
                <FormattedMessage 
                  id={'home.conservation.table.head.noVacuum'} 
                />
              </TableCell>
              <TableCell align="right">
                <FormattedMessage 
                  id={'home.conservation.table.head.vacuumFridge'} 
                />
              </TableCell>
              <TableCell align="right">
                <FormattedMessage 
                  id={'home.conservation.table.head.vacuumFrozen'} 
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.food}>
                <TableCell component="th" scope="row">
                  {row.food}
                </TableCell>
                <TableCell align="right">{row.noVacuum}</TableCell>
                <TableCell align="right">{row.vacuumFridge}</TableCell>
                <TableCell align="right">{row.vacuumFrozen}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EverfreshConservation;
