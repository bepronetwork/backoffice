import React, { PureComponent } from 'react';
import { Row, Col, CardBody, Card, FormGroup } from 'reactstrap';
import { reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import { ApplicationIcon, DesktopMacDashboardIcon, CoinIcon, EthereumIcon } from 'mdi-react';
import TextInput from '../../../../shared/components/TextInput';
import TextLoop from 'react-text-loop';
import { BackgroundBox, VerticalSection, BetProtocolLogo, Container, CreateAppCard, CardHeader, CardContent, InputLabel, NameInput, DescriptionInput, Footer } from '../styles';
const Back = `${process.env.PUBLIC_URL}/img/dashboard/background-login.png`;
const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;

const words = [
    { id: 0, text: 'BetProtocol' },
    { id: 1, text: 'Scalable' },
    { id: 2, text: 'Secure & Audited' },
    { id: 3, text: 'No Coding Required' },
  ];
  
  const Description = (props) => {
    const { wordList } = props;
  
    return (
      <TextLoop>
        {wordList.map((word) => (
          <span key={word.id}>{word.text}</span>
        ))}
      </TextLoop>
    );
  };

class WizardFormOne extends PureComponent {

	constructor() {
		super();
		this.state = {
            showPassword: false,
            virtual : false
		};
	}

	changeContent = (type, item) => {
		this.setState({[type] : item});
	}

	showPassword = (e) => {
		e.preventDefault();
		this.setState({
		    showPassword: !this.state.showPassword,
		});
    };

    selectMoneyType = () => {
        const { virtual } = this.state;

        this.setState({ virtual : !virtual });
    };

    onChangeName = value => {
        if (value) {
            this.setState({
                name: value
            })
        } else {
            this.setState({
                name: null
            })
        }
    }

    onChangeDescription = value => {
        if (value) {
            this.setState({
                description: value
            })
        } else {
            this.setState({
                description: null
            })
        }
    }

    createApp = async () => {
        try{
            this.setState({isLoading : true});
            let res = await this.props.profile.createApp({
                ...this.state,
                name : this.state.name,
                description :  this.state.description,
                // TO DO : Create Metadata JSON Add on Inputs (Logo and Other Data)
                metadataJSON :  JSON.stringify({}),
                // TO DO : Create MarketType Setup 
                marketType : 0
            });
            this.props.history.push('/home')
        }catch(err){
            console.log(err);
            this.props.showNotification(err.message);
        }
    }

	render() {
        const { virtual } = this.state;
        const { handleSubmit } = this.props;

		return (
            <>
			<BackgroundBox>
			   <VerticalSection>
				   <ul>
					   <BetProtocolLogo />
					   <Description wordList={words} />
				   </ul>
				   <Container>
					   <CreateAppCard>
					   <CardHeader />
						   <CardContent>
                            <h1>Create your First Application</h1>
                                <FormGroup>
                                    <InputLabel for="name">App</InputLabel>
                                <NameInput
                                    label="App"
                                    name="name"
                                    type="text"
                                    // defaultValue={this.state.username}
                                    onChange={(e) => this.onChangeName(e.target.value)}
                                />
                                </FormGroup>
                                <FormGroup>
                                    <InputLabel for="description">Description</InputLabel>
                                <DescriptionInput
                                    label="Description"
                                    name="description"
                                    type="text"
                                    // defaultValue={this.state.username}
                                    onChange={(e) => this.onChangeDescription(e.target.value)}
                                />
                                </FormGroup>
                                <div style={{width : "100%", display : "inline-flex", justifyContent: "center" }}>
                                    <div style={{ width : 130, textAlign : "center" }}>
                                        <Card style={{paddingBottom : 10, cursor : "pointer"}} onClick={() => this.selectMoneyType('real')}>
                                            <CardBody style={{padding : 10, backgroundColor: !virtual ? "rgba(137, 71, 152, 0.1)" : "#fff", border: !virtual ? "1px solid #894798" : "1px solid #bebdbd"}}>
                                                <span style={{ display : "block", paddingBottom : 6}}><EthereumIcon color="grey"/></span>
                                                <span>
                                                    <p className="text-small">
                                                        Real Money
                                                    </p>
                                                </span>
                                            </CardBody>
                                        </Card>
                                    </div>
                                    <div style={{ width : 130, marginLeft : 30, textAlign : "center" }}>
                                        <Card style={{paddingBottom : 10, cursor : "pointer"}} onClick={() => this.selectMoneyType('fake')}>
                                            <CardBody style={{padding : 10, backgroundColor: virtual ? "rgba(137, 71, 152, 0.1)" : "#fff", border: virtual ? "1px solid #894798" : "1px solid #bebdbd"}}>
                                                <span style={{ display : "block", paddingBottom : 6}}><CoinIcon color="grey"/></span>
                                                <span>
                                                    <p className="text-small">
                                                        Fake Money
                                                    </p>
                                                </span>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </div>
                    
                            <div className="account__btns" style={{ justifyContent: "center" }}>
                                <button disabled={this.state.isLoading} style={{maxWidth : 350, marginTop  :30}}  onClick={() => this.createApp()} c className="btn btn-primary account__btn">
                                    {this.state.isLoading ? <img src={loading} style={{width : 20}}/> : 'Register App'}
                                </button>
                            </div>

                    </CardContent>
                    </CreateAppCard>
                        <Footer>
                            <span>
                                <b>@BetProtocol</b> Technology is a SaaS Platform that provides
                                infrastructure for Gaming Applications
                            </span>
                        </Footer>
                </Container>
                </VerticalSection>
            </BackgroundBox>
        </>           
		);
	}
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}



export default compose(reduxForm({
	form: 'wizard', //                 <------ same form name
}),  connect(mapStateToProps))(WizardFormOne);


