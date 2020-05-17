import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from "react-redux";
import _ from 'lodash';
import AdminCard from './Components/AdminCard';
import { TextField } from '@material-ui/core';
import { Button as MaterialButton } from "@material-ui/core";
import { CSVLink } from 'react-csv';
import { TableIcon, JsonIcon } from 'mdi-react';
import { export2JSON } from '../../../utils/export2JSON';

class AdminContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            admins: []
        };
    }

    componentDidMount() {
        this.projectData(this.props)
    }

    componentWillReceiveProps(props) {
        this.projectData(props);
    }

    projectData = async (props) => {
        const { profile } = props;
        const admins = await profile.getAdminByApp();

        this.setState({
            admins: admins
        })
    }

    render() {
        const { admins } = this.state;

        const headers = [
            { label: "Id", key: "id" },
            { label: "Name", key: "name" },
            { label: "Email", key: "email"},
            { label: "Type", key: "type" }
        ];

        const csvData = admins.map(row => ({...row, type: row.permission.super_admin ? 'Super admin' : 'Collaborator' }));
        const jsonData = csvData.map(row => _.pick(row, ['id', 'name', 'email', 'type']));

        return (
            <div>
                <h4>Application Admins</h4>
                <div className='landing__product__widget__small' style={{ marginRight: 15, height : 60, width: 410, padding: 5, textAlign: "right", borderRadius: "5px" }}>
                    <TextField
                    label="Search..."
                    id="search-admin"
                    size="small"
                    />
                    <CSVLink data={csvData} filename={"admins.csv"} headers={headers}>
                        <MaterialButton variant="contained" size="small" style={{ textTransform: "none", backgroundColor: "#008000", color: "#ffffff", boxShadow: "none", margin: 10}}>
                            <TableIcon style={{marginRight: 7}}/> CSV
                        </MaterialButton>
                    </CSVLink>
                    <MaterialButton onClick={() => export2JSON(jsonData, "admins")} variant="contained" size="small" style={{ textTransform: "none", boxShadow: "none", margin: 10}}>
                        <JsonIcon style={{marginRight: 7}}/> JSON
                    </MaterialButton>
                </div>
                <hr/>
                <Row>
                    {admins.map(admin => (
                        <Col>
                            <AdminCard data={admin}/>
                        </Col>
                    ))}
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

export default connect(mapStateToProps)(AdminContainer);