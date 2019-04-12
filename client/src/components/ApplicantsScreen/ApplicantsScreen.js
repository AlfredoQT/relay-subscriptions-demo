import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import MainDrawer from '../MainDrawer';
import MainAppBar from '../MainAppBar';
import { getApplicants, putApplicant, updateApplicant } from '../../api';
import ApplicantsListItem from '../ApplicantsListItem';
import Spinner from '../Spinner';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MutateApplicantDialog from '../MutateApplicantDialog';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginTop: 64,
    position: 'relative',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: 48,
    right: 48,
  },
  applicantsList: {
    listStyleType: 'none',
    '&> li': {
      marginBottom: 16,
    },
  },
});

function ApplicantsScreen({ classes }) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [primaryAction, setPrimaryAction] = useState('Añadir');
  const [title, setTitle] = useState('Nuevo item');
  const [applicantId, setApplicantId] = useState('');
  const [
    applicantRegistrationNumber,
    setApplicantRegistrationNumber,
  ] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [applicantSemester, setApplicantSemester] = useState(1);

  useEffect(() => {
    let abortController = new AbortController();
    getApplicants(null, { signal: abortController.signal }).then(
      applicantsRes => {
        setApplicants(applicantsRes.applicants);
        setLoading(false);
      }
    );
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  function handleOpenNew() {
    setPrimaryAction('Añadir');
    setTitle('Nuevo aplicante');
    setOpen(true);
  }

  function handleMutation(applicant) {
    setOpen(false);
    if (primaryAction === 'Añadir') {
      putApplicant(applicant).then(applicantRes => {
        setApplicants([...applicants, applicantRes.applicant]);
      });
    } else if (primaryAction === 'Actualizar') {
      updateApplicant(applicant, applicant.id).then(applicantRes => {
        const index = applicants.findIndex(
          applicantIndexed => applicantIndexed.id === applicantRes.applicant.id
        );
        if (index !== -1) {
          setApplicants([
            ...applicants.slice(0, index),
            applicantRes.applicant,
            ...applicants.slice(index + 1),
          ]);
        }
      });
    }
  }

  function handleEditRequest(applicant) {
    setApplicantId(applicant.id);
    setApplicantRegistrationNumber(applicant.registrationNumber);
    setApplicantName(applicant.name);
    setApplicantSemester(applicant.semester);
    setPrimaryAction('Actualizar');
    setTitle('Actualizar aplicante');
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setApplicantId('');
    setApplicantRegistrationNumber('');
    setApplicantName('');
    setApplicantSemester(1);
  }

  return (
    <>
      <MutateApplicantDialog
        open={open}
        onClose={handleClose}
        onMutate={handleMutation}
        primaryAction={primaryAction}
        title={title}
        id={applicantId}
        registrationNumber={applicantRegistrationNumber}
        name={applicantName}
        semester={applicantSemester}
      />
      <div className={classes.root}>
        <CssBaseline />
        <MainAppBar title="Inventario" />
        <MainDrawer />
        <main className={classes.content}>
          {loading && <Spinner />}
          {!loading && !applicants.length && (
            <Typography variant="h6">No hay aplicantes.</Typography>
          )}
          {!loading && applicants.length > 0 && (
            <ul className={classes.applicantsList}>
              {applicants.map(applicantMapped => (
                <ApplicantsListItem
                  applicant={applicantMapped}
                  onEdit={() => handleEditRequest(applicantMapped)}
                  key={applicantMapped.id}
                />
              ))}
            </ul>
          )}
        </main>
      </div>
      <Fab
        color="secondary"
        aria-label="Add"
        className={classes.fabButton}
        onClick={handleOpenNew}
      >
        <AddIcon />
      </Fab>
    </>
  );
}

ApplicantsScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApplicantsScreen);
