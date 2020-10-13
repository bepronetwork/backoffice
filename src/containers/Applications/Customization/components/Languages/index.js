import React from 'react';
import { connect } from 'react-redux';
import { Row, Card, CardBody } from 'reactstrap';
import { Title } from './styles';

import _ from 'lodash'
import Language from './Language'

const cardBodyStyle = {
    margin: 10, 
    borderRadius: "10px", 
    border: "solid 1px rgba(164, 161, 161, 0.35)", 
    backgroundColor: "#fafcff", 
    boxShadow: "none", 
    padding: 30
}

class Languages extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { profile } = props;
        const { languages } = profile.getApp().getCustomization();

        this.setState({ languages: languages })
    }

    render() {
        const { languages } = this.state;
        
        return (
            <>
            <Card>
                <CardBody style={cardBodyStyle}>
                    <Title>Languages</Title>
                    <hr/>
                    { languages && (
                        <Row>
                            { !_.isEmpty(languages) && languages.map(language => {
                                return (
                                    <Language language={language}/>
                                )
                            }) }
                        </Row>
                    )}
                </CardBody>
            </Card>
            </>
        )
    }

};


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}
    
export default connect(mapStateToProps)(Languages);