import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
  },
  countModifierContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 16,
  },
  informationContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  grow: {
    flex: 1,
  },
  quantityContainer: {
    padding: 8,
    margin: '0 8px',
  },
};

function InventoryListItem({ item, classes, onEdit, onModifyQuantity }) {
  return (
    <li>
      <Paper className={classes.container} role="link" tabIndex={0}>
        <div className={classes.countModifierContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onModifyQuantity(-1)}
          >
            -
          </Button>
          <Paper className={classes.quantityContainer}>
            <span>{item.quantity}</span>
          </Paper>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onModifyQuantity(1)}
          >
            +
          </Button>
        </div>
        <div className={classes.grow}>
          <Typography gutterBottom variant="headline">
            {item.name}
          </Typography>
          <Typography variant="body1">{item.model}</Typography>
        </div>
        <Button variant="contained" color="primary" onClick={onEdit}>
          Editar
        </Button>
      </Paper>
    </li>
  );
}

InventoryListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onModifyQuantity: PropTypes.func.isRequired,
};

export default withStyles(styles)(InventoryListItem);
