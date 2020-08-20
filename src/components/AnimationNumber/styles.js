import styled from 'styled-components';

export const Container = styled.div`
  overflow-wrap: anywhere;

  > span {
    font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '16px')};
    font-weight: 600;
  }
`;
