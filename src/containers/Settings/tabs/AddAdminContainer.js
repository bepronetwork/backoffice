import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from "react-redux";
import { EditableTable } from '../../../components';
import EditAdminButton from './EditAdminButton';
import { Tooltip } from '@material-ui/core';
import _ from 'lodash';
import { CSVLink } from "react-csv";
import { Button as MaterialButton } from "@material-ui/core";
import { export2JSON } from '../../../utils/export2JSON';
import { TableIcon, JsonIcon } from 'mdi-react';


const defaultProps = {
    authorizedAddAdmin : [],
}
class AddAdminContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = defaultProps;
    }
    componentDidMount(){
        this.projectData(this.props)
    }
    componentWillReceiveProps(props){
        this.projectData(props);
    }
    projectData = async (props) => {
        let { profile } = props;
        let list = (await profile.getAdminByApp()).reverse();

        this.setState({...this.state, authorizedAddAdmin : list });
    }
    onChange = async (new_data) => {
        const { profile } = this.props;
        let data = new_data.filter(n => n.isNew === true)[0];
        if(data) {
            await profile.addAdmin({email: data.email });
        } else {
            console.log(new_data);
        }
        await profile.update();
    }

    renderEmail = (user) => {   

        const permissions = user.permission;

        return (
        <Tooltip title={`Customization: ${permissions.customization} |
                         Financials: ${permissions.financials} |
                         Withdraw: ${permissions.withdraw} |
                         User Withdraw: ${permissions.user_withdraw}`} placement="top">
            <p>{user.email}</p>
        </Tooltip>
        )
    }
    render = () => {
        const { authorizedAddAdmin } = this.state;
        const { profile } = this.props;

        const headers = [
            { label: "Id", key: "id" },
            { label: "Name", key: "name" },
            { label: "Email", key: "email"},
            { label: "Type", key: "type" }
        ];

        const csvData = authorizedAddAdmin.map(row => ({...row, type: row.permission.super_admin ? 'Super admin' : 'Collaborator' }));
        const jsonData = csvData.map(row => _.pick(row, ['id', 'name', 'email', 'type']));

        return (
            <div>
                <h4> Application Admins </h4>
                {/* <p className='text-grey'> Authorized Addresses have the ability to allow user withdraws, not to withdraw the bankroller money, that is only for the ownerAddress </p> */}
                <hr></hr>
                <Row>
                    <Col lg={12}>
                        <div style={{ display: "flex", justifyContent: "flex-end"}}>
                            <CSVLink data={csvData} filename={"admins.csv"} headers={headers}>
                                <MaterialButton variant="contained" size="small" style={{ textTransform: "none", backgroundColor: "#008000", color: "#ffffff", boxShadow: "none", margin: 10}}>
                                    <TableIcon/> CSV
                                </MaterialButton>
                            </CSVLink>
                            <MaterialButton onClick={() => export2JSON(jsonData, "admins")} variant="contained" size="small" style={{ textTransform: "none", boxShadow: "none", margin: 10}}>
                                <JsonIcon/> JSON
                            </MaterialButton>
                        </div>
                        <EditableTable
                            title={''}
                            onChange={this.onChange}
                            compareField={'email'}
                            columns={[
                                { title: 'Email', field: 'email'}, 
                                { title: 'Status', field: 'status', editable : 'never'},
                                { title: 'Type', field: 'adminType', editable : 'never'}
                            ]}
                            rawData={authorizedAddAdmin}
                            data={authorizedAddAdmin.map( v => {
                                return {
                                    email: this.renderEmail(v),
                                    status: ((v.registered === true) ? 'Registered' : 'Pending'),
                                    adminType: <EditAdminButton profile={profile} user={v}/>
                                }
                            })}
                            enableUpdate={false}
                            enableDelete={false}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(AddAdminContainer);