import React from 'react';
import { connect } from 'react-redux';
import { StatsContainer } from './styles';
import _ from 'lodash';
import LastGames from './components/LastGames';
import SideBySide from './components/SideBySide';
import Teams from './components/Teams';

class StatsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            match: {},
            isLoading: false
        };
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    projectData = async (props) => {
        const { match, profile } = props;
        const { opponents, videogame } = match;

        const [teamOne, teamTwo] = opponents.map(opponent => opponent.opponent);
        const { App } = profile;

        this.setState({ isLoading: true });
        const teamOneData = await App.getTeamStats({ slug: videogame.slug, team_id: teamOne.id });
        const teamTwoData = await App.getTeamStats({ slug: videogame.slug, team_id: teamTwo.id });
        this.setState({ isLoading: false });

        if (!_.isEmpty(match)) {
            this.setState({
                match: match,
                opponents: opponents,
                teamOne: teamOneData.data.message ? teamOneData.data.message : {},
                teamTwo: teamTwoData.data.message ? teamTwoData.data.message : {},
            })
        }
    }

    render() {
        const { teamOne, teamTwo, isLoading } = this.state;

        // if (_.isEmpty(teamOne) || _.isEmpty(teamTwo)) return null;

        return (
            <>
            <StatsContainer>
                <Teams teamOne={teamOne} teamTwo={teamTwo} isLoading={isLoading}/>
                <SideBySide teamOne={teamOne} teamTwo={teamTwo} isLoading={isLoading}/>
                <LastGames teamOne={teamOne} teamTwo={teamTwo} isLoading={isLoading}/>
            </StatsContainer>
            </>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(StatsPage);