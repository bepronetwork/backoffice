import React, { Component } from 'react'
import EditLock from '../../../Shared/EditLock.js';
import TextInput from '../../../../shared/components/TextInput';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import { EditableTable } from '../../../../components/index.js';


const defaultState = {
    apiKey: '',
    templateIds:  [{
            templateRegister: 'xxxxxxx',
            templateLogin : 'xxxxxxxxxxx'
        },
        {
            templateRegister: 'yyyyyyy',
            templateLogin : 'yyyyyyy'
        }],
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
        const email = props.profile.getApp().getChatIntegration();
        /*const { apiKey, templateIds } = email;
        this.setState({...this.state, 
            apiKey,
            templateIds
        })*/
    }

    onChangeApiKey = ({name, value}) => {
        this.setState({...this.state, [name] : value })
    }

    onChangeTemplates = async (new_data) => {

        console.log(new_data)
        /*const { profile } = this.props;
        new_data = new_data.map(i => {
            let pl = parseFloat(i.percentageOnLoss);
            if(i.isNew){
                pl = parseFloat(pl/100)
            }
            if(i.isActive != true){return null }
            return {level : parseInt(i.level), percentageOnLoss : pl}
        }).filter(el => el != null)
        let res = await profile.getApp().editAffiliateStructure({structures : new_data});

        await profile.getData();*/
    }

    unlockField = () => {
        this.setState({...this.state, locked : false})
    }

    lockField = () => {
        this.setState({...this.state, locked : true})
    }

    confirmChanges = async () => {
        var { profile } = this.props;
        this.setState({...this.state, isLoading : true});
        await profile.getApp().editEmailIntegration(this.state);
        this.setState({...this.state, isLoading : false, locked: true})
        this.projectData(this.props);
    }


    render() {
        const { isLoading, locked, apiKey, templateIds } = this.state; 
        return (
            <Card>
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
                                    <p className="text-small text-left" style={{marginTop : 10}}><a href="https://www.sendinblue.com" target="_blank">https://getstream.io</a></p>
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
                                    title={'E-mail integration'}
                                    onChange={this.onChangeTemplates}
                                    compareField={'templateRegister'}
                                    columns={[
                                        { title: 'Register Template', field: 'templateRegister' },
                                        { title: 'Login Template', field: 'templateLogin' }
                                    ]}
                                    rawData={templateIds}
                                    data={templateIds.map( v => {
                                        return {
                                            templateRegister: v.templateRegister,
                                            templateLogin: v.templateLogin
                                        }
                                    })}
                                    isEditable={!locked}
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
