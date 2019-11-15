/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import AnimationNumber from '../../UI/Typography/components/AnimationNumber';
import Numbers from '../../../services/numbers';
import { connect } from "react-redux";

class UsersInfoFilter extends PureComponent {
 
    constructor() {
        super();
        this.state = {

        };
    }
    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = (props) => {
        let { profile } = props;



    }
    
    render() {
        
        return (
            <Col md={12} xl={12} lg={12} xs={12}>
                <Card>
                  
                </Card>
            </Col>
        );
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(UsersInfoFilter);

