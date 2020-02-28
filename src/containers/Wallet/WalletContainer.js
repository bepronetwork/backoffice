import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import LiquidityInfo from './components/LiquidityInfo';
import LiquidityWalletWidget from './components/LiquidityWalletWidget';
import { WalletIcon, StoreIcon } from 'mdi-react';
import TabsContainer  from '../../shared/components/tabs/Tabs'
import CurrencyStore from './CurrencyStore';
const image = `${process.env.PUBLIC_URL}/img/dashboard/empty.png`;

class WalletContainer extends React.Component{

    constructor(props){
        super(props)
    }

    render = () => {
        const { profile } = this.props;
        
        let wallets = (profile.getApp().getSummaryData('walletSimple')).data;

        return (
            <Container className="dashboard">
                <TabsContainer 
                    items={
                        [
                            {
                                title : 'My Wallet',
                                container : (
                                    <>
                                        <Row>
                                            <Col lg={6}>
                                                <LiquidityInfo/>
                                            </Col>
                                        </Row> 
                                        <Row>
                                            {wallets && wallets.length > 0 ? 
                                                wallets.map( w => {
                                                    return (
                                                        <Col md={6} style={{maxWidth: `360px`}}>
                                                            <LiquidityWalletWidget data={{
                                                                wallet : w,
                                                                app : this.props.profile.getApp()
                                                            }} {...this.props}/>
                                                        </Col>
                                                    )
                                                })
                                            : 
                                            <div>
                                                <h4>You have no Currencies enabled currently</h4>
                                                <img src={image} style={{width :'30%', marginTop : 20}}/>
                                            </div>
                                            }
                                        </Row>
                                    </>
                                ),
                                icon : <WalletIcon/>
                            },
                            {
                                title : 'Currency Store',
                                container : (
                                    <CurrencyStore/>
                                ),
                                icon : <StoreIcon/>
                            }
                        ]
                    }
                />
          </Container>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

WalletContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(WalletContainer);

