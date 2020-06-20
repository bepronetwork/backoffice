import React from 'react';
import { connect } from 'react-redux';
import { Container, Tab, Select, Videogame, Dropdown, VideoGameImage, VideoGameIcon, VideogameName, SubTabContainer, SubTab, SubTabSelect, LeagueName } from './styles';
import { FormGroup, Label, Input } from 'reactstrap';
import _ from 'lodash';
import { ChevronUpIcon, ChevronDownIcon } from 'mdi-react';
import { ButtonBase } from '@material-ui/core';

const leaguesByVideogame = [
    { name: 'League 01'},
    { name: 'League 02'},
    { name: 'League 03'},
    { name: 'League 04'},
    { name: 'League 05'},
]

class VideogameTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            open: false,
            selected: false
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

    toggleDropdown = () => {
        const { open } = this.state;

        this.setState({
            open: !open
        })
    }

    toggleSelect = () => {
        const { selected } = this.state;

        this.setState({
            selected: !selected
        })
    }

    render() {
        const { data, open, selected } = this.state;
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
                    <ButtonBase disableRipple style={{ margin: 0, padding: 0, display: 'block' }} onClick={this.toggleSelect}>
                    <Videogame>
                        <VideoGameImage>
                            <VideoGameIcon>
                                { icon }
                            </VideoGameIcon>
                        </VideoGameImage>
                        <VideogameName selected={selected}>
                            <span>{ name }</span>
                            { selected ? <span style={{ margin: '0px 8px' }}>{leaguesByVideogame.length}</span> : null }
                        </VideogameName>
                    </Videogame>
                    </ButtonBase>
                    <Dropdown>
                        <ButtonBase disableRipple onClick={this.toggleDropdown}>
                        { open ? <ChevronDownIcon/> : <ChevronUpIcon/> }
                        </ButtonBase>
                    </Dropdown>
                    { open ? <SubTabContainer>
                    { leaguesByVideogame.map(league => (
                    <SubTab>
                        <SubTabSelect>

                        </SubTabSelect>
                        <LeagueName>
                            <span>
                                { league.name }
                            </span>
                        </LeagueName>
                    </SubTab>
                    ))}
                    </SubTabContainer> : null }
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