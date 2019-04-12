import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Select from 'react-select';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import uuidv4 from 'uuid/v4';
import {
  filter,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

const itemKeys = [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()];

const styles = {
  dialogPaper: {
    overflow: 'visible',
    minWidth: 600,
  },
  dialogContent: {
    overflow: 'visible',
    paddingTop: 12,
  },
  formGroup: {
    marginBottom: 16,
  },
  itemContainer: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  addButton: {
    marginBottom: 4,
  },
};

function AddRequestDialog({ classes, open, onClose, onAdd }) {
  const [applicantOptions, setApplicantOptions] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedItems, setSelectedItems] = useState([null]);
  const [selectedQuantities, setSelectedQuantities] = useState([1]);
  const [itemOptions, setItemOptions] = useState([]);

  const fetchApplicantSubject$ = useRef(new Subject());
  const applicantResults$ = useRef(
    fetchApplicantSubject$.current.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter(q => q.length > 0),
      switchMap(q =>
        ajax
          .getJSON(
            `http://localhost:4001/applicants?q=${encodeURIComponent(q)}`
          )
          .pipe(map(response => response.applicants))
      )
    )
  );
  const fetchItemSubject$ = useRef(new Subject());
  const itemResults$ = useRef(
    fetchItemSubject$.current.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter(q => q.length > 0),
      switchMap(q =>
        ajax
          .getJSON(`http://localhost:4001/items?q=${encodeURIComponent(q)}`)
          .pipe(map(response => response.items))
      )
    )
  );

  useEffect(() => {
    applicantResults$.current.subscribe(handleApplicantDataChange);
    itemResults$.current.subscribe(handleItemDataChange);
    return () => {
      applicantResults$.current.unsubscribe();
      itemResults$.current.unsubscribe();
    };
  }, [open, applicantResults$]);

  function handleApplicantDataChange(data) {
    const mapped = data.map(el => ({
      value: el.id,
      label: el.registrationNumber,
    }));
    setApplicantOptions(mapped);
  }

  function handleApplicantInputChange(value, action) {
    if (action.action === 'pop-value') return;
    fetchApplicantSubject$.current.next(value);
  }

  function handleApplicantChange(value, action) {
    if (action.action === 'pop-value') return;
    setSelectedApplicant(value);
  }

  function handleAdd() {
    onAdd();
  }

  function handleAddItem() {
    if (selectedItems.length >= 5) return;
    setSelectedItems([...selectedItems, null]);
    setSelectedQuantities([...selectedQuantities, 1]);
  }

  function handleItemDataChange(data) {
    const mapped = data.map(el => ({
      value: el.id,
      label: el.name,
    }));
    setItemOptions(mapped);
  }

  function handleItemInputChange(value, action) {
    if (action.action === 'pop-value') return;
    fetchItemSubject$.current.next(value);
  }

  function handleItemChange(index) {
    return (value, action) => {
      if (action.action === 'pop-value') return;
      setSelectedItems([
        ...selectedItems.slice(0, index),
        value,
        ...selectedItems.slice(index + 1),
      ]);
    };
  }

  function handleItemQuantityChange(index, value) {
    setSelectedQuantities([
      ...selectedQuantities.slice(0, index),
      value,
      ...selectedQuantities.slice(index + 1),
    ]);
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        className: classes.dialogPaper,
      }}
    >
      <DialogTitle id="alert-dialog-slide-title">Añadir pedido</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <div className={classes.formGroup}>
          <Typography variant="overline">Aplicante</Typography>
          <Select
            options={applicantOptions}
            noOptionsMessage={() => 'No hay resultados...'}
            placeholder="Busca aplicante por matrícula..."
            onInputChange={handleApplicantInputChange}
            onChange={handleApplicantChange}
            isClearable
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.addButton}
          onClick={handleAddItem}
        >
          Añadir item
        </Button>
        <Typography variant="caption" gutterBottom>
          Puedes agregar hasta 5 items
        </Typography>
        {selectedItems.map((el, index) => (
          <div key={itemKeys[index]}>
            <div>
              <Typography variant="overline">Item {index + 1}</Typography>
              <Select
                options={itemOptions}
                noOptionsMessage={() => 'No hay resultados...'}
                placeholder="Busca item por nombre..."
                onInputChange={handleItemInputChange}
                onChange={handleItemChange(index)}
                isClearable
                className={classes.formGroup}
              />
              {selectedItems[index] != null && (
                <TextField
                  label="Cantidad"
                  type="number"
                  fullWidth
                  variant="outlined"
                  inputProps={{
                    min: 0,
                    max: 10,
                  }}
                  value={selectedQuantities[index]}
                  onChange={e =>
                    handleItemQuantityChange(index, e.target.value)
                  }
                  style={{
                    marginBottom: '1rem',
                  }}
                />
              )}
            </div>
          </div>
        ))}
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

AddRequestDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddRequestDialog);
