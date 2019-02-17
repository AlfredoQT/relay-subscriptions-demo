import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ApplicantDetailsInput from './ApplicantDetailsInput';
import CreateApplicant from '../mutations/CreateApplicant';
import environment from '../Environment';

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

function NewRequestDialog({ open, onClose, onAdd }) {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [name, setName] = useState(null);
  const [semester, setSemester] = useState(null);
  const [applicant, setApplicant] = useState(null);
  const [showApplicantDetails, setShowApplicantDetails] = useState(false);
  const [quantity, setQuantity] = useState(1);

  function handleAdd() {
    if (!name || quantity <= 0 || !registrationNumber || !semester) {
      return;
    }
    let applicantId = applicant;
    if (applicantId) {
      onAdd({
        quantity: Number.parseInt(quantity, 10),
        applicant: applicantId
      });
      reset();
      return;
    }
    CreateApplicant(
      environment,
      {
        name,
        semester,
        registrationNumber
      },
      response => {
        onAdd({
          quantity: Number.parseInt(quantity),
          applicant: response.createApplicant.applicant.id
        });
        reset();
      }
    );
  }

  function handleClose() {
    reset();
    onClose();
  }

  function reset() {
    setRegistrationNumber('');
    setQuantity(1);
    setShowApplicantDetails(false);
  }

  function handleRegistrationNumberChange(e) {
    if (showApplicantDetails) {
      setShowApplicantDetails(false);
    }
    setRegistrationNumber(e.target.value);
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
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
          id="registrationNumber"
          label="Matrícula"
          type="text"
          fullWidth
          variant="outlined"
          style={{
            marginBottom: '24px'
          }}
          value={registrationNumber}
          onChange={handleRegistrationNumberChange}
          inputProps={{
            onBlur: () => setShowApplicantDetails(true)
          }}
        />
        {showApplicantDetails ? (
          <ApplicantDetailsInput
            registrationNumber={registrationNumber}
            onChangeApplicant={setApplicant}
            onChangeName={setName}
            onChangeSemester={setSemester}
          />
        ) : null}
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
        <Button onClick={handleClose} color="primary">
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
