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
  informationContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
};

function ApplicantsListItem({ applicant, classes, onEdit }) {
  return (
    <li>
      <Paper className={classes.container} role="link" tabIndex={0}>
        <div className={classes.informationContainer}>
          <Typography gutterBottom variant="headline">
            {applicant.registrationNumber}
          </Typography>
          <Typography gutterBottom variant="body1">
            {applicant.name}
          </Typography>
          <Typography variant="body1">
            {'Semestre:'} {applicant.semester}
          </Typography>
        </div>
        <Button variant="contained" color="primary" onClick={onEdit}>
          Editar
        </Button>
      </Paper>
    </li>
  );
}

ApplicantsListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  applicant: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default withStyles(styles)(ApplicantsListItem);
