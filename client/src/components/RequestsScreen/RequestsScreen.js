import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import MainDrawer from '../MainDrawer';
import MainAppBar from '../MainAppBar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddRequestDialog from '../AddRequestDialog';
import { updateItem, putRequest, getRequests } from '../../api';
import Spinner from '../Spinner';
import RequestListItem from '../RequestListItem';

const drawerWidth = 240;

const styles = theme => ({
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
  content: {
    flexGrow: 1,
    marginLeft: drawerWidth,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    position: 'relative',
    marginTop: 64 + 48,
  },
  requestsList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    '&> li': {
      marginBottom: 16,
    },
  },
});

const filter = ['toDeliver', 'partialDelivery', 'delivered'];

function RequestsScreen({ classes, history }) {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let abortController = new AbortController();
    getRequests({ signal: abortController.signal }).then(requestsRes => {
      setRequests(requestsRes.requests);
      setLoading(false);
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleAdd(data) {
    setOpen(false);
    const itemUpdates = data.items.map(el =>
      updateItem(
        {
          quantity: el.quantity - el.quantityRequested,
        },
        el.id
      )
    );
    await Promise.all(itemUpdates);

    const response = await putRequest({
      applicant: data.applicant,
      items: data.items.map(el => ({
        id: el.id,
        quantityRequested: el.quantityRequested,
        quantityDelivered: 0,
      })),
      pickupDate: data.pickupDate,
      desiredDeliveryDate: data.desiredDeliveryDate,
    });

    setRequests([response.request, ...requests]);
  }

  function handleRequestClick(id) {
    return function() {
      history.push(`/pedidos/${id}`);
    };
  }

  const filteredRequests = requests.filter(
    el => el.status === filter[currentTab]
  );

  return (
    <>
      <AddRequestDialog open={open} onClose={handleClose} onAdd={handleAdd} />
      <CssBaseline />
      <MainAppBar title="Pedidos" />
      <MainDrawer />
      <AppBar position="fixed" color="default" className={classes.appBar}>
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
      <main className={classes.content}>
        {loading && <Spinner />}
        {!loading && !requests.length && (
          <Typography variant="h6">No hay pedidos.</Typography>
        )}
        {!loading && requests.length > 0 && !filteredRequests.length && (
          <Typography variant="h6">
            No hay pedidos en esta categoría.
          </Typography>
        )}
        {!loading && requests.length > 0 && filteredRequests.length > 0 && (
          <ul className={classes.requestsList}>
            {filteredRequests.map(requestMapped => (
              <RequestListItem
                key={requestMapped.id}
                request={requestMapped}
                onClick={handleRequestClick(requestMapped.id)}
              />
            ))}
          </ul>
        )}
      </main>
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
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(RequestsScreen);
