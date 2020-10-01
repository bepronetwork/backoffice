import React from 'react';
import { Container, PlayerCardContainer, PlayerPhoto, PlayerInfo, PlayerName, PlayerFullName, Nationality, Role, TeamCard, TeamInfo, TeamIcon, TeamName, TeamList } from './styles';

import _ from 'lodash';
import Skeleton from '@material-ui/lab/Skeleton';

const PlayerCard = () => {

    return (
        <>
        <PlayerCardContainer>
            <PlayerPhoto>
                <Skeleton variant="circle" width="65px" height="65px" />
            </PlayerPhoto>
            <PlayerInfo>
                <PlayerName>
                    <Skeleton variant="rect" width="100%" height="80%" />
                </PlayerName>
                <PlayerFullName>
                    <Skeleton variant="rect" width="100%" height="80%" />
                </PlayerFullName>
                <Nationality>
                    <Skeleton variant="rect" width="100%" height="80%" />
                </Nationality>
                <Role>
                    <Skeleton variant="rect" width="100%" height="80%" />
                </Role>
            </PlayerInfo>
        </PlayerCardContainer>
        </>
    )

}

const Team = () => {

    return (
        <TeamCard>
            <TeamInfo>
                <TeamIcon>
                    <Skeleton variant="circle" width="30px" height="30px" />
                </TeamIcon>
                <TeamName>
                    <Skeleton variant="rect" width="100%" height="30%" />
                </TeamName>
            </TeamInfo>
            <TeamList>
                { _.times(5, () => <PlayerCard/>)}
            </TeamList>
        </TeamCard>
    )

}

const Teams = () => {

    return (
        <>
        <Container>
            <Team/>
            <Team/>
        </Container>
        </>
    )

};

export default Teams;