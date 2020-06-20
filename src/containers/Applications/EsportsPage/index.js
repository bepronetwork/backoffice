import React from 'react';
import { connect } from 'react-redux';
import { Container, Tabs, Content, AllTab, Actions, CollapseButton } from './styles';
import MatchList from './components/MatchList';
import VideogameTab from './components/VideogameTab';
import VideogameTabCollapsed from './components/VideogameTabCollapsed';

import { LoL, CSGO, Dota, Overwatch, RocketLeague, CoD, RainbowSix } from './components/Icons';
import { ChevronLeftIcon, ChevronRightIcon } from 'mdi-react';

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
            collapsed: false
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


    render() {
        const { collapsed } = this.state;

        return (
            <>
            <Container collapsed={collapsed}>
                <Tabs>
                    <Actions>
                        <CollapseButton onClick={this.toggleCollape}>
                    { collapsed ? <ChevronRightIcon/> : <ChevronLeftIcon/> }
                        </CollapseButton>
                    </Actions>
                    <AllTab>
                        <span>All</span>
                    </AllTab>
                    { videogames.map(videogame => (
                        collapsed ? <VideogameTabCollapsed data={videogame}/> : <VideogameTab data={videogame}/> 
                    ))}
                </Tabs>
                <Content>
                    <MatchList/>
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