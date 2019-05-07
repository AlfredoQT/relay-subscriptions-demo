import React from 'react';
import PropTypes from 'prop-types';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
  },
  grow: {
    flex: 1,
  },
};

const statusMap = {
  toDeliver: 'Por Entregar',
  partialDelivery: 'Entrega Parcial',
  delivered: 'Entregado',
};

const dateFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

function RequestListItem({ request, classes, onClick }) {
  return (
    <li>
      <Paper
        className={classes.container}
        role="link"
        tabIndex={0}
        onClick={onClick}
      >
        <div className={classes.grow}>
          <Typography gutterBottom variant="headline">
            Folio: #{request.folio}
          </Typography>
          <Typography gutterBottom variant="body1">
            Status: {statusMap[request.status]}
          </Typography>
          <Typography gutterBottom variant="body1">
            Aplicante: {request.applicant.applicantNumber}
          </Typography>
          <Typography gutterBottom variant="body1">
            Fecha del pedido:{' '}
            {new Date(request.requestedDate).toLocaleDateString(
              'es-MX',
              dateFormatOptions
            )}
          </Typography>
          <Typography gutterBottom variant="body1">
            Fecha de recolección:{' '}
            {new Date(request.pickupDate).toLocaleDateString(
              'es-MX',
              dateFormatOptions
            )}
          </Typography>
          {request.status !== 'delivered' && (
            <Typography gutterBottom variant="overline">
              Fecha de entrega estimada:{' '}
              {new Date(request.desiredDeliveryDate).toLocaleDateString(
                'es-MX',
                dateFormatOptions
              )}
            </Typography>
          )}
        </div>
        <ChevronRightIcon fontSize="large" />
      </Paper>
    </li>
  );
}

RequestListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(RequestListItem);
