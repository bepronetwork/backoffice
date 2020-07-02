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

// import socketConnection from '../../../esports/WebSocket';
import VideoGameTabSkeleton from './components/Skeletons/VideogameTabSkeleton';

class EsportsPage extends React.Component {
    // static contextType = socketConnection;

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
            showMatchPage: false,
            match: {},
            videogames: [],
            selectedVideogames: [],
            seriesSelected: {},
            isLoadingMatches: false
        };
      }

    componentDidMount(){
        // this.createSocketConnection(this.props);
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){''
       this.projectData(props);
    }

    // createSocketConnection = (props) => {
    //     const { connection } = this.context;

    //     connection.on("match", this.showData);
    //     connection.on("serie", this.showData);
    // }

    // showData = data => {
    //     console.log(data)
    // }

    projectData = async (props) => {
        const { videogames } = this.state;
        const { profile } = props;
        const { App } = profile;

        if (_.isEmpty(videogames)) {
            
            App.getVideoGamesAll();

            this.setState({ isLoadingMatches: true });

            await App.getMatchesAll({ size: 10, offset: 0 });

            this.setState({
                videogames: props.videogames,
                series: props.series,
                isLoadingMatches: false
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
        
        const seriesArr = _.concat(Object.values(seriesSelected)).flat();
        
        if (!_.isEmpty(seriesArr)) {
            this.setState({ isLoadingMatches: true });
            await App.getSeriesMatches({ size: 10, offset: 0, serie_id: seriesArr });
            this.setState({ isLoadingMatches: false });
        } else {
            this.setState({ isLoadingMatches: true });
            await App.getMatchesAll({ size: 10, offset: 0 });
            this.setState({ isLoadingMatches: false });
        }
    }

    toggleAllTab = async () => {
        const { profile } = this.props;
        const { App } = profile;

        this.setState({ isLoadingMatches: true });
        await App.getMatchesAll({ size: 10, offset: 0 });

        this.setState({
            selectedVideogames: [],
            seriesSelected: {},
            isLoadingMatches: false
        })
    }

    render() {
        const { collapsed, showMatchPage, match, videogames, seriesSelected, selectedVideogames, isLoadingMatches } = this.state;

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