import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { useRouter } from 'next/router';

import MuiMenu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { logoutUser } from '@core/utils/auth';
import { useMainContext } from '@lib/contexts/MainContext';

interface Props {
  profileAnchorEl: HTMLElement | null;
  setProfileAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  mobileAnchorEl: HTMLElement | null;
  setMobileAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  handleProfileMenuOpen: (event: MouseEvent<HTMLElement>) => void;
  handleMobileMenuOpen: (event: MouseEvent<HTMLElement>) => void;
  profileMenuId: string;
  mobileMenuId: string;
}

export const Menu = (props: Props) => {
  const {
    profileAnchorEl, 
    setProfileAnchorEl, 
    mobileAnchorEl, 
    setMobileAnchorEl, 
    handleProfileMenuOpen, 
    handleMobileMenuOpen, 
    profileMenuId, 
    mobileMenuId
  } = props;

  const { token, user, setLoading, setToken, setUser } = useMainContext();

  const router = useRouter();
  
  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isMobileMenuOpen = Boolean(mobileAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
    handleMobileMenuClose();
  };

  const goToPage = (to: string) => {
    if (router.asPath === to) {
        return;
    }
    router.push(to);
  };

  const onClickProfileBtn = () => {
    handleProfileMenuClose();
    goToPage('/profile');
  };

  const onClickOrdersBtn = () => {
    setLoading(true);
    handleProfileMenuClose();
    goToPage('/orders');
  };

  const onClickSignOutBtn = async () => {
    setLoading(true);
    handleProfileMenuClose();
    await logoutUser(token);
    setToken('');
    setUser(undefined);
    goToPage('/');
  };

  const onClickSignInBtn = () => {
    handleProfileMenuClose();
    goToPage('/login');
  };

  const onClickRegisterBtn = () => {
    handleProfileMenuClose();
    goToPage('/register');
  };

  const renderProfileMenu = (
    <MuiMenu
      anchorEl={profileAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      {
        (token && user) ?
          <div>
            <MenuItem onClick={onClickProfileBtn}>Profile</MenuItem>
            <MenuItem onClick={onClickOrdersBtn}>Orders</MenuItem>
            <MenuItem onClick={onClickSignOutBtn}>Sign out</MenuItem>
          </div>
          
        :
          <div>
            <MenuItem onClick={onClickSignInBtn}>Sign in</MenuItem>
            <MenuItem onClick={onClickRegisterBtn}>Register</MenuItem>
          </div>
      }
    </MuiMenu>
  );

  const renderMobileMenu = (
    <MuiMenu
      anchorEl={mobileAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </MuiMenu>
  );

  return (
    <>
      {renderMobileMenu}
      {renderProfileMenu}
    </>
  );
}
