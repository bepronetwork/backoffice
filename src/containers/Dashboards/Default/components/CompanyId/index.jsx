/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';
import { DirectionsIcon, EditIcon } from 'mdi-react';
import { emptyObject } from '../../../../../lib/misc';
import { compareIDS } from '../../../../../lib/string';
import { Container, AppDetails, Edit, EditButton, BankAddress } from './styles';
import EditDialog from './EditDialog';
import { connect } from 'react-redux';

const Ava = `${process.env.PUBLIC_URL}/img/dashboard/brand.jpg`;

const defaultProps = {
    platformAddress : '',
    platformName : 'N/A',
    platformId : 'N/A',
    platformDescription : 'N/A',
    ticker : 'No Currency Chosen',
    platformAddressLink : 'N/A'
}

class CompanyId extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
    };


    constructor(props) {
        super(props);
        this.state = { ...defaultProps, open: false };
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }
    
    projectData = async (props) => {
        let app = props.app;
        const { currency } = props;

        if(emptyObject(currency)){return null};

        if(!props.data.wallet.data.wallet){return null}
        let wallets = props.data.wallet.data.wallet;
        const wallet = wallets.find( w => compareIDS(w.currency._id, currency._id));
        const bank_address = wallet ? wallet.bank_address : null;
        const link_url = wallet ? wallet.link_url : null;

        this.setState({...this.state, 
            platformAddress : bank_address ? `${bank_address.substring(0, 6)}...${bank_address.substring(bank_address.length - 2)}` : defaultProps.platformAddress,
            platformId  : app.getId(),
            ticker : currency.ticker ? currency.ticker : defaultProps.ticker,
            currencyImage: currency.image ? currency.image : null,
            platformDescription  :app.getDescription() ? app.getDescription() : defaultProps.platformDescription,
            platformAddressLink : link_url,
        })
    }

    handleOpenDialog = () => {
        this.setState({ open: true });
    }

    handleCloseDialog = () => {
        this.setState({ open: false });
    }

    setAppInfo = ({ name, description }) => {
        this.setState({
            platformName: name,
            platformDescription: description
        })
    }

    render() {
        let { app } = this.props;
        const { profile } = this.props;
        let { platformName } = this.state;
        const { ticker, currencyImage, platformAddressLink, platformAddress, platformDescription, open } = this.state;

        const isSuperAdmin = profile.User.permission.super_admin;

        platformName =  app.getName() ? app.getName() : platformName;

        return (
            <Card style={{ padding: "0px 15px", paddingBottom: 30 }}>
                <CardBody className="dashboard__card-widget" style={{ minWidth: 250, borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none", padding: 15 }}>
                    <Container>
                        <AppDetails>
                            <img className="company-logo-card" src={Ava} alt="avatar" />
                            <div className="name-and-description">
                                <h4 className={"bold-text dashboard__total-stat"} style={{ margin: 0, padding: 0 }}>{platformName}</h4>
                                <p className="dashboard__total-stat">{platformDescription}</p>
                            </div>
                        </AppDetails>
                        <BankAddress>
                            <div style={{ display: "flex", alignItems: "flex-end" }}>
                                { platformAddressLink ?
                                <a target={'__blank'} className='ethereum-address-a' href={platformAddressLink}>
                                    <p className="ethereum-address-name" style={{ padding: '0px 5px' }}> <DirectionsIcon className='icon-ethereum-address' />{platformAddress}</p>
                                </a>
                                :
                                    <p className="ethereum-address-name" style={{ padding: '0px 5px' }}> <DirectionsIcon className='icon-ethereum-address' />{platformAddress}</p>
                                }
                                { currencyImage && (
                                    <img src={currencyImage} style={{ width: 20, height: 20, margin: "2px 5px"}}/>
                                )}
                            </div>
                            { isSuperAdmin && (
                                <Edit>
                                    <EditDialog open={open} handleCloseDialog={this.handleCloseDialog} setAppInfo={this.setAppInfo}/>
                                    <EditButton style={{ margin: 0, marginTop: 10 }} onClick={() => this.handleOpenDialog()}>
                                        <p style={{ color: "white", fontSize: 12 }}><EditIcon className="deposit-icon"/> Edit </p> 
                                    </EditButton>
                                </Edit>
                            )}
                        </BankAddress>
                    </Container>
                </CardBody>
            </Card>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(CompanyId);
