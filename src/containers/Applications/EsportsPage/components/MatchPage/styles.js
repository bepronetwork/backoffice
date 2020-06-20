import styled from 'styled-components';

export const MatchContainer = styled.div`
    display: flex;
    flex-direction: column;

    height: 100vh;
    width: 100%;
`;

export const MatchSummary = styled.section`
    background-color: #fafcff;
    border: solid 1px rgba(164, 161, 161, 0.35);

    height: 30%;
    width: 100%;

    display: grid;

    grid-template-areas: 
    'serie'
    'score'
    'info';

    grid-template-columns: 100%;
    grid-template-rows: 58px auto 49px;
`;

export const SerieSummary = styled.section`
    grid-area: serie;

    span {
        color: rgb(95, 110, 133);
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
`;

export const VideoGameIcon = styled.section`
    margin: 0px 8px;
    height: 14px;
    width: 14px;
`;

export const Score = styled.section`
    grid-area: score;
`;

export const InfoContainer = styled.section`
    grid-area: info;
`;