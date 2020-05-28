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
import AddAdminCard from './Components/AddAdminCard';

class AdminContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            admins: [],
            filter: null
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
            admins: admins.reverse()
        })
    }

    setAdmins = (admins) => {
        this.setState({ admins: admins });
    }

    onChangeFilter = _.debounce((filter) => {

        if (filter) {
            this.setState({ filter: filter.replace(/\s/g, "").toLowerCase() })
        } else {
            this.setState({ filter: null })
        }

    }, 300);

    render() {
        const { admins, filter } = this.state;

        const headers = [
            { label: "Id", key: "id" },
            { label: "Name", key: "name" },
            { label: "Email", key: "email"},
            { label: "Type", key: "type" }
        ];

        let filteredAdmins;
        
        if (filter) {
            filteredAdmins = admins.filter(admin => admin.name.includes(filter) || admin.email.includes(filter));
        } else {
            filteredAdmins = admins;
        }
        

        const csvData = filteredAdmins.map(row => ({...row, type: row.permission.super_admin ? 'Super admin' : 'Collaborator' }));
        const jsonData = filteredAdmins.map(row => _.pick(row, ['id', 'name', 'email', 'type']));

        return (
            <div>
                <h4>Application Admins</h4>
                <div className='landing__product__widget__small' style={{ marginRight: 15, height : 60, width: 410, padding: 5, textAlign: "right", borderRadius: "5px" }}>
                    <TextField
                    label="Search..."
                    id="search-admin"
                    size="small"
                    onChange={event => this.onChangeFilter(event.target.value)}
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
                    <Col>
                        <AddAdminCard setAdmins={this.setAdmins}/>
                    </Col>
                    {filteredAdmins.map(admin => (
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