import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import DocsContainer from './components/DocsContainer';
import BearerTokenTableApiKeys from './components/BearerTokenTableApiKeys';
import TableKey from './components/TableKey';

const defaultProps = {
    platformId : 'N/A',
    apiKey : 'N/A'
}

class DevelopersContainer extends React.Component{

    constructor(props){
        super(props)
        this.state = defaultProps;
    }


    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = (props) => {
        let { profile } = props;
        let app = profile.getApp();
        
        this.setState({...this.state, 
            platformId  : app.getId(),
            apiKey : app.getBearerToken()
        })
    }

    render = () => {
        const { platformId, apiKey} = this.state;

        return (
            
            <Container className="dashboard">
                <Row>
                    <Col lg={12}>
                        <DocsContainer/>           
                    </Col>  
                </Row>
                <Row>
                    <Col lg={12}>
                        <BearerTokenTableApiKeys data={apiKey}/>    
                        <Row>
                            <Col lg={4}>
                                <TableKey type={'Platform Id'} value={platformId}/>                                  
                            </Col>  

                        </Row>
                    </Col>
                </Row>
          </Container>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

DevelopersContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(DevelopersContainer);

