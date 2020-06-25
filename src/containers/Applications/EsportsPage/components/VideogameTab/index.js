import React from 'react';
import { connect } from 'react-redux';
import { Container, Tab, Select, Videogame, Dropdown, VideoGameImage, VideoGameIcon, VideogameName, SubTabContainer, SubTab, SubTabSelect, LeagueName } from './styles';
import _ from 'lodash';
import { ChevronUpIcon, ChevronDownIcon } from 'mdi-react';
import { ButtonBase, Checkbox, createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
      primary: { 
        main: '#3399ff' 
        }
    },
  });

class VideogameTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            open: false,
            selected: false,
            selectedSeries: {}
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
            const { series } = data;

            let selectedSeries = {}; 
            
            series.forEach(serie => {
                selectedSeries[serie.id] = false
            });

            this.setState({
                data: data,
                selectedSeries: selectedSeries
            })
        }
    }

    toggleDropdown = () => {
        const { open } = this.state;

        this.setState({
            open: !open
        })
    }

    toggleSelected = () => {
        const { selected, selectedSeries } = this.state;

        this.setState({
            selected: !selected,
            selectedSeries: _.mapValues(selectedSeries, () => !selected)
        })
    }

    toggleSelectedSerie = id => {
        const { selectedSeries } = this.state;

        this.setState({
            selectedSeries: { ...selectedSeries, [id]: selectedSeries[id] ? !selectedSeries[id] : true }
        })
    }

    getSerieName = (serie) => {
        const { league } = serie;

        return `${league.name} / ${serie.full_name}`;
    }

    render() {
        const { data, open, selected, selectedSeries } = this.state;
        const { name, icon, series } = data;

        if (_.isEmpty(data)) return null;

        return (
            <>
            <Container>
                <Tab>
                    <Select>
                    <ThemeProvider theme={theme}>
                        <Checkbox
                        checked={selected}
                        onChange={() => this.toggleSelected()}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        color="primary"
                        />
                    </ThemeProvider>
                    </Select>
                    <ButtonBase disableRipple style={{ margin: 0, padding: 0, display: 'block' }} onClick={this.toggleSelected}>
                    <Videogame>
                        <VideoGameImage>
                            <VideoGameIcon>
                                { icon }
                            </VideoGameIcon>
                        </VideoGameImage>
                        <VideogameName selected={selected}>
                            <span>{ name }</span>
                            { selected ? <span style={{ margin: '0px 8px' }}>{series.length}</span> : null }
                        </VideogameName>
                    </Videogame>
                    </ButtonBase>
                    <Dropdown>
                        <ButtonBase disableRipple onClick={this.toggleDropdown} disabled={_.isEmpty(series)}>
                        { open ? <ChevronDownIcon/> : <ChevronUpIcon/> }
                        </ButtonBase>
                    </Dropdown>
                    { open ? <SubTabContainer>
                    { series.map(serie => (
                    <SubTab>
                        <SubTabSelect>
                            <ThemeProvider theme={theme}>
                                <Checkbox
                                size="small"
                                checked={selectedSeries[serie.id]}
                                onChange={() => this.toggleSelectedSerie(serie.id)}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                color="primary"
                                />
                            </ThemeProvider>
                        </SubTabSelect>
                        <LeagueName>
                            <span>
                                { this.getSerieName(serie) }
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