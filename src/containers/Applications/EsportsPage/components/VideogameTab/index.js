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

            this.setState({
                data: data
            })
        }
        
    }

    toggleSelected = () => {
        const { selected, open } = this.state;

        this.setState({
            selected: !selected,
            open: !open
        })
    }

    toggleDropdown = () => {
        const { open } = this.state;

        this.setState({
            open: !open
        })
    }

    getSerieName = (serie) => {
        const { league } = serie;

        return `${league.name} / ${serie.full_name}`;
    }

    render() {
        const { toggleSelected, toggleSelectedSerie, selectedVideogames, seriesSelected } = this.props;
        const { data, open, selected } = this.state;
        const { _id, name, icon, series } = data;

        if (_.isEmpty(data)) return null;

        return (
            <>
            <Container>
                <Tab>
                    <Select>
                    <ThemeProvider theme={theme}>
                        <Checkbox
                        checked={selectedVideogames.includes(_id) && !_.isEmpty(seriesSelected)}
                        onChange={() => toggleSelected(_id)}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        color="primary"
                        disabled={_.isEmpty(series)}
                        />
                    </ThemeProvider>
                    </Select>
                    <ButtonBase disableRipple style={{ margin: 0, padding: 0, display: 'block' }} onClick={this.toggleSelected} disabled={_.isEmpty(series)}>
                    <Videogame style={{ opacity: _.isEmpty(series) ? 0.5 : 1 }}>
                        <VideoGameImage>
                            <VideoGameIcon>
                                { icon }
                            </VideoGameIcon>
                        </VideoGameImage>
                        <VideogameName selected={selected || ( selectedVideogames.includes(_id) && !_.isEmpty(seriesSelected) )}>
                            <span>{ name }</span>
                            { selected || ( selectedVideogames.includes(_id) && !_.isEmpty(seriesSelected) ) ? <span style={{ margin: '0px 8px' }}>{ seriesSelected ? seriesSelected.length : 0 }</span> : null }
                        </VideogameName>
                    </Videogame>
                    </ButtonBase>
                    <Dropdown>
                        <ButtonBase disableRipple onClick={this.toggleDropdown} disabled={_.isEmpty(series)} style={{ opacity: _.isEmpty(series) ? 0.5 : 1 }}>
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
                                checked={ seriesSelected ? seriesSelected.includes(serie.id) : false }
                                onChange={() => toggleSelectedSerie({ videogame_id: _id, serie_id: serie.id })}
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