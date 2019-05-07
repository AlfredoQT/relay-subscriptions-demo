import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  gutterBottom: {
    marginBottom: 16,
  },
};

function RequestInventoryListItem({ item, classes, delivered, onDeliver }) {
  function handleDelivery(quantity) {
    return function() {
      onDeliver({
        ...item,
        quantityDelivered: item.quantityDelivered + quantity,
        quantityToIncrease: quantity,
      });
    };
  }

  return (
    <li>
      <Paper className={classes.container}>
        <div className={classes.grow}>
          <Typography gutterBottom variant="headline">
            Nombre: {item.name}
          </Typography>
          <Typography gutterBottom variant="body1">
            Modelo: {item.model}
          </Typography>
          <Typography gutterBottom variant="body1">
            Cantidad Pedida: {item.quantityRequested}
          </Typography>
          <Typography gutterBottom variant="body1">
            Cantidad Regresada: {item.quantityDelivered}
          </Typography>
          <Typography variant="overline">
            Regresado:{' '}
            {item.quantityDelivered === item.quantityRequested ? 'Sí' : 'No'}
          </Typography>
        </div>
        {!delivered && item.quantityDelivered < item.quantityRequested && (
          <div className={classes.actions}>
            <Button
              variant="contained"
              color="primary"
              className={classes.gutterBottom}
              onClick={handleDelivery(
                item.quantityRequested - item.quantityDelivered
              )}
            >
              Regresar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDelivery(1)}
            >
              Regresar Uno
            </Button>
          </div>
        )}
      </Paper>
    </li>
  );
}

RequestInventoryListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  delivered: PropTypes.bool.isRequired,
  onDeliver: PropTypes.func,
};

RequestInventoryListItem.defaultProps = {
  onDeliver: () => {},
};

export default withStyles(styles)(RequestInventoryListItem);
