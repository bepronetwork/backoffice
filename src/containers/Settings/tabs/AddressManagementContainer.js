import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from "react-redux";
import { EditableTable } from '../../../components';

const defaultProps = {
    authorizedAddresses : [],
}

class AddressManagementContainer extends React.Component{

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
        let { profile } = props;
        let app = profile.getApp();
        this.setState({...this.state, 
            authorizedAddresses : app.getInformation('authorizedAddresses') ? app.getInformation('authorizedAddresses').map( a => {
                return {
                    address : a
                }
            }) : defaultProps.authorizedAddresses
        })
    }

    onChange = async (new_data) => {
        const { profile } = this.props;
        let addressObject = new_data.filter(n => n.isNew == true)[0];
        if(addressObject){
            //Added
            await profile.getApp().authorizeAddress({address : addressObject.address});
        }else{
            //Removed
            let olderAddresses = profile.getApp().getInformation('authorizedAddresses');
            let differenceAddressObject = olderAddresses.filter(x => !new_data.map( a => a.address).includes(x))[0];
            await profile.getApp().unauthorizeAddress({address : differenceAddressObject});
        }
        await profile.getApp().updateAppInfoAsync();
        await profile.update();
    }

    render = () => {
        const { authorizedAddresses } = this.state;

        return (
            
            <div>
                <h4> Manage here your Addresses </h4>
                <p className='text-grey'> Authorized Addresses have the ability to allow user withdraws, not to withdraw the bankroller money, that is only for the ownerAddress </p>
                <hr></hr>
                <Row>
                    <Col lg={12}>
                        <EditableTable
                            title={'Authorized Addresses'}
                            onChange={this.onChange}
                            compareField={'address'}
                            columns={[
                                { title: 'Address', field: 'address'}
                            ]}
                            rawData={authorizedAddresses}
                            data={authorizedAddresses.map( v => {
                                return {
                                    address: v.address
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

export default connect(mapStateToProps)(AddressManagementContainer);

