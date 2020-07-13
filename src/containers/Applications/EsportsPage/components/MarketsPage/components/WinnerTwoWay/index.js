import React from 'react';
import { Container, Header, Result, ResultHeader, MarketName, Status, Tag, Content, ResultTag, TeamName, TeamResult, Graph, CloseButton, GraphContainer } from './styles';
import _ from 'lodash';
import { Modal, Button } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';
import { Line } from 'react-chartjs-2';

import matchStatusEnum from '../../../Enums/status';

const GraphModal = props => {
    const { open, toggleModal, teamOne, teamTwo } = props;

    const state = {
        labels: ['06/26', '06/26', '06/27', '06/28', '06/29', '06/30', '07/01', '07/02', '07/03', '07/04'],
        datasets: [{
            label: teamOne.name,
            fill: false,
            data: Array.from({length: 10}, () => teamOne.probability),
            borderColor: [
                'rgb(51, 153, 255)'
                
            ],
            borderWidth: 3
        },
        {
            label: teamTwo.name,
            fill: false,
            data: Array.from({length: 10}, () => teamTwo.probability),
            borderColor: [
                'rgb(237, 85, 101)'
            ],
            borderWidth: 3
        }
    ]
    }

    return (
        <>
        <Modal
          title="Winner 2-Way - MATCH"
          centered
          visible={open}
          width={1000}
          onOk={() => toggleModal()}
          onCancel={() => toggleModal()}
          footer={[
            // <CloseButton key="close" onClick={() => toggleModal()}>
            //     Close
            // </CloseButton>
          ]}
        >
            <GraphContainer>
            <Line
            data={state}
            options={{
                responsive: true,
                maintainAspectRatio: true,
                legend: {
                    display: true,
                    position: 'bottom'
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display:false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            max: 1,
                            beginAtZero: true
                        },
                    }]
                },
                elements: {
                    point:{
                        radius: 0
                    }
                }
            }}
            />
            </GraphContainer>
          
        </Modal>
        </>
    )
}

class WinnerTwoWay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
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

    toggleModal = () => {
        const { open } = this.state;

        this.setState({
            open: !open
        })
    }

    render() {
        const { teamOne, teamTwo, status, teamOneName, teamTwoName, open } = this.state;

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
                        <GraphModal open={open} toggleModal={this.toggleModal} teamOne={teamOne} teamTwo={teamTwo}/>
                        <MarketName>
                            Winner 2-Way - MATCH
                        </MarketName>
                        <Graph>
                            <Button type="link" onClick={() => this.toggleModal()}>
                                See graph <LineChartOutlined style={{ fontSize: '16px' }} /> 
                            </Button>
                        </Graph>
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