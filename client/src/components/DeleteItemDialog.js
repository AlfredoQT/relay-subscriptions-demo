import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

function DeleteItemDialog({ open, onClose, onDelete, item }) {
  function handleDelete() {
    onDelete({
      id: item.id
    });
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        Eliminar {!!item && item.name}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Al eliminar este item, se perderá la historia sobre sus pedidos.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleDelete} color="primary">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteItemDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  item: PropTypes.object
};

DeleteItemDialog.defaultProps = {
  item: null
};

export default DeleteItemDialog;
