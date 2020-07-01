import React from 'react';
import Avatar from 'react-avatar';
import { Container, Header, Content, TeamOne, TeamOneHeader, TeamTwo, TeamTwoHeader, TeamOneResults, TeamOneResult, Label, Result, TeamTwoResults, TeamTwoResult, TeamTwoLabel } from './styles';
import _ from 'lodash';

const results = Object.freeze({
    won: { text: "W", color: "#52b030" },
    lost: { text: "L", color: "#ec5050" },
    draw: { text: "D", color: "#b0b0b0" }
})

const getColor = ({ x, y }) => {

    switch (true) {
        case x > y:
            return results.won.color
        case y > x: 
            return results.lost.color
        default:
            return results.draw.color;
    }
}

const SideBySide = props => {
    const { teamOne, teamTwo } = props; 

    if (_.isEmpty(teamOne) || _.isEmpty(teamTwo)) return null;

    const teamOneStats = teamOne.stats[0].totals;
    const teamTwoStats = teamTwo.stats[0].totals;

    if (_.isEmpty(teamOneStats) || _.isEmpty(teamTwoStats)) return null;

    return (
        <>
        <Container>
            <Header>
                <span>Side-by-side comparison</span>
            </Header>
            <Content>
                <TeamOne>
                    <TeamOneHeader>
                        <span>{ teamOne.name }</span>
                        { teamOne.image_url ? <img src={teamOne.image_url} alt={teamOne.name}/> : <Avatar name={teamOne.name} size="28" round={true}/> }
                    </TeamOneHeader>
                    <TeamOneResults>
                        <TeamOneResult>
                            <Label>
                                <span>Matches played</span>
                            </Label>
                            <Result>
                                <span>{ teamOneStats.matches_played }</span>
                            </Result>
                        </TeamOneResult>
                        <TeamOneResult>
                            <Label>
                                <span>Matches won</span>
                            </Label>
                            <Result color={getColor({ x: teamOneStats.matches_won, y: teamTwoStats.matches_won })}>
                                <span>{ teamOneStats.matches_won }</span>
                            </Result>
                        </TeamOneResult>
                        <TeamOneResult>
                            <Label>
                                <span>Matches lost</span>
                            </Label>
                            <Result color={getColor({ x: teamTwoStats.matches_lost, y: teamOneStats.matches_lost })}>
                                <span>{ teamOneStats.matches_lost }</span>
                            </Result>
                        </TeamOneResult>
                        <TeamOneResult>
                            <Label>
                                <span>Games played</span>
                            </Label>
                            <Result>
                                <span>{ teamOneStats.games_played }</span>
                            </Result>
                        </TeamOneResult>
                        <TeamOneResult>
                            <Label>
                                <span>Games won</span>
                            </Label>
                            <Result color={getColor({ x: teamOneStats.games_won, y: teamTwoStats.games_won })}>
                                <span>{ teamOneStats.games_won }</span>
                            </Result>
                        </TeamOneResult>
                        <TeamOneResult>
                            <Label>
                                <span>Games lost</span>
                            </Label>
                            <Result color={getColor({ x: teamTwoStats.games_lost, y: teamOneStats.games_lost })}>
                                <span>{ teamOneStats.games_lost }</span>
                            </Result>
                        </TeamOneResult>
                    </TeamOneResults>
                </TeamOne>
                <TeamTwo>
                    <TeamTwoHeader>
                        { teamTwo.image_url ? <img src={teamTwo.image_url} alt={teamTwo.name}/> : <Avatar name={teamTwo.name} size="28" round={true}/> }
                        <span>{ teamTwo.name }</span>
                    </TeamTwoHeader>
                    <TeamTwoResults>
                        <TeamTwoResult>
                            <Result>
                                <span>{ teamTwoStats.matches_played }</span>
                            </Result>
                            <TeamTwoLabel>
                                <span>Matches played</span>
                            </TeamTwoLabel>
                        </TeamTwoResult>
                        <TeamTwoResult>
                            <Result color={getColor({ x: teamTwoStats.matches_won, y: teamOneStats.matches_won })}>
                                <span>{ teamTwoStats.matches_won }</span>
                            </Result>
                            <TeamTwoLabel>
                                <span>Matches won</span>
                            </TeamTwoLabel>
                        </TeamTwoResult>
                        <TeamTwoResult>
                            <Result color={getColor({ x: teamOneStats.matches_lost, y: teamTwoStats.matches_lost })}>
                                <span>{ teamTwoStats.matches_lost }</span>
                            </Result>
                            <TeamTwoLabel>
                                <span>Matches lost</span>
                            </TeamTwoLabel>
                        </TeamTwoResult>
                        <TeamTwoResult>
                            <Result>
                                <span>{ teamTwoStats.games_played }</span>
                            </Result>
                            <TeamTwoLabel>
                                <span>Games played</span>
                            </TeamTwoLabel>
                        </TeamTwoResult>
                        <TeamTwoResult>
                            <Result color={getColor({ x: teamTwoStats.games_won, y: teamOneStats.games_won })}>
                                <span>{ teamTwoStats.games_won }</span>
                            </Result>
                            <TeamTwoLabel>
                                <span>Games won</span>
                            </TeamTwoLabel>
                        </TeamTwoResult>
                        <TeamTwoResult>
                            <Result color={getColor({ x: teamOneStats.games_lost, y: teamTwoStats.games_lost })}>
                                <span>{ teamTwoStats.games_lost }</span>
                            </Result>
                            <TeamTwoLabel>
                                <span>Games lost</span>
                            </TeamTwoLabel>
                        </TeamTwoResult>
                    </TeamTwoResults>
                </TeamTwo>
            </Content>
        </Container>
        </>
    )

}

export default SideBySide;