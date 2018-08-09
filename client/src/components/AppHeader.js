import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles
} from '@material-ui/core';
import LoginButton from './LoginButton';
import ProfileButton from './ProfileButton';
import MessageButton from './MessageButton';

const styles = {
    flex: {
        flex: 1
    }
};

const AppHeader = ({classes}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit" href="/">
        My React App
      </Typography>
      <div className = {classes.flex} />
      <ProfileButton />
      <MessageButton />
      <LoginButton />
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(AppHeader);
