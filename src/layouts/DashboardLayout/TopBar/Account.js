import React, {
  useRef,
  useState
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  Box,
  ButtonBase,
  Hidden,
  Menu,
  MenuItem,
  Typography,
  makeStyles
} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1)
  },
  popover: {
    width: 200
  }
}));

const Account = () => {
  const classes = useStyles();
  const history = useHistory();
  const ref = useRef(null);
  const { user, logout} = useAuth();
  
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      await logout();
      history.push('/login');
    } catch (err) {
      enqueueSnackbar('Unable to logout', {
        variant: 'error'
      });
    }
  };
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
        ref={ref}
      >
        <Avatar
          alt="User"
          className={classes.avatar}
          // src={user.user_info.image}
        />
        <Hidden smDown>
          <Typography
            variant="h6"
            color="inherit"
          >
            {user.profile.user.first_name}
          </Typography>
        </Hidden>
      </Box>
      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        keepMounted
        PaperProps={{ className: classes.popover }}
        getContentAnchorEl={null}
        anchorEl={ref.current}
        open={isOpen}
      >
        <MenuItem
          component={RouterLink}
          to="/profile"
        >
          Profile
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="account"
        >
          Account
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default Account;
