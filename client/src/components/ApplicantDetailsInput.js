import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer, graphql } from 'react-relay';

import TextField from '@material-ui/core/TextField';
import environment from '../Environment';
import Spinner from './Spinner';

const query = graphql`
  query ApplicantDetailsInputQuery($input: ApplicantWhereUniqueInput!) {
    applicant(input: $input) {
      id
      semester
      name
    }
  }
`;

function ApplicantDetailsInput({
  registrationNumber,
  onChangeApplicant,
  onChangeName,
  onChangeSemester
}) {
  const [semester, setSemester] = useState(1);
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(false);
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{
        input: {
          registrationNumber
        }
      }}
      render={({ error, props }) => {
        if (error) {
          return <div>{error.message}</div>;
        }
        if (props) {
          // eslint-disable-next-line react/prop-types
          const { applicant } = props;
          if (applicant) {
            onChangeApplicant(applicant.id);
            onChangeSemester(applicant.semester);
            onChangeName(applicant.name);
            setSemester(applicant.semester);
            setName(applicant.name);
            setDisabled(true);
          }
          return (
            <>
              <TextField
                id="name"
                label="Nombre"
                fullWidth
                variant="outlined"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={disabled}
                style={{
                  marginBottom: 24
                }}
                inputProps={{
                  onBlur: () => onChangeName(name)
                }}
              />
              <TextField
                id="semester"
                label="Semestre"
                type="number"
                fullWidth
                variant="outlined"
                inputProps={{
                  min: 1,
                  max: 9,
                  onBlur: () => onChangeSemester(semester)
                }}
                value={semester}
                onChange={e => setSemester(e.target.value)}
                disabled={disabled}
                style={{
                  marginBottom: 24
                }}
              />
            </>
          );
        }
        return (
          <Spinner
            variant="centered"
            style={{
              marginBottom: 24
            }}
          />
        );
      }}
    />
  );
}

ApplicantDetailsInput.propTypes = {
  registrationNumber: PropTypes.string.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeSemester: PropTypes.func.isRequired,
  onChangeApplicant: PropTypes.func.isRequired
};

export default ApplicantDetailsInput;
