/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BoxDownIcon from 'mdi-react/BoxDownIcon';
import { connect } from "react-redux";
import _ from 'lodash';
import { Chat } from '../../../components/Icons';

class TopbarWithdrawNotice extends Component {

    constructor(props){
        super(props);
        this.state = {
            openWithdraws : 0
        };
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = async (props) => {
        let user = !_.isEmpty(props.profile) ? props.profile : null ;
        if(user){
            let withdraws = user.getApp().getSummaryData('withdraws').data;
            let withdrawsInQueue = withdraws.filter( w => w.status == 'Queue');
            this.setState({openWithdraws :  withdrawsInQueue.length})
        }
        
    }

    render() {
        const { openWithdraws } = this.state;

        return (
            <div className="topbar__collapse">

                <Link to={'/transactions'} className={`topbar__btn button-hover`}>
                    <Chat />
                    <p className='notification-icon-value'>{openWithdraws}</p>
                </Link>
                {this.state.collapse && <button className="topbar__back" onClick={this.toggle} />}
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(TopbarWithdrawNotice);

