import styled from 'styled-components';

const StyledInput = styled.input`
  display: inline-block;

  border-radius: 6px;

  margin: 10px 0px;
  padding: 10px 20px;

  font-size: 15px;
  font-weight: 500;
  text-align: start;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  border: 1.5px solid var(--border-color);

  transition: box-shadow 350ms ease, background-color 350ms ease;

  &:hover {
    border: 1.5px solid var(--primary-hover-color);
  }

  &:focus {
    border: 1.5px solid var(--primary-hover-color);
    box-shadow: 0 2px 6px 0 rgba(41, 59, 155, 0.23);
  }
`;

export default StyledInput;
