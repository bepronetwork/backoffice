import React from 'react';
import PropTypes from 'prop-types';

import { StyledLink } from './styles';

const Link = ({ to, disabled, children }) => (
  <StyledLink to={to} disabled={disabled}>
    {children}
  </StyledLink>
);

Link.propTypes = {
  to: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Link;
