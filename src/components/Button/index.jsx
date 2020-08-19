import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import { StyledButton } from './styles';

const Button = ({ variant, type, loading, disabled, children }) => (
  <StyledButton
    className={variant ? variant : 'primary'}
    disabled={disabled}
    type={type}
    loading={loading}
  >
    {loading ? (
      <CircularProgress size={20} color="inherit" thickness={5} />
    ) : (
      children
    )}
  </StyledButton>
);

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
  type: PropTypes.oneOf(['submit']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
