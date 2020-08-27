import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 17px;
  font-weight: 500;
  color: var(--text-primary-color) !important;

  margin: 10px 0px;

  @media (max-width: 768px) {
    font-size: 13px;
    margin: 0px;
  }
`;

export const HaveAccount = styled.section`
  display: flex;
  flex-direction: row;

  padding: 3px 0px;

  justify-content: center;
  align-items: center;
`;

export const Actions = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 15px;

  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 15px;
    grid-gap: 5px;
  }
`;
