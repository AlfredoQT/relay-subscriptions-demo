import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

function NewRequestDialog({ open, onClose, onAdd }) {
  const [applicant, setApplicant] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleAdd() {
    onAdd({
      applicant,
      quantity: Number.parseInt(quantity, 10)
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
      <DialogTitle id="alert-dialog-slide-title">Nuevo pedido</DialogTitle>
      <DialogContent
        style={{
          paddingTop: '12px'
        }}
      >
        <TextField
          id="applicant"
          label="Aplicante"
          type="text"
          fullWidth
          variant="outlined"
          style={{
            marginBottom: '24px'
          }}
          value={applicant}
          onChange={e => setApplicant(e.target.value)}
        />
        <TextField
          id="quantity"
          label="Cantidad del pedido"
          type="number"
          fullWidth
          variant="outlined"
          inputProps={{
            min: 0,
            max: 10
          }}
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleAdd} color="primary">
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
}

NewRequestDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default NewRequestDialog;
