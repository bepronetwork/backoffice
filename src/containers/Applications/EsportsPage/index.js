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

import { getVideoGamesAll } from '../../../esports/services';

class EsportsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
            showMatchPage: false,
            match: {},
            videogames: []
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

        if (_.isEmpty(videogames)) {
            getVideoGamesAll({ params: {} });

            this.setState({
                videogames: props.videogames
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


    render() {
        const { collapsed, showMatchPage, match, videogames } = this.state;

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
                            <AllTab>
                                <span>All</span>
                            </AllTab>
                            { videogames.map(videogame => (
                                collapsed ? <VideogameTabCollapsed data={this.getVideogameInfo(videogame)}/> : <VideogameTab data={this.getVideogameInfo(videogame)}/> 
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
                        <MatchList setMatchPage={this.setMatchPage}/>
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
        isLoading: state.isLoading
    };
}


export default connect(mapStateToProps)(EsportsPage);