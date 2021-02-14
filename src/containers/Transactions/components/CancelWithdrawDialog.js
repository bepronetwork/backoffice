import React, { Component } from 'react'
import { Dialog, DialogTitle, Divider, DialogActions } from '@material-ui/core';


export default class CancelWithdrawDialog extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: null,
            reason: null
        };
    }

    onSubmit = () => {
        const { cancelWithdraw } = this.props;

        cancelWithdraw();
    }

    render() {
        const { open, onClose, withdraw, isLoading } = this.props;

        if(!withdraw) {return null}

        return (
            <Dialog
            open={open}
            onClose={onClose}
                >
                <DialogTitle>Withdraw cancellation</DialogTitle>
                <Divider/>
                <DialogActions>
                <button disabled={isLoading[withdraw._id]} className={`clean_button button-normal button-hover`} style={{ height: "35px", backgroundColor: "#e6536e", margin: "25px", pointerEvents: isLoading[withdraw._id] ? 'none' : 'all' }} onClick={this.onSubmit}> 
                    { !isLoading[withdraw._id]? 
                    <p className='text-small text-white'>Yes, cancel withdraw</p>
                    : <p className='text-small text-white'>Canceling...</p> }
                </button>
                </DialogActions>
            </Dialog> 
        )
    }
}