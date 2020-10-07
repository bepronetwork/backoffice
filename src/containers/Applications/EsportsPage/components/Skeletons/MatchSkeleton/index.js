import React from 'react';
import { MatchContainer, MatchInfo, TeamsInfo, ActionArea, Footer, TeamOne, Result, TeamTwo } from './styles';
import Skeleton from '@material-ui/lab/Skeleton';

const MatchSkeleton = props => {
    const { hasEsports } = props;

    return (
        <>
            <MatchContainer disableHover>
                <MatchInfo>
                    <Skeleton variant="rect" width="100%" height="80%" animation={hasEsports} />
                </MatchInfo>
                <TeamsInfo>
                    <TeamOne>
                        <Skeleton variant="rect" width="70%" height="30%" animation={hasEsports} />
                        <Skeleton variant="circle" width="35px" height="35px" style={{ margin: "0px 8px" }} animation={hasEsports}/>
                    </TeamOne>
                    <Result>
                        <Skeleton variant="rect" width="100%" height="80%" animation={hasEsports} />
                    </Result>
                    <TeamTwo>
                        <Skeleton variant="circle" width="35px" height="35px" style={{ margin: "0px 8px" }} animation={hasEsports}/>
                        <Skeleton variant="rect" width="70%" height="30%" animation={hasEsports}/>
                    </TeamTwo>
                </TeamsInfo>
                <ActionArea>
                    <Skeleton variant="rect" width="80%" height="80%" animation={hasEsports}/>
                </ActionArea>
                <Footer>
                    <Skeleton variant="rect" width="100%" height="60%" animation={hasEsports} />
                </Footer>
            </MatchContainer>

        </>
    )
}

export default MatchSkeleton;