import React from 'react';
import { connect } from 'react-redux';
import { MatchContainer, MatchSummary, SerieSummary, Score, InfoContainer } from './styles';

class MatchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
       this.projectData(props);
    }

    projectData = (props) => {

    }



    render() {

        return (
            <>
            <MatchContainer>
                <MatchSummary>
                    <SerieSummary>
                        
                    </SerieSummary>
                    <Score>

                    </Score>
                    <InfoContainer>

                    </InfoContainer>
                </MatchSummary>
            </MatchContainer>            
            </>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(MatchPage);