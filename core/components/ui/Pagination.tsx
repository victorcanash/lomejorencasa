import MuiPagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type PaginationProps = {
  totalPages: number,
  currentPage: number,
  onChangePage: (event: React.ChangeEvent<unknown>, page: number) => void,
}

const Pagination = (props: PaginationProps) => {
  const {
    totalPages,
    currentPage,
    onChangePage,
  } = props;

  return (
    <Stack spacing={2}>
      <MuiPagination
        sx={{
          display: 'flex', 
          flexDirection: 'col',
          justifyContent: 'center',
        }}
        count={totalPages}
        page={currentPage}
        onChange={
          (event: React.ChangeEvent<unknown>, page: number) => {
            if (page !== currentPage) {
              onChangePage(event, page);
            }
          }
        }
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};

export default Pagination;
