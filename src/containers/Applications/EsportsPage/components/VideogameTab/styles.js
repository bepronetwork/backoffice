import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
`;

export const Tab = styled.a`
    width: 100%;
    height: 58px;
    background-color: white;
    cursor: pointer;

    display: grid;

    grid-template-areas: 
    'select videogame dropdown';

    grid-template-columns: 10% 80% 10%;
    grid-template-rows: auto;

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
    justify-content: flex-start;
    align-items: center;

    span {
        font-family: Poppins;
        font-size: 15px;
        font-weight: 500;
    }
`;

export const Dropdown = styled.section`
    grid-area: dropdown;

    display: flex;
    justify-content: center;
    align-items: center;
`;

