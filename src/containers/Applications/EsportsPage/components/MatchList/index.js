import React from 'react';
import { connect } from 'react-redux';
import { Container } from './styles';
import Match from '../Match';
import { matches, series } from './data';

class MatchList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    projectData = (props) => {

    }


    render() {

        return (
            <>
            <Container>
                { matches.map(match => (
                    <Match data={match} series={series}/>
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


export default connect(mapStateToProps)(MatchList);