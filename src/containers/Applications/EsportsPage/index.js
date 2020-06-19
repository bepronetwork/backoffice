import React from 'react';
import { connect } from 'react-redux';
import { Container, Tabs, Content } from './styles';
import MatchList from './components/MatchList';


class EsportsPage extends React.Component {
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
                <Tabs/>
                <Content>
                    <MatchList/>
                </Content>
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


export default connect(mapStateToProps)(EsportsPage);