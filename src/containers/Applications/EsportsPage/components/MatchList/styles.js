import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;

    width: 100%;
    height: 100%;
`;

export const Header = styled.section`
    display: grid;

    grid-template-areas: 
    'VG Date Status Winner';

    grid-template-columns: 5% 5% 10% 80%;
    grid-template-rows: 32px;

    padding: 10px 30px;

    /* overflow-x: scroll;

    ::-webkit-scrollbar {
        display: none;
    } */
`;

export const Videogame = styled.section`
    grid-area: VG;

    display: flex;

    justify-content: center;
    align-items: center;

    span {
        margin: 0px 8px;
        font-family: Poppins;
        font-size: 11px;
        color: #333333;
    }
`;

export const Date = styled(Videogame)`
    grid-area: Date;
`;

export const Bo = styled(Videogame)`
    grid-area: BO;
`;

export const Status = styled(Videogame)`
    grid-area: Status;
    justify-content: flex-end;
`;

export const Winner = styled(Videogame)`
    grid-area: Winner;
    width: 88%;
`;



