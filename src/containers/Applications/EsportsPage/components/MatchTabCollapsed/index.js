import React from 'react';
import { connect } from 'react-redux';
import { Container, Tab, MatchIcon, Indicator, Game } from './styles';
import _ from 'lodash';


class MatchTabCollapsed extends React.Component {
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


    render() {
        const { data } = this.state;
        const { games } = data;

        if (_.isEmpty(data)) return null;

        return (
            <>
            <Container>
                <Tab>
                    { games.map(game => (
                        <MatchIcon>
                            <Indicator status={game.status}/>
                            <Game>
                                <span>{ `G${game.position}` }</span>
                            </Game>
                        </MatchIcon>
                    ))}
                </Tab>
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


export default connect(mapStateToProps)(MatchTabCollapsed);