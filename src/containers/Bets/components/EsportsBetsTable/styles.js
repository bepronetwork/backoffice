import styled from 'styled-components';

export const Container = styled.div`
    padding: 10px;

    border-radius: 10px;
    border: solid 1px rgba(164, 161, 161, 0.35);

    background-color: #FAFCFF;

    display: grid;

    grid-template-areas: 
    'header'
    'table';

    grid-template-columns: 100%;
    grid-template-rows: auto 1fr;
`;

export const Header = styled.div`
    grid-area: header;

    display: grid;

    grid-template-areas: 'filters export';
    grid-template-columns: 70% 30%;
`;

export const TableContainer = styled.div`
    grid-area: table;

    width: 100%;
    height: 100%;

    padding-top: 15px;
`;

export const Filters = styled.div`
    grid-area: filters;

    display: flex;
    justify-content: space-around;
    align-items: center;

    flex-wrap: wrap;

    padding: 5px;
`;

export const Export = styled.div`
    grid-area: export;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    padding: 5px;
`;

export const Text = styled.span`
    font-family: Poppins;
    font-size: 13px;
`;

export const BoldText = styled(Text)`
    font-weight: 500;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const WonResult = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 22px;
    width: 70px;
    margin: 5px;

    font-family: Poppins;
    font-size: 13px;
    font-weight: 400;
    color: white;

    background-color: ${props => props.isWon ? '#63c965' : '#e6536e' };
    border-radius: 5px;
`;