import { useRef } from 'react';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import { allProductsName } from '@core/constants/products';

import { useSearchContext } from '@core/contexts/SearchContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    cursor: 'text',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '39ch',
    },
  },
}));

const SearchBar = () => {
  const { getHref } = useSearchContext();

  const router = useRouter();
  const intl = useIntl();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = useRef<any>(null);

  const handleClick = () => {
    setTimeout(() => inputRef.current?.focus());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnKeyDown = (e: any) => {
    if (e?.key !== 'Enter') {
      return;
    }
    inputRef.current?.blur();
    const categoryName = typeof router.query.category == 'string' ? router.query.category : allProductsName;
    router.push(getHref(categoryName, 1, inputRef.current?.value || ''));
  };

  return (
    <Search onClick={handleClick}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        inputRef={inputRef}
        placeholder={intl.formatMessage({ id: 'header.searchBar.placeholder' })}
        inputProps={{ 
          maxLength: 50,
        }}
        onKeyDown={handleOnKeyDown}
      />
    </Search>
  );
};

export default SearchBar;
