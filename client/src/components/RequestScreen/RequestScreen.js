import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';
import { getRequest, updateRequest } from '../../api';
import Spinner from '../Spinner';
import RequestInventoryList from '../RequestInventoryList/RequestInventoryList';

const styles = theme => ({
  backButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  content: {
    padding: theme.spacing.unit * 3,
    marginTop: 64,
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  gutterBottom: {
    marginBottom: 16,
  },
});

const statusMap = {
  toDeliver: 'Por Entregar',
  partialDelivery: 'Entrega Parcial',
  delivered: 'Entregado',
};

function RequestScreen({ classes, history, match }) {
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(null);

  useEffect(() => {
    let abortController = new AbortController();
    getRequest(match.params.id, { signal: abortController.signal }).then(
      requestRes => {
        setRequest(requestRes.request);
        setLoading(false);
      }
    );
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  function handleDeliverComplete() {
    if (request.status === 'delivered') {
      return;
    }
    updateRequest(request.id, {
      status: 'delivered',
      deliveredDate: Date.now(),
    }).then(requestRes => {
      setRequest({
        ...request,
        status: 'delivered',
        deliveredDate: new Date(requestRes.request.deliveredDate),
      });
    });
  }

  function handleDeliverPartial() {
    if (request.status === 'partialDelivery') {
      return;
    }
    updateRequest(request.id, { status: 'partialDelivery' }).then(() => {
      setRequest({ ...request, status: 'partialDelivery' });
    });
  }

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.backButton}
            color="inherit"
            aria-label="Back"
            onClick={history.goBack}
          >
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        {!loading && request === null && (
          <Typography variant="h6">No existe pedido.</Typography>
        )}
        {loading && <Spinner />}
        {!loading && request !== null && (
          <>
            <div className={clsx(classes.spaceBetween, classes.gutterBottom)}>
              <Typography variant="h5">Folio: #{request.folio}</Typography>
              <Typography variant="h5">
                Status: {statusMap[request.status]}
              </Typography>
            </div>
            <Typography variant="h6" gutterBottom>
              Aplicante: {request.applicant.applicantNumber}
            </Typography>
            <Typography variant="headline" gutterBottom>
              Items
            </Typography>
            <RequestInventoryList
              id={request.id}
              delivered={request.status === 'delivered'}
              onDeliverComplete={handleDeliverComplete}
              onDeliverPartial={handleDeliverPartial}
            />
          </>
        )}
      </main>
    </>
  );
}

RequestScreen.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withStyles(styles)(RequestScreen);
