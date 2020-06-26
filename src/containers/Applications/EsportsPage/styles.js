import styled from 'styled-components';

export const Container = styled.div`
    display: grid;

    grid-template-areas: 'tabs content';
    grid-template-columns: ${props => props.collapsed ? "79px auto" : "289px auto"};
    grid-template-rows: auto;
    grid-gap: 15px;
    
    height: 100vh;
`;

export const Actions = styled.section`
    height: 58px;
    width: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const CollapseButton = styled.button`
    padding: 0;
    background: none;
    outline: none;
    font: inherit;
    z-index: 2;
    width: 28px;
    height: 28px;
    border: 1px solid #39f;
    border-radius: 50%;
    color: #39f;
    background-color: #fff;
    transition: 0.2s;

    &:hover {
        color: #fff;
        background-color: #39f;
    }
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

export const AllTab = styled.section`
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

export const MatchSpanTab = styled.a`
    width: 100%;
    height: 58px;
    background-color: white;
    cursor: pointer;

    padding: 0px 8px;
    margin-top: 20px;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
        font-family: Poppins;
        margin: 0px 8px;
        font-size: 14px;
        font-weight: 400;
        color: #5f6e85;
    }
`;

export const TabsCollapsed = styled.section`
    grid-area: tabs;
    border-right: solid 1px rgba(164, 161, 161, 0.35);

    padding: 8px;
    max-height: 607px;

    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`;

export const Content = styled.section`
    grid-area: content;

    overflow-y: scroll;
    overflow-x: scroll;

    ::-webkit-scrollbar {
        display: none;
    }

`;

export const BackTo = styled.section`
    display: grid;

    grid-template-areas: 
    'icon pageName';

    grid-template-columns: 20px auto;
    grid-template-rows: 33px;

`;

export const BackIcon = styled.section`
    grid-area: icon;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PageName = styled.section`
    grid-area: pageName;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
        font-family: Poppins;
        margin: 0px 8px;
        font-size: 14px;
        font-weight: 400;
        color: #39f;
    }
`;

export const MatchIcon = styled.a`
    width: 37px;
    height: 37px;
    border-radius: 3px;
    background-color: #ecf1f4;
    margin: 5px 0px;
    margin-left: 3px;
    margin-top: 20px;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    span {
        font-family: Poppins;
        font-size: 14px;
        color: #333;
    }
`;
