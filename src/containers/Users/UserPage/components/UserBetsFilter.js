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

const formFields = [
    {
        id: 0,
        name: "bet",
        placeholder: "Bet Id",
        type: "text",
        disabled: false
    },
    {
        id: 1,
        name: "currency",
        placeholder: "Currency Ticker",
        type: "text",
        disabled: false
    },
    {
        id: 2,
        name: "game",
        placeholder: "Game Id",
        type: "text",
        disabled: false
    },
    {
        id: 3,
        name: "size",
        placeholder: "Size",
        defaultValue: 100,
        type: "number",
        disabled: false
    },
    {
        id: 4,
        name: "offset",
        placeholder: "Offset",
        type: "number",
        disabled: true
    }
  ];

class UserBetsFilter extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false
        }
    }

    setLoadingStatus = (status) => {
        this.setState(state => ({ loading: status }));
    }

    getCurrency = async (ticker) => {
        let app = await this.props.profile.getApp();
        const variables = await app.getEcosystemVariables()
        const currencies = variables.data.message.currencies;

        if (currencies.filter(currency => currency.ticker === ticker)[0]) {
            return currencies.filter(currency => currency.ticker === ticker)[0]._id;
        } else {
            return null
        }
    }

    handler = async (data) => {
        this.setLoadingStatus(true);
        this.props.setLoading(true);

        if (data.currency) {
            data.currency = await this.getCurrency(data.currency.toUpperCase());
        }

        const filters = _.pickBy(data, _.identity);
        const bets = await this.props.profile.getApp().getUserBets({user: this.props.user._id, filters});
        
        if (bets.data.status === 200) {
            this.props.setData(bets.data.message.map(app => app.bets));
        } else {
            this.props.setData([]);
        }
        this.setLoadingStatus(false);
        this.props.setLoading(false);
        
    }

    clear = async () => {
        this.props.setLoading(true);

        const bets = await this.props.profile.getApp().getUserBets({user: this.props.user._id});

        if (bets.data.status === 200) {
            this.props.setData(bets.data.message.map(app => app.bets));
        } else {
            this.props.setData([]);
        }

        this.props.setLoading(false);

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
                        <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
                        <MaterialButton size="small" variant="outlined" style={{ marginLeft: 0, marginTop: 5, marginBottom: 5, alignSelf: 'end', textTransform: 'none' }} onClick={this.clear}>
                            Clear
                        </MaterialButton>
                        </div>
                        <Formik
                        initialValues={{
                            bet: null,
                            currency: null,
                            game: null,
                            size: 100,
                            offset: null
                        }}
                        onSubmit={data => this.handler(data)}
                        >
                        {({ handleChange, handleBlur, handleSubmit }) => (
                            <>
                            <Form onSubmit={handleSubmit}>
                            <List style={{width: 250, paddingTop: 0}}>
                                {formFields.map(field => (
                                    <List item key={field.id.toString()}>
                                        <TextField
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue={field.defaultValue}
                                        fullWidth
                                        type={field.type}
                                        disabled={field.disabled}
                                        >
                                        </TextField>
                                    </List>
                                ))}
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