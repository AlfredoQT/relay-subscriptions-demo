import React from 'react';
import PropTypes from 'prop-types';

import { capitalize } from '../../utils/string';
import './Spinner.css';

const SPINNER_SIZES = {
  small: 30,
  medium: 50,
  large: 70
};

const STROKE_WIDTHS = {
  small: 4,
  medium: 5,
  large: 6
};

function Spinner({ size, variant, style }) {
  const baseSize = SPINNER_SIZES[size];
  const baseStrokeWidth = STROKE_WIDTHS[size];
  const basePathSize = baseSize / 2;
  const basePathRadius = `${baseSize / 2 - baseStrokeWidth}px`;
  const pathClass = `${capitalize(size)}SpinnerPath`;
  return (
    <div className={`SpinnerContainer${capitalize(variant)}`} style={style}>
      <svg
        className="Spinner"
        width={baseSize}
        height={baseSize}
        viewBox={`0 0 ${baseSize} ${baseSize}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={pathClass}
          fill="none"
          strokeWidth={baseStrokeWidth}
          strokeLinecap="round"
          cx={basePathSize}
          cy={basePathSize}
          r={basePathRadius}
        />
      </svg>
    </div>
  );
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['fixed', 'centered']),
  style: PropTypes.object
};

Spinner.defaultProps = {
  size: 'small',
  variant: 'fixed',
  style: {}
};

export default Spinner;
