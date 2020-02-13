import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from "react-redux";
import { EditableTable } from '../../../components';
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
    projectData = (props) => {
        this.setState({...this.state, authorizedAddAdmin : [] });
    }
    onChange = async (new_data) => {
        let data = new_data.filter(n => n.isNew === true)[0];
        const { profile } = this.props;
        let res = await profile.addAdmin({email: data.email });
        console.log(res);
    }
    render = () => {
        const { authorizedAddAdmin } = this.state;
        return (
            <div>
                <h4> Manage here more Users Admins </h4>
                {/* <p className='text-grey'> Authorized Addresses have the ability to allow user withdraws, not to withdraw the bankroller money, that is only for the ownerAddress </p> */}
                <hr></hr>
                <Row>
                    <Col lg={12}>
                        <EditableTable
                            title={'Add Email'}
                            onChange={this.onChange}
                            compareField={'email'}
                            columns={[
                                { title: 'Email', field: 'email'}
                            ]}
                            rawData={authorizedAddAdmin}
                            data={authorizedAddAdmin.map( v => {
                                return {
                                    email: v.email
                                }
                            })}
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