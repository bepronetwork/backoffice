import styled from 'styled-components';

export const Container = styled.div`
    display: grid;

    grid-template-areas: 'tabs content';
    grid-template-columns: 289px auto;
    grid-template-rows: auto;
    grid-gap: 50px;

    height: 100vh;
`;

export const Tabs = styled.section`
    grid-area: tabs;
    border-right: solid 1px rgba(164, 161, 161, 0.35);

    padding: 8px;
    max-height: 607px;

    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`;

export const AllTab = styled.a`
    width: 100%;
    height: 58px;
    background-color: white;
    cursor: pointer;
    
    padding-left: 10%;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
        margin: 0px 8px;
        font-family: Poppins;
        font-size: 16px;
        font-weight: 600;
    }
`;

export const Content = styled.section`
    grid-area: content;

    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }

`;