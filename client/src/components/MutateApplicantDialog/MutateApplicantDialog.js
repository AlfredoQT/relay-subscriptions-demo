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

function MutateApplicantDialog({
  open,
  onClose,
  onMutate,
  registrationNumber: registrationNumberProp,
  name: nameProp,
  semester: semesterProp,
  primaryAction,
  id: idProp,
  title,
}) {
  const [id, setId] = useState(idProp);
  const [registrationNumber, setRegistrationNumber] = useState(
    registrationNumberProp
  );
  const [name, setName] = useState(nameProp);
  const [semester, setSemester] = useState(semesterProp);

  useEffect(() => {
    setId(idProp);
    setRegistrationNumber(registrationNumberProp);
    setName(nameProp);
    setSemester(semesterProp);
  }, [idProp, registrationNumberProp, nameProp, semesterProp]);

  function handleMutate() {
    onMutate({
      id,
      registrationNumber,
      name,
      semester: Number.parseInt(semester, 10),
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
          label="Matrícula"
          type="text"
          fullWidth
          variant="outlined"
          style={{
            marginBottom: '1rem',
          }}
          value={registrationNumber}
          onChange={e => setRegistrationNumber(e.target.value)}
        />
        <TextField
          label="Nombre completo"
          fullWidth
          variant="outlined"
          style={{
            marginBottom: '1rem',
          }}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label="Semestre"
          type="number"
          fullWidth
          variant="outlined"
          inputProps={{
            min: 1,
            max: 12,
          }}
          value={semester}
          onChange={e => setSemester(e.target.value)}
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

MutateApplicantDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onMutate: PropTypes.func.isRequired,
  id: PropTypes.string,
  registrationNumber: PropTypes.string,
  name: PropTypes.string,
  semester: PropTypes.number,
  primaryAction: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

MutateApplicantDialog.defaultProps = {
  id: '',
  registrationNumber: '',
  name: '',
  semester: 1,
};

export default MutateApplicantDialog;
