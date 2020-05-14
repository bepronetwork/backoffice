import React, { Component } from 'react'
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';

export default class ConfirmWithdrawDialog extends Component {

    onSubmit = () => {
        const { allowWithdraw, withdraw } = this.props;
        
        allowWithdraw(withdraw);

    }

    render() {
        const { open, onClose, withdraw } = this.props;

        if (!withdraw) {return null};

        const { amount, address, currency } = withdraw;

        return (
            <Dialog
            open={open}
            onClose={onClose}
                >
                <DialogContent>
                    <h4>{`Are you sure you want to confirm the withdraw of ${amount} ${currency.ticker} to ${address} ?`}</h4>
                </DialogContent>
                <DialogActions>
                <button className={`clean_button button-normal button-hover`} style={{ height: "35px", backgroundColor: "#63c965", margin: "25px" }} onClick={this.onSubmit}> 
                    <p className='text-small text-white'>Yes, confirm withdraw</p>
                </button>
                </DialogActions>
            </Dialog> 
        )
    }
}
