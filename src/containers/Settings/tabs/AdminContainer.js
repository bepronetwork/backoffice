import React from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import _ from 'lodash';
import AdminCard from './Components/AdminCard';
import { TextField, Grid } from '@material-ui/core';
import { Button as MaterialButton } from "@material-ui/core";
import { CSVLink } from 'react-csv';
import { TableIcon, JsonIcon } from 'mdi-react';
import { export2JSON } from '../../../utils/export2JSON';
import AddAdminCard from './Components/AddAdminCard';
import Skeleton from "@material-ui/lab/Skeleton";

const AdminSkeleton = () => {
    return (
        <Card className='game-container'>
            <CardBody className="dashboard__card-widget" style={{ width: 310, minHeight: 300, padding: "50px 20px", borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                <Skeleton variant="rect" width="80%" height={20}/>
                <br/>
                <Skeleton variant="rect" width="80%" height={20}/>
                <hr/>
                { _.times(4, () => <Skeleton variant="rect" width="60%" height={20} style={{ margin: "10px 0px" }}/> )}
                <br/>
                <Skeleton variant="rect" width="30%" height={30}/>
            </CardBody>
    </Card>
    )
}

class AdminContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            admins: [],
            filter: null,
            isLoading: false
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

        this.setState({ isLoading: true });

        const admins = await profile.getAdminByApp();

        this.setState({
            admins: admins.reverse(),
            isLoading: false
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
        const { admins, filter, isLoading } = this.state;

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
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: 5, margin: "15px 0px", textAlign: "right", borderRadius: "5px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                    <TextField
                    style={{ margin: "0px 10px" }}
                    label="Search..."
                    id="search-admin"
                    size="small"
                    onChange={event => this.onChangeFilter(event.target.value)}
                    />
                    <div style={{ display: "flex" }}>
                        <CSVLink data={csvData} filename={"admins.csv"} headers={headers}>
                            <MaterialButton variant="contained" size="small" style={{ textTransform: "none", backgroundColor: "#008000", color: "#ffffff", boxShadow: "none", margin: 10}}>
                                <TableIcon style={{marginRight: 7}}/> CSV
                            </MaterialButton>
                        </CSVLink>
                        <MaterialButton onClick={() => export2JSON(jsonData, "admins")} variant="contained" size="small" style={{ textTransform: "none", boxShadow: "none", margin: 10}}>
                            <JsonIcon style={{marginRight: 7}}/> JSON
                        </MaterialButton>
                    </div>
                </div>
                <hr/>
                <Grid container spacing={3} justify="flex-start">
                    <Grid item>
                        <AddAdminCard setAdmins={this.setAdmins}/>
                    </Grid>
                    { isLoading ? (
                        _.times(3, () => (
                            <Grid item>
                                <AdminSkeleton />
                            </Grid>
                        ))
                    ) : (
                        filteredAdmins.map(admin => (
                            <Grid item>
                                <AdminCard data={admin}/>
                            </Grid>
                        ))
                    )}
                </Grid>
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