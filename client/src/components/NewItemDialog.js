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

function NewItemDialog({ open, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleAdd() {
    onAdd({
      name,
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
      <DialogTitle id="alert-dialog-slide-title">Nuevo item</DialogTitle>
      <DialogContent
        style={{
          paddingTop: '12px'
        }}
      >
        <TextField
          id="name"
          label="Nombre"
          type="text"
          fullWidth
          variant="outlined"
          style={{
            marginBottom: '24px'
          }}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          id="quantity"
          label="Cantidad inicial"
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

NewItemDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default NewItemDialog;
