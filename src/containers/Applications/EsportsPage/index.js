import React from 'react';
import { connect } from 'react-redux';
import { Container, Tabs, Content, AllTab, Actions, CollapseButton, MatchSpanTab, BackTo, BackIcon, PageName, MatchIcon } from './styles';
import MatchList from './components/MatchList';
import VideogameTab from './components/VideogameTab';
import VideogameTabCollapsed from './components/VideogameTabCollapsed';
import _ from 'lodash';

import videogamesEnum from './components/Enums/videogames';
import { ChevronLeftIcon, ChevronRightIcon, ArrowBackIcon } from 'mdi-react';
import MatchPage from './components/MatchPage';
import MatchTab from './components/MatchTab';
import { ButtonBase } from '@material-ui/core';
import MatchTabCollapsed from './components/MatchTabCollapsed';

import { getVideoGamesAll, getSeriesMatches, getMatchesAll } from '../../../esports/services';

class EsportsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
            showMatchPage: false,
            match: {},
            videogames: [],
            selectedVideogames: [],
            seriesSelected: {}
        };
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    projectData = (props) => {
        const { videogames } = this.state;
        const { profile } = props;

        const id = profile.App.getAdminId();
        const bearerToken = profile.App.getBearerToken();

        if (_.isEmpty(videogames)) {
            getVideoGamesAll({ params: { admin: id, size: 10 }, headers: { bearerToken, id } });
            getMatchesAll({ params: { admin: id, size: 10 }, headers: { bearerToken, id } });

            this.setState({
                videogames: props.videogames,
                series: props.series
            })
        }

    }

    getVideogameInfo = videogame => {
        const external_id  = videogame.external_id.toString();
        
        if (_.has(videogamesEnum, external_id)) {
            const videogameName = videogamesEnum[external_id].name;
            const videogameIcon = videogamesEnum[external_id].icon;

            return {
                _id: videogame._id,
                name: videogameName,
                icon: videogameIcon,
                series: videogame.series
            }
        }
        
    }

    toggleCollape = () => {
        const { collapsed } = this.state;

        this.setState({
            collapsed: !collapsed
        })
    }

    setMatchPage = data => {
        this.setState({
            showMatchPage: true,
            match: data
        })
    }

    backToListPage = () => {
        this.setState({
            showMatchPage: false,
            match: {}
        })
    }

    setSelected = data => {
        const { seriesSelected } = this.state;

        this.setState({
            seriesSelected: { ...seriesSelected, ...data }
        })
    }
    
    toggleSelected = _id => {
        const { selectedVideogames, seriesSelected, videogames } = this.state;

        const videogame = videogames.find(videogame => videogame._id === _id);

        if (selectedVideogames.includes(_id)) {
            this.setState({
                selectedVideogames: _.without(selectedVideogames, _id),
                seriesSelected: {
                    ...seriesSelected,
                    [_id]: []
                }
            }, this.updateMatches({ 
                seriesSelected: {
                    ...seriesSelected,
                     [_id]: []
                } 
            }))
        } else {
            this.setState({
                selectedVideogames: [ ...selectedVideogames, _id ],
                seriesSelected: {
                    ...seriesSelected,
                    [_id]: videogame.series.map(serie => serie.id)
                }
            }, this.updateMatches({
                seriesSelected: {
                    ...seriesSelected,
                    [_id]: videogame.series.map(serie => serie.id)
                }
            }))
        }

    }

    toggleSelectedSerie = ({ videogame_id, serie_id }) => {
        const { seriesSelected, selectedVideogames } = this.state;

        if (!_.has(seriesSelected, videogame_id)) {
            this.setState({
                selectedVideogames: [ ...selectedVideogames, videogame_id ],
                seriesSelected: {
                    ...seriesSelected,
                    [videogame_id]: [ serie_id ]
                }
            }, this.updateMatches({
                seriesSelected: {
                    ...seriesSelected,
                    [videogame_id]: [ serie_id ]
                }
            }))
        } else {
            const series = seriesSelected[videogame_id];

            if (series.includes(serie_id)) {
                this.setState({
                    seriesSelected: {
                        ...seriesSelected,
                        [videogame_id]: _.without(series, serie_id)
                    }
                }, this.updateMatches({
                    seriesSelected: {
                        ...seriesSelected,
                        [videogame_id]: _.without(series, serie_id)
                    }
                }))
            } else {
                this.setState({
                    seriesSelected: {
                        ...seriesSelected,
                        [videogame_id]: [...series, serie_id]
                    }
                }, this.updateMatches({
                    seriesSelected: {
                        ...seriesSelected,
                        [videogame_id]: [...series, serie_id]
                    }
                }))
            }
        }
    }

    updateMatches = ({ seriesSelected }) => {
        const { profile } = this.props;

        const id = profile.App.getAdminId();
        const bearerToken = profile.App.getBearerToken();
        
        const seriesArr = _.concat(Object.values(seriesSelected)).flat();
        
        if (!_.isEmpty(seriesArr)) {
            getSeriesMatches({ params: {
                admin: id,
                size: 10,
                serie_id: seriesArr
            },
            headers: {
                bearerToken,
                id
            }
            })
        } else {
            getMatchesAll({ params: { 
                admin: id,
                size: 10
            }, headers: { 
                bearerToken, 
                id 
            } });
        }
    }

    toggleAllTab = () => {
        const { profile } = this.props;

        const id = profile.App.getAdminId();
        const bearerToken = profile.App.getBearerToken();

        getMatchesAll({ params: { admin: id, size: 10 }, headers: { bearerToken, id } });

        this.setState({
            selectedVideogames: [],
            seriesSelected: {}
        })
    }

    render() {
        const { collapsed, showMatchPage, match, videogames, seriesSelected, selectedVideogames } = this.state;
        
        return (
            <>
            <Container collapsed={collapsed}>
                <Tabs>
                    <Actions>
                        <CollapseButton onClick={this.toggleCollape}>
                    { collapsed ? <ChevronRightIcon/> : <ChevronLeftIcon/> }
                        </CollapseButton>
                    </Actions>
                    { !showMatchPage && _.isEmpty(match) ? (
                        <>
                            <ButtonBase disableRipple style={{ margin: 0, padding: 0, display: 'block' }} onClick={_.debounce(this.toggleAllTab, 500)} disabled={_.isEmpty(selectedVideogames)}>
                                <AllTab style={{ opacity: !_.isEmpty(selectedVideogames) ? 0.5 : 1 }}>
                                    <span>All</span>
                                </AllTab>
                            </ButtonBase>
                            { videogames.map(videogame => (
                                collapsed ? 
                                <VideogameTabCollapsed 
                                toggleSelected={_.debounce(this.toggleSelected, 500)}
                                selectedVideogames={selectedVideogames}
                                data={this.getVideogameInfo(videogame)}
                                /> 
                                : <VideogameTab 
                                    data={this.getVideogameInfo(videogame)} 
                                    setSelected={this.setSelected} 
                                    toggleSelected={_.debounce(this.toggleSelected, 500)}
                                    toggleSelectedSerie={_.debounce(this.toggleSelectedSerie, 500)} 
                                    selectedVideogames={selectedVideogames}
                                    seriesSelected={seriesSelected[videogame._id]}/>
                            ))}
                        </>
                    ) : (
                        <>  
                            <ButtonBase disableRipple onClick={this.backToListPage}>
                                { collapsed ? (
                                    <BackIcon>
                                        <ArrowBackIcon color="#39f"/>
                                    </BackIcon>
                                ) : (
                                    <BackTo>
                                        <BackIcon>
                                            <ArrowBackIcon color="#39f"/>
                                        </BackIcon>
                                        <PageName>
                                            <span> Back to events list </span>
                                        </PageName>
                                    </BackTo>
                                ) }
                            </ButtonBase>
                            { collapsed ? (
                                <MatchIcon>
                                    <span>M</span>
                                </MatchIcon>
                            ) : (
                                <MatchSpanTab>
                                    <span>Match</span>
                                </MatchSpanTab>
                            )}
                            { collapsed ? <MatchTabCollapsed data={match}/> : <MatchTab data={match}/> }
                        </>
                    )} 
                </Tabs>
                <Content>
                    { showMatchPage && !_.isEmpty(match) ? (
                        <MatchPage data={match}/>
                    ) : (
                        <MatchList 
                        setMatchPage={this.setMatchPage}
                        seriesSelected={seriesSelected}/>
                    )}
                </Content>
            </Container>
            </>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile,
        videogames: state.videogames,
        series: state.series,
        isLoading: state.isLoading
    };
}


export default connect(mapStateToProps)(EsportsPage);