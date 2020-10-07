import React from 'react';
import { connect } from 'react-redux';
import { Container, Tabs, Content, AllTab, Actions, CollapseButton, MatchSpanTab, BackTo, BackIcon, PageName, MatchIcon } from './styles';
import MatchList from './components/MatchList';
import VideogameTab from './components/VideogameTab';
import VideogameTabCollapsed from './components/VideogameTabCollapsed';
import _ from 'lodash';

import videogamesEnum from './components/Enums/videogames';
import { ChevronLeftIcon, ChevronRightIcon, ArrowBackIcon, FormatLineStyleIcon } from 'mdi-react';
import MatchPage from './components/MatchPage';
import MatchTab from './components/MatchTab';
import { ButtonBase } from '@material-ui/core';
import MatchTabCollapsed from './components/MatchTabCollapsed';

import socketConnection from '../../../esports/WebSocket';
import VideoGameTabSkeleton from './components/Skeletons/VideogameTabSkeleton';
import store from '../../App/store';
import { updateMatchData } from '../../../redux/actions/matchesActions';

class EsportsPage extends React.Component {
    static contextType = socketConnection;

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
            showMatchPage: false,
            match: {},
            videogames: [],
            selectedVideogames: [],
            seriesSelected: {},
            isLoadingMatches: false,
            begin_at: null,
            end_at: null,
            statusSelected: null,
            showOnlyBookedMatches: false
        };
      }

    componentDidMount(){
        this.createSocketConnection(this.props);
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    createSocketConnection = () => {
        const { connection } = this.context;

        connection.on("matchUpdate", _.debounce(this.updateMatch, 10000));
        // connection.on("serieUpdate", this.showData);
    }

    updateMatch = async (data) => {
        const { App } = this.props.profile;
        
        const matchUpdated = await App.getSpecificMatch({ match_id: data.message });

        if (matchUpdated.data.message) {
            store.dispatch(updateMatchData(matchUpdated.data.message));
        }
    }

    projectData = async (props) => {
        const { profile } = props;
        const { App } = profile;

        this.setState({
            videogames: props.videogames,
            series: props.series
        }, async () => {
            
            const { videogames } = this.state;

            if (_.isEmpty(videogames)) {
                
                await App.getVideoGamesAll();
    
                this.setState({ isLoadingMatches: true }, () => {
                    
                });
    
                await App.getMatchesAll({ 
                    filters: { 
                        size: 10, 
                        offset: 0 
                    } 
                });
    
                this.setState({ isLoadingMatches: false });
            }
        })
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
    
    toggleSelected = async _id => {
        const { selectedVideogames, seriesSelected, videogames } = this.state;

        const videogame = videogames.find(videogame => videogame._id === _id);

        if (selectedVideogames.includes(_id)) {
            this.setState({
                selectedVideogames: _.without(selectedVideogames, _id),
                seriesSelected: {
                    ...seriesSelected,
                    [_id]: []
                }
            }, await this.updateMatches({ 
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
            }, await this.updateMatches({
                seriesSelected: {
                    ...seriesSelected,
                    [_id]: videogame.series.map(serie => serie.id)
                }
            }))
        }

    }

    toggleSelectedSerie = async ({ videogame_id, serie_id }) => {
        const { seriesSelected, selectedVideogames } = this.state;

        if (!_.has(seriesSelected, videogame_id)) {
            this.setState({
                selectedVideogames: [ ...selectedVideogames, videogame_id ],
                seriesSelected: {
                    ...seriesSelected,
                    [videogame_id]: [ serie_id ]
                }
            }, await this.updateMatches({
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
                }, await this.updateMatches({
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
                }, await this.updateMatches({
                    seriesSelected: {
                        ...seriesSelected,
                        [videogame_id]: [...series, serie_id]
                    }
                }))
            }
        }
    }

    updateMatches = async ({ seriesSelected }) => {
        const { profile } = this.props;
        const { App } = profile;
        const { begin_at, end_at, statusSelected, showOnlyBookedMatches } = this.state;
        
        const series = _.concat(Object.values(seriesSelected)).flat();

        this.setState({ isLoadingMatches: true });
        
        if (showOnlyBookedMatches) {
            if (_.isEmpty(series)) {
                await App.getBookedMatches({ 
                    filters: { 
                        size: 10,
                        offset: 0, 
                        begin_at: begin_at,
                        end_at: end_at,
                        status: statusSelected
                    }
                });
    
                this.setState({ isLoadingMatches: false });
    
            } else {
                await App.getBookedSeriesMatches({ 
                    filters: {
                        size: 10, 
                        offset: 0,
                        serie_id: series, 
                        begin_at: begin_at,
                        end_at: end_at,
                        status: statusSelected
                    }
                });
    
                this.setState({ isLoadingMatches: false });
            }

        } else {
            if (_.isEmpty(series)) {
                await App.getMatchesAll({ 
                    filters: { 
                        size: 10, 
                        offset: 0,
                        begin_at: begin_at,
                        end_at: end_at,
                        status: statusSelected
                    }
                });
    
                this.setState({ isLoadingMatches: false });
    
            } else {
                await App.getSeriesMatches({ 
                    filters: {
                        size: 10, 
                        offset: 0,
                        serie_id: series, 
                        begin_at: begin_at,
                        end_at: end_at,
                        status: statusSelected
                    }
                });
    
                this.setState({ isLoadingMatches: false });
            }
        }
    }

    toggleAllTab = async () => {
        const { profile } = this.props;
        const { App } = profile;
        const { begin_at, end_at } = this.state;

        this.setState({ isLoadingMatches: true });

        await App.getMatchesAll({ 
            filters: { 
                size: 10, 
                offset: 0,
                begin_at: begin_at,
                end_at: end_at
            } 
        });

        this.setState({
            selectedVideogames: [],
            seriesSelected: {},
            isLoadingMatches: false
        })
    }

    setDateFilter = ({ begin_at, end_at }) => {
        this.setState({
            begin_at: begin_at,
            end_at: end_at
        })
    }

    setStatusFilter = ({ statusSelected }) => {
        this.setState({
            statusSelected: !_.isEmpty(statusSelected) ? statusSelected : null
        })
    }

    setBookedFilter = () => {
        const { showOnlyBookedMatches, seriesSelected } = this.state;

        this.setState({
            showOnlyBookedMatches: !showOnlyBookedMatches
        }, () => {
            this.updateMatches({ seriesSelected });
        })
    }   

    render() {
        const { collapsed, showMatchPage, match, videogames, seriesSelected, selectedVideogames, isLoadingMatches, begin_at, end_at, statusSelected, showOnlyBookedMatches } = this.state;

        return (
            <>
            <Container collapsed={collapsed}>
                <Tabs>
                    { _.isEmpty(videogames) ? (
                        <VideoGameTabSkeleton/>
                    ) : (
                    <>
                    <Actions>
                        <CollapseButton onClick={this.toggleCollape}>
                            { collapsed ? <ChevronRightIcon/> : <ChevronLeftIcon/> }
                        </CollapseButton>
                    </Actions>
                    { !showMatchPage && _.isEmpty(match) ? (
                        <>
                            <ButtonBase disableRipple style={{ margin: 0, padding: 0, display: 'block' }} onClick={this.toggleAllTab} disabled={ _.isEmpty(selectedVideogames) || isLoadingMatches }>
                                <AllTab style={{ opacity: !_.isEmpty(selectedVideogames) ? 0.5 : 1 }}>
                                    <span>All</span>
                                </AllTab>
                            </ButtonBase>
                            { videogames.map(videogame => (
                                collapsed ? 
                                <VideogameTabCollapsed 
                                isLoading={isLoadingMatches}
                                toggleSelected={this.toggleSelected}
                                selectedVideogames={selectedVideogames}
                                data={this.getVideogameInfo(videogame)}
                                /> 
                                : <VideogameTab 
                                    isLoading={isLoadingMatches}
                                    data={this.getVideogameInfo(videogame)} 
                                    setSelected={this.setSelected} 
                                    toggleSelected={this.toggleSelected}
                                    toggleSelectedSerie={this.toggleSelectedSerie} 
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
                    </>    
                    )}
                </Tabs>
                <Content>
                    { showMatchPage && !_.isEmpty(match) ? (
                        <MatchPage matchId={match.id}/>
                    ) : (
                        <MatchList 
                        setDateFilter={this.setDateFilter}
                        setStatusFilter={this.setStatusFilter}
                        beginAt={begin_at}
                        endAt={end_at}
                        showOnlyBookedMatches={showOnlyBookedMatches}
                        setBookedFilter={this.setBookedFilter}
                        statusSelected={statusSelected}
                        setMatchPage={this.setMatchPage}
                        seriesSelected={seriesSelected}
                        isLoading={isLoadingMatches}/>
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
        series: state.series
    };
}


export default connect(mapStateToProps)(EsportsPage);