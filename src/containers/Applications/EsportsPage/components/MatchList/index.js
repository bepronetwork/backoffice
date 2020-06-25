import React from 'react';
import { connect } from 'react-redux';
import { Container } from './styles';
import Match from '../Match';
import _ from 'lodash';

class MatchList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            matches: []
        };
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = (props) => {
        const { matches, videogames } = props;

        const series = _.concat(...videogames.map(videogame => videogame.series));

        this.setState({
            matches: matches,
            series: series
        })

    }

    render() {
        const { setMatchPage } = this.props;
        const { matches, series } = this.state;

        if (_.isEmpty(matches) || _.isEmpty(series)) return null;

        return (
            <>
            <Container>
                { matches.map(match => (
                    <Match data={match} series={series} setMatchPage={setMatchPage}/>
                ))}
            </Container>
            </>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile,
        matches: state.matches,
        videogames: state.videogames
    };
}


export default connect(mapStateToProps)(MatchList);