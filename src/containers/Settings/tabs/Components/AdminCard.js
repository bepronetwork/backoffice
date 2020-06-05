import React, { Component } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Grid, FormControl, FormGroup, FormControlLabel, Checkbox, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { CheckBoxOutlineBlankIcon, CheckBoxIcon } from 'mdi-react';
import BooleanInput from "./BooleanInput";
import LockAdmin from './LockAdmin';
import { connect } from 'react-redux';

const theme = createMuiTheme({
    palette: {
      primary: { 
        main: '#894798' 
        }
    },
  });

class AdminCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            lock: true,
            loading: false
        };
    }

    componentDidMount() {
        this.projectData(this.props)
    }

    componentWillReceiveProps(props) {
        this.projectData(props);
    }

    projectData = async (props) => {
        const { id, email, name, registered, permission } = this.props.data;

        this.setState({ id, email, name, registered, permission })
    }

    handleChange = (event) => {
        event.persist();
        this.setState(prevState => ({ permission: {
            ...prevState.permission,
            [event.target.name]: event.target.checked }}));
    }

    onChangeSuperAdmin = () => {
        const { super_admin } = this.state.permission;

        this.setState({
            permission: {...this.state.permission, super_admin: !super_admin } })
    }

    unlock = () => {
        this.setState({ lock: false })
    }

    lock = () => {
        this.setState({ lock: true })
    }

    confirmChanges = async () => {
        const { id, permission } = this.state;
        const { profile } = this.props;

        this.setState({...this.state, loading: true });

        await profile.editAdminType({ adminToModify: id, permission: permission });

        this.setState({...this.state, loading: false });
        this.lock();
    }

    render() {
        const { id, email, name, registered, permission, lock, loading } = this.state;

        if (!permission) return null;

        const { super_admin, customization, withdraw, user_withdraw, financials } = permission;

        return (
            <Card className='game-container'>
            <CardBody className="dashboard__card-widget" style={{ width: 305, padding: 20, borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                <div style={{ display: "flex" }}>
                    <h5 className="bold-text">{name}</h5>
                    <p className={`text-small ${registered ? "text-green" : "text-red"} `} style={{ margin: 0, marginLeft: 5 }} >
                    { registered ? "( Registered )" : "( Pending )" }
                </p>
                </div>
                <h5 className="subhead">{id}</h5>
                <p className="dashboard__visitors-chart-title">{email}</p>
                <LockAdmin 
                    unlockField={this.unlock} 
                    lockField={this.lock} 
                    confirmChanges={this.confirmChanges} 
                    isLoading={loading}
                    locked={lock}>
                        <FormControlLabel
                        style={{margin: 0, marginTop: 10 }}
                        control={
                        <BooleanInput
                            checked={super_admin}
                            onChange={this.onChangeSuperAdmin}
                            color="primary"
                            name="isSuperAdmin"
                            disabled={lock}
                            inputProps={{ 'aria-label': 'Super Admin' }}
                        />}
                        label={super_admin ? <h4 style={{ fontSize: 13 }}>Super Admin</h4> 
                        : <h4 style={{ fontSize: 13 }}>Collaborator</h4>}
                        labelPlacement="right"
                        />
                        <hr style={{ margin: 7 }}/>
                        <ThemeProvider theme={theme}>
                        <FormControl component="fieldset" disabled={lock || super_admin}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                        style={{ width: 36, height: 36 }}
                                        color="primary"
                                        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 20 }} />}
                                        checkedIcon={<CheckBoxIcon style={{ fontSize: 20 }} />}
                                        checked={customization || super_admin } onChange={(e) => this.handleChange(e)} name="customization" />}
                                    label={<span style={{ fontSize: "13px" }}>Customization</span>}
                                    style={{ margin: 0 }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                        style={{ width: 36, height: 36 }}
                                        color="primary"
                                        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 20 }} />}
                                        checkedIcon={<CheckBoxIcon style={{ fontSize: 20 }} />}
                                        checked={withdraw || super_admin } onChange={(e) => this.handleChange(e)} name="withdraw" />}
                                    label={<span style={{ fontSize: "13px" }}>Withdraw</span>}
                                    style={{ margin: 0 }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                        style={{ width: 36, height: 36 }}
                                        color="primary"
                                        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 20 }} />}
                                        checkedIcon={<CheckBoxIcon style={{ fontSize: 20 }} />}
                                        checked={user_withdraw || super_admin } onChange={(e) => this.handleChange(e)} name="user_withdraw" />}
                                    label={<span style={{ fontSize: "13px" }}>User withdraw</span>}
                                    style={{ margin: 0 }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                        style={{ width: 36, height: 36 }}
                                        color="primary"
                                        icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 20 }} />}
                                        checkedIcon={<CheckBoxIcon style={{ fontSize: 20 }} />}
                                        checked={financials || super_admin } onChange={(e) => this.handleChange(e)} name="financials" />}
                                    label={<span style={{ fontSize: "13px" }}>Financials</span>}
                                    style={{ margin: 0 }}
                                />
                            </FormGroup>
                        </FormControl>
                        </ThemeProvider>
                </LockAdmin>
            </CardBody>
        </Card>
        )
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(AdminCard);