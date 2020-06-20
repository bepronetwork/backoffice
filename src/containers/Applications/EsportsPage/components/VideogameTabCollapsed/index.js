import React from 'react';
import { connect } from 'react-redux';
import { Container, Tab, VideoGameIcon } from './styles';
import _ from 'lodash';


class VideogameTab extends React.Component {
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
        const { icon } = data;

        if (_.isEmpty(data)) return null;

        return (
            <>
            <Container>
                <Tab>
                    <VideoGameIcon>
                        { icon }
                    </VideoGameIcon>
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


export default connect(mapStateToProps)(VideogameTab);