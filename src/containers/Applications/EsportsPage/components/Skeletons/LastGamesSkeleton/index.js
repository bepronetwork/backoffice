import React from 'react';
import { Container, Header, TeamResult, Team, TeamIcon, TeamName, MatchResultList, MatchResult } from './styles';
import _ from 'lodash';
import Skeleton from '@material-ui/lab/Skeleton';

const Result = () => {
    
    return (
        <>
        <TeamResult>
            <Team>
                <TeamIcon>
                    <Skeleton variant="circle" width="30px" height="30px" />
                </TeamIcon>
                <TeamName>
                    <Skeleton variant="rect" width="100%" height="30%" />
                </TeamName>
            </Team>
            <MatchResultList>
                { _.times(5, () => (
                    <MatchResult>
                        <Skeleton variant="circle" width="22px" height="22px" />
                    </MatchResult>
                ))}
            </MatchResultList>
        </TeamResult>
        </>
    )
}

const LastGamesSkeleton = () => {

    return (
        <>
        <Container>
            <Header>
                <Skeleton variant="rect" width="100%" height="30%" />
            </Header>
            <Result />
            <Result />
        </Container>
        </>
    )

}

export default LastGamesSkeleton;