import React from 'react';
import Avatar from 'react-avatar';
import { Container, Header, TeamResult, Team, TeamIcon, TeamName, MatchResultList, MatchResult } from './styles';
import _ from 'lodash';

const results = Object.freeze({
    won: { text: "W", color: "#52b030" },
    lost: { text: "L", color: "#ec5050" },
    draw: { text: "D", color: "#b0b0b0" }
})

const getResult = ({ id, winner }) => {

    switch (true) {
        case winner.id === null:
            return results.draw
        case id === winner.id:
            return results.won
        case id !== winner.id:
            return results.lost
        default:
            break;
    }
}

const Result = team => {
    const { id, name, image_url, last_games } = team.team;

    return (
        <>
        <TeamResult>
            <Team>
                <TeamIcon>
                    { image_url ? <img src={image_url} alt={name}/> : <Avatar name={name} size="22" round={true}/> }
                </TeamIcon>
                <TeamName>
                    <span>{ name }</span>
                </TeamName>
            </Team>
            <MatchResultList>
                { last_games.map(game => (
                    <MatchResult color={getResult({ id, winner: game.winner }).color}>
                        <span>{ getResult({ id, winner: game.winner }).text }</span>
                    </MatchResult>
                ))}
            </MatchResultList>
        </TeamResult>
        </>
    )
}

const LastGames = props => {
    const { teamOne, teamTwo } = props; 

    if (_.isEmpty(teamOne) || _.isEmpty(teamTwo)) return null;

    return (
        <>
        <Container>
            <Header>
                <span>Last games</span>
            </Header>
            <Result team={teamOne}/>
            <Result team={teamTwo}/>
        </Container>
        </>
    )

}

export default LastGames;