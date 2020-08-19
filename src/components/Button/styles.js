import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const StyledButton = styled(Button)`
  &.MuiButton-root {
    display: flex;

    width: 100%;
    min-width: 100px;

    padding: 7px 20px;
    border: 1.5px solid #874ff6;
    border-radius: 6px;

    color: var(--background-color);

    margin: 10px 0px;

    font-weight: 500;
    text-align: center;
    text-transform: none;

    > span {
      font-size: 15px;

      @media (max-width: 768px) {
        font-size: 13px;
      }
    }

    box-shadow: 0 2px 6px 2px rgba(41, 59, 155, 0.06);

    transition: box-shadow 350ms ease, background-color 350ms ease,
      -webkit-transform 350ms ease;

    opacity: ${props => (props.disabled ? 0.85 : 1)};
    pointer-events: ${props =>
      props.disabled || props.loading ? 'none' : 'all'};

    &:hover {
      box-shadow: 0 4px 8px 0 rgba(41, 59, 155, 0.23);
      transform: translate(0px, -3px);
    }

    &.primary {
      color: white;
      background-color: var(--primary-color);

      &:hover {
        background-color: var(--primary-hover-color);
        border: 1.5px solid var(--primary-hover-color);
      }
    }

    &.secondary {
      color: var(--primary-color);
      background-color: white;

      &:focus {
        outline: none;
      }
    }
  }
`;
