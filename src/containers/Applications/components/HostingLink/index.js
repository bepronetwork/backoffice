import React from 'react';
import { Col, Row, Card } from 'reactstrap';
import { connect } from "react-redux";
import _ from 'lodash';

class HostingLink extends React.Component{

    constructor(props){
        super(props)
    }
    
    componentDidMount(){

    }

    componentWillReceiveProps(){

    }


    

    render = () => {
        let link = this.props.profile.getApp().getAppLink();
    
        return (
            <Card>
                <div className='landing__product__widget__small' style={{height : 60, width : 270}}>
                    <Row>
                        <Col sd={10}>
                            <h6> {new String(link).substr(0, 15)}... </h6>
                        </Col>
                        <Col sd={2}>
                            <a className={'button-hover'} href={link} target={'__blank'} >
                                Open App
                            </a>
                        </Col>
                    </Row>
                </div>
            </Card>
        )
    }

}


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(HostingLink);

