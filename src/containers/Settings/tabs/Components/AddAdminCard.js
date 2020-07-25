import React, { Component } from 'react'
import { Card, CardBody } from 'reactstrap';
import { TextField } from '@material-ui/core';
import LockAdmin from './LockAdmin';
import _ from 'lodash';
import { connect } from 'react-redux';

class AddAdminCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            lock: true,
            loading: false,
            email: null
        };
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
        this.setState({ lock: true, email: "" })
    }

    confirmChanges = async () => {
        const { email } = this.state;
        const { profile, setAdmins } = this.props;

        if (email) {
            this.setState({...this.state, loading: true });

            await profile.addAdmin({ email: email });

            const admins = await profile.getAdminByApp();

            setAdmins(admins.reverse());

            this.setState({...this.state, loading: false });
            this.lock();
        } else {
            this.lock();
        }
    }

    onChangeEmail = _.debounce((email) => {

        if (email) {
            this.setState({ email: email.replace(/\s/g, "").toLowerCase() })
        } else {
            this.setState({ email: null })
        }

    }, 20);

    render() {

        const { lock, loading, email } = this.state;

        return (
            <Card className='game-container'>
            <CardBody className="dashboard__card-widget" style={{ width: 310, minHeight: 300, padding: "50px 20px", borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                <h4 className="bold-text" style={{ marginBottom: 20 }}>Add new admin</h4>
                <p className="dashboard__visitors-chart-title" style={{ marginBottom: 20 }}>We will send a confirmation email</p>
                <LockAdmin 
                    unlockField={this.unlock} 
                    lockField={this.lock} 
                    confirmChanges={this.confirmChanges} 
                    isLoading={loading}
                    locked={lock}>

                <TextField
                    disabled={lock}
                    value={email}
                    style={{ marginBottom: 50 }}
                    label="E-mail"
                    id="add-admin"
                    size="small"
                    fullWidth
                    onChange={event => this.onChangeEmail(event.target.value)}
                    />

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

export default connect(mapStateToProps)(AddAdminCard);