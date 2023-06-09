import { useCallback, useMemo } from 'react';

import { useIntl, FormattedMessage } from 'react-intl';

import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Title from '@core/components/ui/Title';
import MultimediaContainer from '@core/components/multimedia/MultimediaContainer';

import { keywords } from '@lib/config/next-seo.config';

const StyledTableRow = styled(TableRow)(() => ({
  [`&.${tableRowClasses.head}`]: {
    backgroundColor: '#A7AC93',
  },
  ['&:nth-of-type(even)']: {
    backgroundColor: '#ECF7DC',
  },
}));

const Conservation = () => {
  const intl = useIntl();

  const createData = useCallback((
    food: string,
    noVacuum: string,
    vacuumFridge: string,
    vacuumFrozen: string,
  ) => {
    return { food, noVacuum, vacuumFridge, vacuumFrozen };
  }, []);

  const rows = useMemo(() => {
    return [
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
        `2-3 ${intl.formatMessage({ id: 'home.conservation.table.weeks' })}`,
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
  }, [createData, intl]);

  const tableCellSx = useMemo(() => {
    return {
      p: 1,
    };
  }, []);

  return (
    <>
      <Container id="conservation">
        <Box
          maxWidth="sm"
          m="auto"
        >
          <Title
            type="h2"
            texts={{
              title: {
                id: 'home.conservation.title',
              },
            }}
            divider={true}
          />
          <Typography component="div" variant="body1" mb={4}>
            <FormattedMessage id="home.conservation.description" />
          </Typography>
          
          <TableContainer component={Paper}>
            <Table aria-label="time-conservation-table">
              <TableHead>
                <StyledTableRow>
                  <TableCell sx={tableCellSx}>
                    <FormattedMessage 
                      id={'home.conservation.table.head.food'} 
                    />
                  </TableCell>
                  <TableCell sx={tableCellSx}>
                    <FormattedMessage 
                      id={'home.conservation.table.head.noVacuum'} 
                    />
                  </TableCell>
                  <TableCell sx={tableCellSx}>
                    <FormattedMessage 
                      id={'home.conservation.table.head.vacuumFridge'} 
                    />
                  </TableCell>
                  <TableCell sx={tableCellSx}>
                    <FormattedMessage 
                      id={'home.conservation.table.head.vacuumFrozen'} 
                    />
                  </TableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.food}>
                    <TableCell component="th" scope="row" sx={tableCellSx}>
                      {row.food}
                    </TableCell>
                    <TableCell sx={tableCellSx}>{row.noVacuum}</TableCell>
                    <TableCell sx={tableCellSx}>{row.vacuumFridge}</TableCell>
                    <TableCell sx={tableCellSx}>{row.vacuumFrozen}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography component="div" variant="body1" mt={4}>
            <FormattedMessage id="home.conservation.comments" />
          </Typography>
        </Box>
      </Container>

      <MultimediaContainer
        type="default"
        source={{
          src: 'v1680888620/laenvasadora/HOME%20PAGE/BANNER/FOTO_PRODUCTO_QUESO_eihinu.jpg',
          alt: keywords.vacuumMachine.main,
        }}
      />
    </>
  );
};

export default Conservation;
