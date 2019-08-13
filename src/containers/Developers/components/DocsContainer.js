import React from 'react';
import { Col, Container, Row, CardBody, Card } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
const Ava = `${process.env.PUBLIC_URL}/img/dashboard/astronaur.png`;



class DocsContainer extends React.Component{

    constructor(props){
        super(props)
    }


    render = () => {
        return (
            <Col md={12} lg={12}>
                <a href={'https://docs.betprotocol.com'} target={'__blank'}>
                    <Card>
                    <CardBody className="dashboard__card-widget no_padding_card">
                        <Row style={{overflow : 'hidden'}}>
                            <Col lg={4}>
                                <h4 style={{marginTop : 0, paddingTop : 40, paddingBottom : 40, marginBottom : 20}} className={"dashboard__total-stat"}>
                                    API Documentation 
                                </h4>
                            </Col>
                            <Col style={{overflow : 'hidden'}} lg={8}>
                                <img style={{width : 400, margin : 'auto'}} src={Ava} alt="avatar" className='image__doc'/>
                            </Col>
                        </Row>
                    </CardBody>     
                    </Card>
                </a>
            </Col>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

DocsContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(DocsContainer);

