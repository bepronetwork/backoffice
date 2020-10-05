import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Actions = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 20px;
`;
