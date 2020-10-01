import React from 'react';
import { connect } from 'react-redux';
import { Container, Tab, Indicator, Game, Winner, Icon, TrophyIcon, Team } from './styles';
import _ from 'lodash';
import { Trophy } from '../Icons';

class MatchTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    projectData = (props) => {
        const { data } = props;

        if (!_.isEmpty(data)) {
            this.setState({
                data: data
            })
        }
    }

    getWinnerName = id => {
        const { opponents } = this.state.data;

        const winner = opponents.find(opponent => opponent.opponent.id === id);

        return winner.opponent.name;
    }

    render() {
        const { data } = this.state;
        const { games } = data;
        
        if (_.isEmpty(data)) return null;

        return (
            <>
            <Container>
                { games.map(game => (
                <Tab>
                    <Indicator status={game.status}/>
                    <Game>
                        <span>
                            { `Game ${game.position}` }
                        </span>
                    </Game>
                    { game.winner.id ? (
                        <Winner>
                            <Icon>
                                <TrophyIcon>
                                    <Trophy/>
                                </TrophyIcon>
                            </Icon>
                            <Team>
                                <span>
                                    { this.getWinnerName(game.winner.id) }
                                </span>
                            </Team>
                    </Winner>
                    ) : null }
                </Tab>

                ))}
            </Container>
            </>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(MatchTab);