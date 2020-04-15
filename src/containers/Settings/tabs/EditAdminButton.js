import React from 'react'
import { Button, Dialog, DialogTitle, Divider, DialogActions, DialogContent, FormControlLabel, Checkbox, FormControl, Select, MenuItem } from '@material-ui/core';
import { FormGroup } from 'reactstrap';

class EditAdminButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          userType: '',
          isToggle: false,
          userPermissions: {}
        };
    }

    componentDidMount() {
        this.projectData(this.props);
    }

    // componentWillReceiveProps() {
    //     this.projectData(this.props);
    // }

    handleOpen = () => {
        this.setState(state => ({
            isToggle: true
          }));
    }

    handleClose = () => {
        this.setState(state => ({
            isToggle: false
          }));
    }

    handleSelected = (event) => {
        event.persist();

        this.handleChangeUserType(event.target.value);  
    }

    handleChangeUserType = (userType) => {
        const { user } = this.props;

        if (userType === 'Super Admin') {
            this.handleSubmit(user.id, 
                {super_admin: true, 
                financials: true, 
                user_withdraw: true,
                withdraw: true,
                customization: true});
        } else {
            this.handleOpen();
        }
    }

    handleSubmit = async (id, params) => {
        const { profile } = this.props;

        await profile.editAdminType({adminToModify: id, permission: params});

        this.setState(state => ({
            userType: params.super_admin ? 'Super Admin' : 'Collaborator'
        }));

        this.handleClose();
    }

    handleChange = (event) => {
        event.persist();
        this.setState(prevState => ({ userPermissions: {
            ...prevState.userPermissions,
            [event.target.name]: event.target.checked }}));
    }

    projectData = (props) => {
        const { user } = props;

        if (user && user.permission) {
            this.setState(state => ({
                userPermissions: user.permission,
                userType: user.permission.super_admin ? 'Super Admin' : 'Collaborator'
            }))
        }
    }

    render() {
        const { user } = this.props;
        const { userType } = this.state;
        const { customization, withdraw, user_withdraw, financials } = this.state.userPermissions;
        
        return (
            <div>
                <Select
                labelId="select-user-type-label"
                id="select-user-type"
                value={userType}
                onChange={(e) => this.handleSelected(e)}
                >
                    <MenuItem value={'Super Admin'}>Super Admin</MenuItem>
                    <MenuItem value={'Collaborator'}>Collaborator</MenuItem>
                </Select>
                <Dialog
                    open={this.state.isToggle}
                    onClose={this.handleClose}
                >
                <DialogTitle> {`Edit admin permissions for ${user.name}`}</DialogTitle>
                <Divider/>
                <DialogContent>
                <FormControl component="fieldset">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={customization} onChange={(e) => this.handleChange(e)} name="customization" />}
                            label="Customization"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={withdraw} onChange={(e) => this.handleChange(e)} name="withdraw" />}
                            label="Withdraw"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={user_withdraw} onChange={(e) => this.handleChange(e)} name="user_withdraw" />}
                            label="User withdraw"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={financials} onChange={(e) => this.handleChange(e)} name="financials" />}
                            label="Financials"
                        />
                    </FormGroup>
                </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => this.handleSubmit(user.id, {super_admin: false, customization, user_withdraw, withdraw, financials})}>
                        Save changes
                   </Button>
                 </DialogActions>
                </Dialog>    
            </div>
        )
    }
}

export default EditAdminButton;