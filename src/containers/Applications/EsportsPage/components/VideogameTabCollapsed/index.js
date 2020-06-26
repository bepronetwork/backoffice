import React from 'react';
import { connect } from 'react-redux';
import { Container, Tab, VideoGameIcon } from './styles';
import _ from 'lodash';
import { ButtonBase } from '@material-ui/core';

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
        const { toggleSelected, selectedVideogames } = this.props;
        const { data } = this.state;
        const { _id, icon, series } = data;

        if (_.isEmpty(data)) return null;

        return (
            <>
            <Container>
                <ButtonBase disableRipple style={{ margin: 0, padding: 0, display: 'block' }} onClick={() => toggleSelected(_id)} disabled={_.isEmpty(series)}>
                    <Tab selected={ selectedVideogames.includes(_id) }>
                        <VideoGameIcon style={{ opacity: _.isEmpty(series) || !selectedVideogames.includes(_id) ? 0.5 : 1 }}>
                            { icon }
                        </VideoGameIcon>
                    </Tab>
                </ButtonBase>
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