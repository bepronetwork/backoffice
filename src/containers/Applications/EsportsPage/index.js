import React from 'react';
import { connect } from 'react-redux';
import { Container, Tabs, Content, AllTab, Actions, CollapseButton, MatchSpanTab, BackTo, BackIcon, PageName, MatchIcon } from './styles';
import MatchList from './components/MatchList';
import VideogameTab from './components/VideogameTab';
import VideogameTabCollapsed from './components/VideogameTabCollapsed';
import _ from 'lodash';

import { LoL, CSGO, Dota, Overwatch, RocketLeague, CoD, RainbowSix } from './components/Icons';
import { ChevronLeftIcon, ChevronRightIcon, ArrowBackIcon } from 'mdi-react';
import MatchPage from './components/MatchPage';
import MatchTab from './components/MatchTab';
import { ButtonBase } from '@material-ui/core';
import MatchTabCollapsed from './components/MatchTabCollapsed';

const videogames = [
    { name: 'League of Legends', icon: <LoL/> },
    { name: 'CS:GO', icon: <CSGO/> },
    { name: 'Dota 2', icon: <Dota/> },
    { name: 'Overwatch', icon: <Overwatch/> },
    { name: 'Rocket League', icon: <RocketLeague/> },
    { name: 'Call of Duty', icon: <CoD/> },
    { name: 'Rainbow Six', icon: <RainbowSix/> },
]

class EsportsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
            showMatchPage: false,
            match: {}
        };
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    projectData = (props) => {

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
        const { collapsed, showMatchPage, match } = this.state;

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
                                collapsed ? <VideogameTabCollapsed data={videogame}/> : <VideogameTab data={videogame}/> 
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
        profile: state.profile
    };
}


export default connect(mapStateToProps)(EsportsPage);