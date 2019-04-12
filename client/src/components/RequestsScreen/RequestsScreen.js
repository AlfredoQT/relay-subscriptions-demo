import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import MainDrawer from '../MainDrawer';
import MainAppBar from '../MainAppBar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddRequestDialog from '../AddRequestDialog';

const drawerWidth = 240;

const styles = {
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    marginTop: 64,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: 48,
    right: 48,
  },
};

function RequestsScreen({ classes }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleAdd() {
    setOpen(false);
  }

  return (
    <>
      <AddRequestDialog open={open} onClose={handleClose} onAdd={handleAdd} />
      <CssBaseline />
      <MainAppBar title="Pedidos" />
      <MainDrawer />
      <AppBar position="static" color="default" className={classes.appBar}>
        <Tabs
          value={currentTab}
          onChange={(e, v) => setCurrentTab(v)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Por entregar" />
          <Tab label="Entregados parcial" />
          <Tab label="Entregados" />
        </Tabs>
      </AppBar>
      <Fab
        color="secondary"
        aria-label="Add"
        className={classes.fabButton}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
    </>
  );
}

RequestsScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RequestsScreen);
