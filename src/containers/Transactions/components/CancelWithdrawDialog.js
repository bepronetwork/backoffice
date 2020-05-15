import React, { Component } from 'react'
import { Dialog, DialogTitle, Divider, DialogContent, FormControl, RadioGroup, FormControlLabel, Radio, DialogActions, Button, createMuiTheme, MuiThemeProvider, TextareaAutosize } from '@material-ui/core';


const theme = createMuiTheme({
    palette: {
      primary: { 
        main: '#894798' 
        }
    },
  });

  
export default class CancelWithdrawDialog extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: null,
            reason: null
        };
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
            reason: event.target.value !== 'Other' ? event.target.value : null
        })
    }

    onChangeTextArea = (event) => {
        this.setState({
            reason: event.target.value !== "" ? event.target.value : null
        })
    }

    onSubmit = () => {
        const { cancelWithdraw } = this.props;
        const { reason } = this.state;

        cancelWithdraw(reason);

    }

    render() {
        const { value, reason } = this.state;
        const { open, onClose, withdraw, isLoading } = this.props;

        if(!withdraw) {return null}

        return (
            <Dialog
            open={open}
            onClose={onClose}
                >
                <DialogTitle>Explain the reason for cancellation</DialogTitle>
                <Divider/>
                <DialogContent>
                    <MuiThemeProvider theme={theme}>
                        <FormControl component="fieldset">
                        <RadioGroup aria-label="reason" name="reason" value={value} onChange={this.handleChange}>
                            <FormControlLabel value="Needs KYC" control={<Radio color="primary"/>} label="Needs KYC"/>
                            <FormControlLabel value="Detected faulty play/exploited the system" control={<Radio color="primary"/>} label="Detected faulty play/exploited the system" />
                            <FormControlLabel value="Needs more betting" control={<Radio color="primary"/>} label="Needs more betting" />
                            <FormControlLabel value="Other" control={<Radio color="primary"/>} label="Other"/>    
                            { value === 'Other' ?
                            <>
                                <br/>
                                <TextareaAutosize aria-label="another-reason" rowsMin={5} placeholder="Other reason" onChange={this.onChangeTextArea}/>
                            </>
                            : null }
                        </RadioGroup>
                        </FormControl>
                    </MuiThemeProvider>
                   
                </DialogContent>
                <DialogActions>
                <button disabled={!reason || isLoading[withdraw._id]} className={`clean_button button-normal button-hover`} style={{ height: "35px", backgroundColor: "#e6536e", margin: "25px", pointerEvents: !reason || isLoading[withdraw._id] ? 'none' : 'all' }} onClick={this.onSubmit}> 
                    { !isLoading[withdraw._id]? 
                    <p className='text-small text-white'>Yes, cancel withdraw</p>
                    : <p className='text-small text-white'>Canceling...</p> }
                </button>
                </DialogActions>
            </Dialog> 
        )
    }
}
