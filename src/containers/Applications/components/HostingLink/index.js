import React from 'react';
import { Col, Row, Card } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { connect } from "react-redux";
import _ from 'lodash';
import styled from 'styled-components';


const ApplicationLink = styled.section`
    display: flex;
    height: 60px;
    max-width: 784px;
    background-color: white;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    justify-content: space-between;
    align-items: center;
    padding-left: 25px;

    h6 {
        font-family: Poppins;
        font-size: 14px;
        color: #a4a1a1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const OpenAppButton = styled(Button)`
    margin: 0px;
    margin-left: 10px;
    height: 100%;
    border-radius: 6px;
    background-color: #814c94;
    min-width: 150px;

    &.btn.icon {
        padding-top: 18px;   
    }

    span {
        font-family: Poppins;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
        overflow: hidden;
    }

`;

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
            <Card style={{ padding: 0 }}>
                <ApplicationLink>
                    <h6> {link} </h6>
                    <OpenAppButton className="icon" href={link} target={'__blank'}>
                        <span>Open App</span>
                    </OpenAppButton>
                </ApplicationLink>
                    {/* <Row>
                        <Col sd={10}>
                            
                        </Col>
                        <Col sd={2}>
                            <a className={'button-hover'} href={link} target={'__blank'} >
                                Open App
                            </a>
                        </Col>
                    </Row>
                </div> */}
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

