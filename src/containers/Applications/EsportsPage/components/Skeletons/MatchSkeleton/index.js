import React from 'react';
import { MatchContainer, MatchInfo, TeamsInfo, ActionArea, Footer, TeamOne, Result, TeamTwo } from './styles';
import Skeleton from '@material-ui/lab/Skeleton';

const MatchSkeleton = () => {
    return (
        <>
            <MatchContainer>
                <MatchInfo>
                    <Skeleton variant="rect" width="100%" height="80%" />
                </MatchInfo>
                <TeamsInfo>
                    <TeamOne>
                        <Skeleton variant="rect" width="70%" height="30%" />
                        <Skeleton variant="circle" width="35px" height="35px" style={{ margin: "0px 8px" }}/>
                    </TeamOne>
                    <Result>
                        <Skeleton variant="rect" width="100%" height="80%" />
                    </Result>
                    <TeamTwo>
                        <Skeleton variant="circle" width="35px" height="35px" style={{ margin: "0px 8px" }}/>
                        <Skeleton variant="rect" width="70%" height="30%" />
                    </TeamTwo>
                </TeamsInfo>
                <ActionArea>
                    <Skeleton variant="rect" width="80%" height="80%" />
                </ActionArea>
                <Footer>
                    <Skeleton variant="rect" width="100%" height="60%" />
                </Footer>
            </MatchContainer>

        </>
    )
}

export default MatchSkeleton;