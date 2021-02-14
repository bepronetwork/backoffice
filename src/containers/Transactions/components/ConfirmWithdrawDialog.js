import React, { Component } from 'react'
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';

export default class ConfirmWithdrawDialog extends Component {

    onSubmit = () => {
        const { allowWithdraw, withdraw } = this.props;

        allowWithdraw(withdraw);

    }

    render() {
        const { open, onClose, withdraw, isLoading } = this.props;

        if (!withdraw) {return null};

        return (
            <Dialog
            open={open}
            onClose={onClose}
                >
                <DialogContent>
                    <h4>Are you sure you want to confirm the withdraw ?</h4>
                </DialogContent>
                <DialogActions>
                <button disabled={isLoading[withdraw._id]}className={`clean_button button-normal button-hover`} style={{ height: "35px", backgroundColor: "#63c965", margin: "25px", pointerEvents: isLoading[withdraw._id] ? 'none' : 'all' }} onClick={this.onSubmit}> 
                    { !isLoading[withdraw._id] ?
                    <p className='text-small text-white'>Yes, confirm withdraw</p>
                    : <p className='text-small text-white'>Confirming...</p> }
                </button>
                </DialogActions>
            </Dialog> 
        )
    }
}