import React from 'react';
import { Container, PlayerCardContainer, PlayerPhoto, PlayerInfo, PlayerName, PlayerFullName, Nationality, Role, TeamCard, TeamInfo, TeamIcon, TeamName, TeamList } from './styles';
import _ from 'lodash';
import Avatar from 'react-avatar';
import FlagIconFactory from 'react-flag-icon-css'
 
const FlagIcon = FlagIconFactory(React, { useCssModules: false })

const PlayerCard = player => {
    const { first_name, last_name, name, image_url, hometown, nationality, role } = player.player;

    if (!nationality) return null;

    return (
        <>
        <PlayerCardContainer>
            <PlayerPhoto>
            { image_url ? <img src={image_url} alt={name}/> : <Avatar name={name} size="65" round={true}/> }
            </PlayerPhoto>
            <PlayerInfo>
                <PlayerName>
                    { name }
                </PlayerName>
                <PlayerFullName>
                    { `${first_name} ${last_name}` }
                </PlayerFullName>
                <Nationality>
                    <span>{hometown ? hometown : "Nationality: "}</span>
                    <FlagIcon code={nationality.toLowerCase()} size={'1x'}/>
                </Nationality>
                <Role>
                    <span>{`Role: ${role}`}</span>
                </Role>
            </PlayerInfo>
        </PlayerCardContainer>
        </>
    )

}

const Team = props => {
    const { team, players } = props;

    if (_.isEmpty(team) || _.isEmpty(players)) return null;

    const { name, image_url } = team;

    return (
        <TeamCard>
            <TeamInfo>
                <TeamIcon>
                    { image_url ? <img src={image_url} alt={name}/> : <Avatar name={name} size="65" round={true}/> }
                </TeamIcon>
                <TeamName>
                    <span>{ name }</span>
                </TeamName>
            </TeamInfo>
            <TeamList>
            { players.map(player => (
                <PlayerCard player={player}/>
            ))}
            </TeamList>
        </TeamCard>
    )

}

const Teams = props => {
    const { teamOne, teamTwo } = props; 

    if (_.isEmpty(teamOne) || _.isEmpty(teamTwo)) return null;

    const teamOneplayers = teamOne.players;
    const teamTwoplayers = teamTwo.players;

    if (_.isEmpty(teamOneplayers) || _.isEmpty(teamTwoplayers)) return null;

    return (
        <>
        <Container>
            <Team team={teamOne} players={teamOneplayers}/>
            <Team team={teamTwo} players={teamTwoplayers}/>
        </Container>
        </>
    )

};

export default Teams;