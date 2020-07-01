import React from 'react';
import { Container, Header, Content, TeamOne, TeamOneHeader, TeamTwo, TeamTwoHeader, TeamOneResults, TeamOneResult, Label, Result, TeamTwoResults, TeamTwoResult, TeamTwoLabel } from './styles';
import _ from 'lodash';
import Skeleton from '@material-ui/lab/Skeleton';

const SideBySideSkeleton = () => {

    return (
        <>
        <Container>
            <Header>
                <Skeleton variant="rect" width="100%" height="30%" />
            </Header>
            <Content>
                <TeamOne>
                    <TeamOneHeader>
                        <Skeleton variant="rect" width="100%" height="15%" />
                        <Skeleton variant="circle" width="30px" height="30px" />
                    </TeamOneHeader>
                    <TeamOneResults>
                        { _.times(6, () => (
                        <TeamOneResult>
                            <Label>
                                <Skeleton variant="rect" width="100%" height="30%" />
                            </Label>
                            <Result>
                                <Skeleton variant="rect" width="100%" height="80%" />
                            </Result>
                        </TeamOneResult> ))}
                    </TeamOneResults>
                </TeamOne>
                <TeamTwo>
                    <TeamTwoHeader>
                        <Skeleton variant="circle" width="30px" height="30px" />
                        <Skeleton variant="rect" width="100%" height="15%" />
                    </TeamTwoHeader>
                    <TeamTwoResults>
                    { _.times(6, () => (
                        <TeamTwoResult>
                            <Result>
                                <Skeleton variant="rect" width="100%" height="80%" />
                            </Result>
                            <Label>
                                <Skeleton variant="rect" width="100%" height="30%" />
                            </Label>
                        </TeamTwoResult> ))}
                    </TeamTwoResults>
                </TeamTwo>
            </Content>
        </Container>
        </>
    )

}

export default SideBySideSkeleton;