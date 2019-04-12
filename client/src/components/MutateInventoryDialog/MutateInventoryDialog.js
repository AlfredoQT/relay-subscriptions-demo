import React, { useState, useEffect } from 'react';
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

function MutateInventoryDialog({
  open,
  onClose,
  onMutate,
  name: nameProp,
  quantity: quantityProp,
  model: modelProp,
  primaryAction,
  title,
}) {
  const [name, setName] = useState(nameProp);
  const [quantity, setQuantity] = useState(quantityProp);
  const [model, setModel] = useState(modelProp);

  useEffect(() => {
    setName(nameProp);
    setQuantity(quantityProp);
    setModel(modelProp);
  }, [nameProp, quantityProp, modelProp]);

  function handleMutate() {
    onMutate({
      name,
      quantity: Number.parseInt(quantity, 10),
      model,
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
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent
        style={{
          paddingTop: '12px',
        }}
      >
        <TextField
          label="Nombre"
          type="text"
          fullWidth
          variant="outlined"
          style={{
            marginBottom: '1rem',
          }}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label="Cantidad"
          type="number"
          fullWidth
          variant="outlined"
          inputProps={{
            min: 0,
            max: 10,
          }}
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          style={{
            marginBottom: '1rem',
          }}
        />
        <TextField
          label="Modelo"
          fullWidth
          variant="outlined"
          value={model}
          onChange={e => setModel(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleMutate} color="primary">
          {primaryAction}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

MutateInventoryDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onMutate: PropTypes.func.isRequired,
  name: PropTypes.string,
  quantity: PropTypes.number,
  model: PropTypes.string,
  primaryAction: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

MutateInventoryDialog.defaultProps = {
  name: '',
  quantity: 1,
  model: '',
};

export default MutateInventoryDialog;
