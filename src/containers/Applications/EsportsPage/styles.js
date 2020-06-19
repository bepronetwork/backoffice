import styled from 'styled-components';

export const Container = styled.div`
    display: grid;

    grid-template-areas: 'tabs content';
    grid-template-columns: 289px auto;
    grid-template-rows: auto;
    grid-gap: 10px;

    height: 100vh;
`;

export const Tabs = styled.section`
    grid-area: tabs;
    background-color: grey;
`;

export const Content = styled.section`
    grid-area: content;

`;