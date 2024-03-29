import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import { EditableTable } from '../../../../components/index.js';
import { throwUIError } from '../../../../lib/errors';

import { Actions, InputField } from './styles'


const defaultState = {
    apiKey: '',
    templateIds: [],
    locked: true
}

const sendinblue = `${process.env.PUBLIC_URL}/img/landing/sendinblue.svg`;

class EmailTab extends Component {
    constructor(props){
        super(props);
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { locked } = this.state;
        
        if (locked) {
            const email = props.profile.getApp().getEmailIntegration();
            const { apiKey, templateIds } = email;

            this.setState({...this.state, 
                apiKey,
                templateIds
            });
        }
    }

    handleChangeAPIKey = value => {
        this.setState({ apiKey: value })
    }

    onChangeTemplates = async (new_data) => {
        const newArray = new_data.map(a =>
            a.template_id
              ? { ...a, template_id: parseInt(a.template_id) }
              : a
        );

        this.setState({...this.state, templateIds : newArray });
    }

    unlockField = () => {
        this.setState({...this.state, locked : false})
    }

    lockField = () => {
        this.setState({...this.state, locked : true})
    }

    confirmChanges = async () => {
        const { profile } = this.props;
        const { apiKey, templateIds } = this.state;
        var errorMessage = null;

        try {
            if(!apiKey){
                errorMessage = "API Key is empty.";
            }

            let templateArr = templateIds.filter(n => n.template_id == null)
            if(templateArr.length) {
                errorMessage = "Template Id cannot be null.";
            }

            if(errorMessage){
                return throwUIError(errorMessage);
            }
                
            this.setState({...this.state, isLoading : true});
            await profile.getApp().editEmailIntegration(this.state);
            this.setState({...this.state, isLoading : false, locked: true})
            this.projectData(this.props);
            
        } catch(err){
            console.log(err);
            throwUIError(err);
        }
    }


    render() {
        const { isLoading, locked, apiKey, templateIds } = this.state; 
        return (
            <Card>
                <CardBody style={{ margin: 10, borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                <EditLock 
                    isLoading={isLoading} 
                    unlockField={this.unlockField} 
                    lockField={this.lockField} 
                    confirmChanges={this.confirmChanges} 
                    type={'emailTab'} 
                    locked={locked}
                    >
                    <Row>
                        <Col md={12}>
                                <div>
                                    <img style={{width : 150, marginTop : 10}} src={sendinblue}></img>
                                    <p className="text-small text-left" style={{marginTop : 10}}><a href="https://www.sendinblue.com" target="_blank">https://www.sendinblue.com</a></p>
                                </div>

                                <Actions>
                                    <p className="text-left secondary-text" style={{ margin: "15px 0px" }}> Add your credentials to integrate </p>

                                    <p>API Key</p>
                                    <InputField disabled={locked || isLoading} value={apiKey} onChange={(e) => this.handleChangeAPIKey(e.target.value)}/>
                                </Actions>
                        </Col>
                    </Row>
                 
                    <Row>
                        <Col md={12} style={{ padding: 0, marginTop: 15 }}>
                            <div>
                                <EditableTable
                                    title={''}
                                    onChange={this.onChangeTemplates}
                                    compareField={'functionName'}
                                    columns={[
                                        { title: 'Contact List Id', field: 'contactlist_Id', type : 'numeric', editable : 'never' },
                                        { title: 'Function Name', field: 'functionName', type: 'string', editable : 'never' },
                                        { title: 'Template Id', field: 'template_id', type : 'numeric' }
                                    ]}
                                    rawData={templateIds}
                                    data={templateIds.map( v => {
                                        return {
                                            contactlist_Id: v.contactlist_Id,
                                            functionName: v.functionName,
                                            template_id: v.template_id
                                        }
                                    })}
                                    isEditable={!locked}
                                    enableDelete={false}
                                    enableAdd={false}
                                />
                            </div>
                        </Col>
                    </Row>
                    </EditLock>
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

export default connect(mapStateToProps)(EmailTab);
