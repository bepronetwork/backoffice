import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import TextInput from '../../../../shared/components/TextInput';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import { EditableTable } from '../../../../components/index.js';
import { throwUIError } from '../../../../lib/errors';
import _ from 'lodash';


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

    onChangeApiKey = ({name, value}) => {
        this.setState({...this.state, [name] : value })
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
            <Card style={{ marginLeft: 15 }}>
                <CardBody>
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
                                    <p className="text-left secondary-text" style={{marginTop: 40, marginBottom: 40}}> Add your API Key to integrate </p>
                                </div>

                                <TextInput
                                    label={'API Key'}
                                    name={'apiKey'}
                                    type={'text'} 
                                    value={apiKey}
                                    defaultValue={apiKey}
                                    disabled={locked}
                                    changeContent={(name, value) => this.onChangeApiKey({name, value})}
                                />
                        </Col>
                    </Row>
                 
                    <Row>
                        <Col md={12}>
                            <div style={{paddingTop : 10}} >
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
