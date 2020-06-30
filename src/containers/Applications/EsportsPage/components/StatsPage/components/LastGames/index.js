import React from 'react';
import Avatar from 'react-avatar';
import { Container, TeamResult, Team, TeamIcon, TeamName } from './styles';

const Result = team => {
    const { name, image_url } = team.team;

    return (
        <>
        <TeamResult>
            <Team>
                <TeamIcon>
                    { image_url ? <img src={image_url} alt={name}/> : <Avatar name={name} size="18" round={true}/> }
                </TeamIcon>
                <TeamName>
                    <span>{ name }</span>
                </TeamName>
            </Team>
        </TeamResult>
        </>
    )
}

const LastGames = props => {
    const { teamOne, teamTwo } = props; 

    return (
        <>
        <Container>
            <Result team={teamOne}/>
        </Container>
        </>
    )

}

export default LastGames;