import React, { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography
} from '@mui/material';
import useAuth from '../../hooks/useAuth';
import CogIcon from '../../icons/Cog';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';


const AccountPopover: React.FC = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const { profile } = useSelector((state: RootState) => state.user);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      handleClose();
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Unable to logout.');
    }
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpen}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Avatar
          src={profile.photoUrl}
          sx={{
            height: 32,
            width: 32
          }}
        />
      </Box>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 240 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            color="textPrimary"
            variant="subtitle2"
          >
            {`${profile.firstName} ${profile.lastName}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            {profile.email}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>          
          <MenuItem
            component={RouterLink}
            to="/app/account"
          >
            <ListItemIcon>
              <CogIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={(
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Settings
                </Typography>
              )}
            />
          </MenuItem>
        </Box>
        <Box sx={{ p: 2 }}>
          <Button
            color="primary"
            fullWidth
            onClick={handleLogout}
            variant="outlined"
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default AccountPopover;
