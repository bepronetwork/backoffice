import React, { Component } from 'react'
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import { List, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { Button as MaterialButton } from '@material-ui/core';
import { Button, Col } from 'react-bootstrap';
import { ExpandMoreIcon } from 'mdi-react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import _ from 'lodash';

class UserBetsFilter extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            currencies: []
        }
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    projectData = async(props) => {
        const { profile } = props;

        let app = await profile.getApp();
        const variables = await app.getEcosystemVariables()
        const appCurrencies = variables.data.message.currencies;

        this.setState(state => ({ currencies: appCurrencies}));

    }

    setLoadingStatus = (status) => {
        this.setState(state => ({ loading: status }));
    }

    getCurrency = (ticker) => {

        const currencies = this.state.currencies;

        if (currencies.filter(currency => currency.ticker === ticker)[0]) {
            return currencies.filter(currency => currency.ticker === ticker)[0]._id;
        } else {
            return null
        }
    }

    handleData = async (data) => {
        const { setLoading, setData, profile } = this.props;

        const formData = Object.assign({}, data);

        this.setLoadingStatus(true);
        setLoading(true);

        if (formData.currency) {
            formData.currency = this.getCurrency(formData.currency.toUpperCase());
        }

        const filters = _.pickBy(formData, _.identity);
        const bets = await profile.getApp().getAllBets({ filters });
        
        if (bets.data.status === 200) {
            setData(bets.data.message);
        } else {
            setData([]);
        }

        this.setLoadingStatus(false);
        setLoading(false);
        
    }

    clear = async (resetForm) => {
        const { setLoading, setData, profile } = this.props;

        resetForm({})

        setLoading(true);

        const bets = await profile.getApp().getAllBets({ filters: {}});

        if (bets.data.status === 200) {
            setData(bets.data.message);
        } else {
            setData([]);
        }

        setLoading(false);

    }

    render() {
        const loading = this.state.loading;

        return (
            <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end', paddingBottom: 20}}>
                <ExpansionPanel elevation={0} style={{position: 'absolute', zIndex: 10, width: 300, marginTop: '-40px', border: '1px solid rgba(0, 0, 0, 0.2)'}}>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="filters"
                    id="filter-head"
                    >
                    <h6>Show filters</h6>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{paddingBottom: 0, width: 300}}>
                        <Col style={{padding: 0}}>
                        <Formik
                        initialValues={{
                            bet: "",
                            currency: "",
                            game: "",
                            size: 100,
                            offset: null
                        }}
                        onSubmit={data => this.handleData(data)}
                        >
                        {({ handleChange, handleSubmit, resetForm, values }) => (
                            <>
                            <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
                                <MaterialButton size="small" variant="outlined" 
                                style={{ marginLeft: 0, marginTop: 5, marginBottom: 5, alignSelf: 'end', textTransform: 'none' }} 
                                onClick={() => this.clear(resetForm)}
                                >
                                    Clear
                                </MaterialButton>
                            </div>
                            <Form onSubmit={handleSubmit}>
                            <List style={{width: 250, paddingTop: 0}}>
                                    <List item key="bet">
                                    <TextField
                                        id="bet"
                                        name="bet"
                                        type="text"
                                        placeholder="Bet Id"
                                        onChange={handleChange}
                                        value={values.bet}
                                        fullWidth
                                    />
                                    </List>
                                    <List item key="currency">
                                    <TextField
                                        id="currency"
                                        name="currency"
                                        type="text"
                                        placeholder="Currency Ticker"
                                        onChange={handleChange}
                                        value={values.currency}
                                        fullWidth
                                    />
                                    </List>
                                    <List item key="game">
                                    <TextField
                                        id="game"
                                        name="game"
                                        type="text"
                                        placeholder="Game Id"
                                        onChange={handleChange}
                                        value={values.game}
                                        fullWidth
                                    />
                                    </List>
                                    <List item key="size">
                                    <TextField
                                        id="size"
                                        name="size"
                                        type="number"
                                        placeholder="Size"
                                        onChange={handleChange}
                                        value={values.size}
                                        fullWidth
                                    />
                                    </List>
                                    <List item key="offset">
                                    <TextField
                                        id="offset"
                                        name="offset"
                                        type="number"
                                        placeholder="Offset"
                                        onChange={handleChange}
                                        value={values.offset}
                                        fullWidth
                                        disabled={true}
                                    />
                                    </List>
                            <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                                <Button className="icon" size="sm" style={{ height: 40, marginLeft: 0, marginTop: 5, marginBottom: 5, alignSelf: 'end' }} onClick={handleSubmit}>
                                    {loading ? 'Searching...' : 'Search'}
                                </Button>
                            </div>
                            </List>
                            </Form>
                            </>
                            )}
                        </Formik>
                        </Col>
                     </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        profile : state.profile
    };
}

export default compose(connect(mapStateToProps))(UserBetsFilter);