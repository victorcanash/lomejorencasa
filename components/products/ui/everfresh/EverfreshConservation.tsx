import { useIntl, FormattedMessage } from 'react-intl';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#ecf7dc',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
    <Grid
      container
      className='animate__animated animate__fadeInLeft'
    >
      <Grid
        item
        xs={12}
      >
        <Box
          sx={{
            maxWidth: '600px',
            margin: 'auto',
            textAlign: 'center',
          }}
        >

          <Typography component={"h2"} variant={"h1"} sx={{ mt: 1, mb: 4 }}>
            <FormattedMessage id="home.conservation.title" />
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
                  <StyledTableRow key={row.food}>
                    <TableCell component="th" scope="row">
                      {row.food}
                    </TableCell>
                    <TableCell align="right">{row.noVacuum}</TableCell>
                    <TableCell align="right">{row.vacuumFridge}</TableCell>
                    <TableCell align="right">{row.vacuumFrozen}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography component={"div"} variant={"body1"} sx={{ mt: 2, mb: 2 }}>
            <FormattedMessage id="home.conservation.description1" />
          </Typography> 

          <Typography component={"div"} variant={"body1"} sx={{ mb: 3 }}>
            <FormattedMessage id="home.conservation.description2" />
          </Typography> 

        </Box>
      </Grid>
    </Grid>
  );
};

export default EverfreshConservation;