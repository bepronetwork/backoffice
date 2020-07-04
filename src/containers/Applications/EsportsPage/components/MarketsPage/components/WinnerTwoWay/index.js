import React from 'react';
import { Container, Header, Result, ResultHeader, MarketName, Status, Tag, Content, ResultTag, TeamName, TeamResult } from './styles';
import _ from 'lodash';

import matchStatusEnum from '../../../Enums/status';

class WinnerTwoWay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    projectData = (props) => {
        const { selections, status, teamOneName, teamTwoName } = props;

        const [teamOne, teamTwo] = selections;

        this.setState({
            teamOne: teamOne,
            teamTwo: teamTwo,
            teamOneName: teamOneName,
            teamTwoName: teamTwoName,
            status: status
        })

    }

    getResultColor = team => {
        switch (true) {
            case team.result === 'win':
                return "#c6ebcc"
            case team.result === 'lose':
                return "#facfd4"
            default:
                return "#f4f7fa";
        }
    }

    getResultText = team => {
        switch (true) {
            case team.result === 'win':
                return "Winner"
            case team.result === 'lose':
                return "Loser"
            default:
                return `${(1/team.probability).toFixed(2)}`;
        }
    }

    getResultTextColor = team => {
        switch (true) {
            case team.result === 'win':
                return "#246b31"
            case team.result === 'lose':
                return "#ac1120"
            default:
                return "#333333";
        }
    }

    render() {
        const { teamOne, teamTwo, status, teamOneName, teamTwoName } = this.state;

        if (_.isEmpty(teamOne) || _.isEmpty(teamTwo)) return null;

        const matchStatus = status ? matchStatusEnum[status] : null;

        return (
            <>
            <Container>
                <Header>
                    Winner
                </Header>
                <Result>
                    <ResultHeader>
                        <MarketName>
                            Winner 2-Way - MATCH
                        </MarketName>
                        <Status>
                            { matchStatus && <Tag backgroundColor={matchStatus.backgroundColor} textColor={matchStatus.textColor}>
                                { matchStatus.text }
                            </Tag> }
                        </Status>
                    </ResultHeader>
                    <Content>
                        <ResultTag backgroundColor={this.getResultColor(teamOne)}>
                            <TeamName>
                                { teamOneName }
                            </TeamName>
                            <TeamResult color={this.getResultTextColor(teamOne)}>
                                { this.getResultText(teamOne) }
                            </TeamResult>
                        </ResultTag>
                        <ResultTag backgroundColor={this.getResultColor(teamTwo)}>
                            <TeamName>
                                { teamTwoName }
                            </TeamName>
                            <TeamResult color={this.getResultTextColor(teamTwo)}>
                                { this.getResultText(teamTwo) }
                            </TeamResult>
                        </ResultTag>
                    </Content>
                </Result>
            </Container>
            </>
        )
    }

}


export default WinnerTwoWay;