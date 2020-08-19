import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  color: var(--text-secondary-color);
  font-weight: 500;

  :hover {
    color: var(--primary-hover-color);
  }
`;
