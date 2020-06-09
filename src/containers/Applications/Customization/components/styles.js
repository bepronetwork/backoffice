import styled from 'styled-components';
import { Input } from 'reactstrap';

export const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'start',
      overflow: 'hidden',
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    }
  };

export const TextField = styled(Input)`
    margin: 12px 0px;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
    background-color: white;
    font-family: Poppins;
    font-size: 14px;
    line-height: 24px;
    color: #828282;
`;

export const Label = styled.span`
    font-family: Poppins;
    font-size: 18px;
    font-weight: 500;
    line-height: 35px;
    text-align: left;
    color: #463e3e;
`;