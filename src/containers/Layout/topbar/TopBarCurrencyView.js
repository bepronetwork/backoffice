import React from 'react';
import { Collapse } from 'reactstrap';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { setLoadingStatus } from '../../../redux/actions/loadingAction';
import { setCurrencyView } from '../../../redux/actions/currencyReducer';
import { connect } from "react-redux";
import _ from 'lodash';
import store from '../../App/store';

const renderCurrency = ({currency}) => (
    <span className="topbar__language-btn-title" style={{height : 20}}>
        <img src={currency.image} style={{width : 15, height : 'auto'}} alt="image" />
        <p style={{marginTop : -3}}>{currency.ticker}</p>
    </span>
)

const selectCurrency = () => (
    <span className="topbar__language-btn-title" style={{height : 20}}>
        <p style={{marginTop : -3}}>CURRENCY</p>
    </span>
)

class TopBarCurrencyView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currencies : [],
            collapse: false,
            mainButtonContent: null
        };
    }

    componentDidMount(props){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData(props){
        var { profile, currency } = props;
        const { virtual } = profile.getApp().getParams();

        const currencies = profile.getApp().getSummaryData('walletSimple').data.map( w => w.currency).filter(c => c.virtual === virtual );

        this.setState({
            currencies,
            currency,
            mainButtonContent : !_.isEmpty(currency) ? renderCurrency({currency : currency}) : selectCurrency()
        });
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    };

    changeCurrency = async ({currency}) => {
        store.dispatch(setLoadingStatus(true));
        await store.dispatch(setCurrencyView(currency));
        this.toggle();
        await this.props.profile.getApp().getSummary();
        this.props.profile.update();
        store.dispatch(setLoadingStatus(false));
    };

    render() {
        const { currencies } = this.state;

        return (
            <div className="topbar__collapse topbar__collapse--language">
                <button className="topbar__btn" onClick={this.toggle}>
                    {currencies.length > 0
                    ?
                        this.state.mainButtonContent
                    :
                        <span className="topbar__currency-btn-title" style={{height : 20}}>
                            <p style={{marginTop : -3}}>No currencies installed</p>
                        </span>
                    }
                    <DownIcon className="topbar__icon" />
                </button>
                {currencies.length
                ?
                    <Collapse
                        isOpen={this.state.collapse}
                        className="topbar__collapse-content topbar__collapse-content--language"
                    >
                        {currencies.map( c => {
                            return (
                                <button
                                    className="topbar__language-btn"
                                    type="button"
                                    onClick={() => this.changeCurrency({currency : c})}
                                    key={c.id}
                                >
                                    {renderCurrency({currency : c})}
                                </button>
                            )
                        })}
                    </Collapse>
                :
                    null
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile,
        currency : state.currency
    };
}

export default connect(mapStateToProps)(TopBarCurrencyView);

