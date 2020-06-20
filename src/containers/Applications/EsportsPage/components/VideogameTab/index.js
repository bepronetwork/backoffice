import React from 'react';
import { connect } from 'react-redux';
import { Container, Tab, Select, Videogame, Dropdown, VideoGameImage, VideoGameIcon, VideogameName } from './styles';
import { FormGroup, Label, Input } from 'reactstrap';
import _ from 'lodash';
import { ChevronUpIcon } from 'mdi-react';

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
        const { name, icon } = data;

        if (_.isEmpty(data)) return null;

        return (
            <>
            <Container>
                <Tab>
                    <Select>
                    {/* <FormGroup check>
                        <Label check>
                        <Input type="checkbox" />{' '}
                        Check me out
                        </Label>
                    </FormGroup> */}
                    </Select>
                    <Videogame>
                        <VideoGameImage>
                            <VideoGameIcon>
                                { icon }
                            </VideoGameIcon>
                        </VideoGameImage>
                        <VideogameName>
                            <span>{ name }</span>
                        </VideogameName>
                    </Videogame>
                    <Dropdown>
                        <ChevronUpIcon/>
                    </Dropdown>
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