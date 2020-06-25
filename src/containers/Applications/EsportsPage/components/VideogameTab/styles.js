import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
`;

export const Tab = styled.div`
    width: 100%;
    /* min-height: 58px; */
    background-color: white;

    display: grid;

    grid-template-areas: 
    'select videogame dropdown'
    'subtab subtab subtab';

    grid-template-columns: 10% 80% 10%;
    grid-template-rows: 58px auto;

    border-top: solid 1px rgba(164, 161, 161, 0.35);
`;

export const Select = styled.section`
    grid-area: select;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Videogame = styled.section`
    grid-area: videogame;
    
    display: grid;

    grid-template-areas: 'gameIcon gameName';

    grid-template-columns: 20% 80%;
    grid-template-rows: auto;
`;

export const VideoGameImage = styled.section`
    grid-area: gameIcon;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const VideoGameIcon = styled.section`
    height: 22px;
    width: 22px;
`;

export const VideogameName = styled.section`
    grid-area: gameName;

    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        font-family: Poppins;
        font-size: 15px;
        font-weight: 500;
        color: ${props => props.selected ? "#3399ff": "#212529"}
    }
`;

export const Dropdown = styled.section`
    grid-area: dropdown;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SubTabContainer = styled.section`
    grid-area: subtab;

    padding: 0px 20px;
`;

export const SubTab = styled.div`
    width: 100%;
    height: 40px;
    background-color: white;

    display: grid;

    grid-template-areas: 
    'select league';

    grid-template-columns: 10% 90%;
    grid-template-rows: auto;
`;

export const SubTabSelect = styled.section`
    grid-area: select;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LeagueName = styled.section`
    grid-area: league;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 3px 0px;

    span {
        padding: 8px 0px;
        font-family: Poppins;
        font-size: 12px;
        font-weight: 400;
    }
`;