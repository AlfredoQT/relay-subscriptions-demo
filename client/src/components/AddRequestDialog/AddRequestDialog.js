import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Select from 'react-select';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
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

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles = {
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
  container: {
    marginTop: 64,
    padding: 16,
  },
};

function AddRequestDialog({ classes, open, onClose, onAdd }) {
  const [applicantOptions, setApplicantOptions] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedItems, setSelectedItems] = useState([null]);
  const [selectedQuantities, setSelectedQuantities] = useState([1]);
  const [itemOptions, setItemOptions] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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
    setApplicantOptions([]);
    setSelectedApplicant(null);
    setSelectedItems([null]);
    setSelectedQuantities([1]);
    setItemOptions([]);
    return () => {
      applicantResults$.current.unsubscribe();
      itemResults$.current.unsubscribe();
    };
  }, [open]);

  function handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  }

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
    if (selectedApplicant === null) {
      setSnackbarMessage('Aplicante vacío');
      setOpenSnackbar(true);
      return;
    }
    let itemsFilled = true;
    selectedItems.forEach(el => {
      if (el == null) {
        itemsFilled = false;
      }
    });

    if (!itemsFilled) {
      setSnackbarMessage('Items de pedido vacíos');
      setOpenSnackbar(true);
      return;
    }

    let quantitiesFilled = true;

    selectedQuantities.forEach(el => {
      if (el == null) {
        quantitiesFilled = false;
      }
    });

    if (!quantitiesFilled) {
      setSnackbarMessage('Cantidades de pedido vacías');
      setOpenSnackbar(true);
      return;
    }

    let validQuantities = true;

    selectedItems.forEach((el, index) => {
      if (el.quantity < selectedQuantities[index]) {
        validQuantities = false;
      }
    });

    if (!validQuantities) {
      setSnackbarMessage('Cantidades inválidas');
      setOpenSnackbar(true);
      return;
    }

    const result = {
      applicant: {
        id: selectedApplicant.value,
        registrationNumber: selectedApplicant.label,
      },
      items: selectedItems.map((el, index) => ({
        id: el.value,
        quantityRequested: Number.parseInt(selectedQuantities[index], 10),
        quantity: el.quantity,
      })),
    };

    onAdd(result);
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
      quantity: el.quantity,
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
    <>
      <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
        onClose={onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Añadir pedido
            </Typography>
            <Button color="inherit" onClick={handleAdd}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.container}>
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
                />
                {selectedItems[index] != null && (
                  <>
                    <Typography gutterBottom variant="overline">
                      Cantidad en inventario: {selectedItems[index].quantity}
                    </Typography>
                    <TextField
                      label="Cantidad de Pedido"
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
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MySnackbarContentWrapper
          onClose={handleCloseSnackbar}
          variant="error"
          message={snackbarMessage}
        />
      </Snackbar>
    </>
  );
}

AddRequestDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddRequestDialog);
