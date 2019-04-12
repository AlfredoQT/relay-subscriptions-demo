import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import MainDrawer from '../MainDrawer';
import MainAppBar from '../MainAppBar';

const styles = {
  root: {
    display: 'flex'
  }
};

function RequestsScreen({ classes }) {
  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainAppBar title="Pedidos" />
      <MainDrawer />
    </div>
  );
}

RequestsScreen.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RequestsScreen);
