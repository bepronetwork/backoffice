import React from 'react';
import { Card } from 'reactstrap';
import { connect } from "react-redux";
import styled from 'styled-components';
import { Button } from '@material-ui/core';


const ApplicationLink = styled.section`
    display: flex;
    height: 40px;
    max-width: 784px;
    background-color: #fafcff;
    border: solid 1px rgba(164, 161, 161, 0.35);
    /* box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.05); */
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
    margin: 0px !important;
    padding: 6px !important;
    margin-left: 10px !important;
    height: 100% !important;
    border-radius: 6px !important;
    background-color: #814c94 !important;
    min-width: 100px !important;
    box-shadow: none !important;

    text-transform: none !important;
    font-family: Poppins !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    color: #ffffff !important;
    overflow: hidden !important;
`;

class HostingLink extends React.PureComponent{

    render = () => {
        let link = this.props.profile.getApp().getAppLink();
    
        return (
            <Card style={{ padding: 0 }}>
                <ApplicationLink>
                    <h6> {link} </h6>
                    <OpenAppButton variant="contained" href={link} target={'__blank'}>
                        Open App
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

