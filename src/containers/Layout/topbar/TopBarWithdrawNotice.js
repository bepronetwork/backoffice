/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import _ from 'lodash';
import { Withdraw } from '../../../components/Icons';

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
        const { summary } = props;
        const { withdrawals } = summary;

        const user = !_.isEmpty(props.profile) ? props.profile : null;

        if(user && user !== null) {
            const withdrawsInQueue = withdrawals ? withdrawals.filter( w => w.status === 'Processed') : [];

            this.setState({ openWithdraws:  withdrawsInQueue.length });
        }
    }

    render() {
        const { openWithdraws } = this.state;

        return (
            <div className="topbar__collapse">

                <Link to={'/transactions'} className={`topbar__btn button-hover`}>
                    <Withdraw />
                    <p className='notification-icon-value'>{openWithdraws}</p>
                </Link>
                {this.state.collapse && <button className="topbar__back" onClick={this.toggle} />}
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile,
        summary: state.summary
    };
}


export default connect(mapStateToProps)(TopbarWithdrawNotice);

