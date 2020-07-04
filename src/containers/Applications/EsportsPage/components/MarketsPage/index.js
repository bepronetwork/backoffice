import React from 'react';
import { connect } from 'react-redux';
import { MarketsContainer } from './styles';
import _ from 'lodash';

import WinnerTwoWay from './components/WinnerTwoWay';

class MarketsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markets: [],
            isLoading: false
        };
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    projectData = (props) => {
        const { status, markets, teamOne, teamTwo } = props;

        if (!_.isEmpty(markets)) {
            this.setState({
                status: status,
                markets: markets,
                teamOne: teamOne,
                teamTwo: teamTwo
            })
        }
    }

    getWinnerTwoWay = () => {
        const { markets } = this.state;

        if (!markets) return [];

        const market = markets.find(market => market.name === 'Winner 2-Way');

        return market ? market.selections : [];
    }

    render() {
        const { markets, status, teamOne, teamTwo } = this.state;
        
        if (_.isEmpty(markets)) return null;
        // if (_.isEmpty(teamOne) || _.isEmpty(teamTwo)) return null;

        return (
            <>
            <MarketsContainer>
                <WinnerTwoWay selections={this.getWinnerTwoWay()} status={status} teamOneName={teamOne.name} teamTwoName={teamTwo.name}/>
            </MarketsContainer>
            </>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(MarketsPage);