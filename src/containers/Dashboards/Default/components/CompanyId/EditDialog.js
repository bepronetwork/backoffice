import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { DialogHeader, TextField, DialogActions, ConfirmButton } from './styles';
import { CloseIcon, ContentSaveIcon } from 'mdi-react';
import { Dialog, ButtonBase, DialogContent, FormLabel } from '@material-ui/core';

const labelStyle = {
    fontFamily: "Poppins", 
    fontSize: 15,
    color: "#646777"
}

class EditDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            name: "",
            description: ""
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { profile } = this.props;
        const { App } = profile;

        const { name, description } = App.params;

        this.setState({ name: name, description: description });
    }

    handleChangeName = value => {
        this.setState({ name: value })
    }

    handleChangeDescription = value => {
        this.setState({ description: value })
    }

    handleUpdateAppInfo = async () => {
        const { profile, handleCloseDialog, setAppInfo } = this.props;
        const { name, description } = this.state;

        this.setState({ isLoading: true });

        await profile.getApp().editApp({
            editParams: {
                name: name,
                app_description: description
            }
        })

        this.setState({ isLoading: false });

        setAppInfo({ name, description });
        handleCloseDialog();
    }

    render() {  
        const { open, handleCloseDialog } = this.props;
        const { name, description, isLoading } = this.state;

        return (
            <Dialog open={open} fullWidth maxWidth="xs">
                <DialogHeader>
                    <ButtonBase onClick={() => handleCloseDialog()} disabled={isLoading}>
                        <CloseIcon/>
                    </ButtonBase>
                </DialogHeader>
                <DialogContent>
                    <FormLabel component="legend" style={labelStyle} >Name</FormLabel>
                    <TextField placeholder="" value={name} onChange={(e) => this.handleChangeName(e.target.value)} disabled={isLoading}/>
                    <br/>
                    <FormLabel component="legend" style={labelStyle} >Description</FormLabel>
                    <TextField placeholder="" value={description} onChange={(e) => this.handleChangeDescription(e.target.value)} disabled={isLoading}/>
                </DialogContent>
                <DialogActions>
                    <ConfirmButton disabled={ _.isEmpty(name) || isLoading } onClick={() => this.handleUpdateAppInfo()}>
                        { isLoading ? "Updating..." : <><ContentSaveIcon style={{ margin: "0px 7px" }}/> Update</> } 
                    </ConfirmButton>
                </DialogActions>
            </Dialog>
        );
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(EditDialog);
