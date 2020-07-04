import styled from 'styled-components';

export const Container = styled.div`
    display: grid;

    grid-template-areas: 
    'header'
    'result';

    grid-template-columns: 100%;
    grid-template-rows: 42px 1fr;

    height: 161px;
    width: 512px;

    margin: 10px;
    padding: 10px;
    background-color: #fafcff;
    border-radius: 6px;
    border: solid 1px rgba(164, 161, 161, 0.35);
`;

export const Header = styled.section`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding: 0px 8px;
    margin-bottom: 10px;
    border-bottom: solid 1px rgba(164, 161, 161, 0.35);

    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    color: #333333;
`;

export const Result = styled.section`
    grid-area: result;
    display: grid;

    grid-template-areas: 
    'header'
    'content'
    'menu';

    grid-template-columns: 100%;
    grid-template-rows: 30% 50% 20%;
`;

export const ResultHeader = styled.section`
    grid-area: header;
    display: grid;

    grid-template-areas: 
    'name graph tag';

    grid-template-columns: 70% 15% 15%;
    grid-template-rows: 100%; 

    padding: 0px 8px;   

`;

export const MarketName = styled.section`
    grid-area: name;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    font-family: Poppins;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
`;

export const Status = styled.section`
    grid-area: tag;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0px 8px;   
`;

export const Tag = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 70px;
    min-height: 23px;
    padding: 3px;
    border-radius: 3px;

    font-family: Poppins;
    font-size: 11px;
    font-weight: 300;

    background-color: ${props => props.backgroundColor};
    color: ${props => props.textColor};
`;

export const Content = styled.section`
    grid-area: content;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ResultTag = styled.section`
    display: grid;

    grid-template-areas: 
    'name result';

    grid-template-columns: 80% 20%;
    grid-template-rows: 100%; 

    padding: 4px 8px;  

    height: 30px;
    width: 234px; 

    border-radius: 3px;

    background-color: ${props => props.backgroundColor};
`;

export const TeamName = styled.section`
    grid-area: name;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    font-family: Poppins;
    font-size: 14px;
    font-weight: 400;
    color: black;
`;

export const TeamResult = styled.section`
    grid-area: result;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    font-family: Poppins;
    font-size: 14px;
    font-weight: 400;
    color: ${props => props.color ? props.color : "#333333"};
`;