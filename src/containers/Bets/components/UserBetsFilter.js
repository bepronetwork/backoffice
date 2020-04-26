import React, { Component } from 'react'
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import { List, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ClickAwayListener } from '@material-ui/core';
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
            currencies: [],
            open: false
        }
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    projectData = async(props) => {
        const { profile } = props;

        let app = await profile.getApp();

        const currencies = app.params.currencies;
        const users = app.params.users;
        const games = app.params.games;

        this.setState(state => ({ 
            currencies: currencies,
            users: users,
            games: games
        }));

    }

    setLoadingStatus = (status) => {
        this.setState(state => ({ loading: status }));
    }

    getCurrency = (ticker) => {

        const currencies = this.state.currencies;
        
        const currency = currencies.find(currency => currency.ticker === ticker.toUpperCase());

        if (currency) {
            return currency._id;
        } else {
            return null
        }
    }

    getUser = (name) => {

        const users = this.state.users;

        const user = users.find(user => user.name.toLowerCase().includes(name.toLowerCase()));

        if (user) {
            return user._id;
        } else {
            return null
        }
    }

    getGame = (name) => {

        const games = this.state.games;

        const game = games.find(game => game.name.toLowerCase().includes(name.toLowerCase()));

        if (game) {
            return game._id;
        } else {
            return null
        }
    }

    handleData = async (data) => {
        const { setLoading, setData, setFilter, profile } = this.props;

        if (data.size && data.size > 200) {
            data.size = 200;
        }

        const formData = Object.assign({}, data);

        this.setLoadingStatus(true);
        setLoading(true);

        formData.currency = formData.currency ? this.getCurrency(formData.currency) : null;
        formData.user = formData.user ? this.getUser(formData.user) : null;
        formData.game = formData.game ? this.getGame(formData.game) : null;

        const filters = _.pickBy(formData, _.identity);

        setFilter(filters);

        const appBets = await profile.getApp().getAllBets({ filters });
        
        const bets = appBets.data.message.list;

        if (bets.length > 0) {
            setData(bets);

        } else {
            setData([]);
        }

        this.setLoadingStatus(false);
        setLoading(false);
        
    }

    clear = async (resetForm) => {
        const { setLoading, setData, setFilter, profile } = this.props;

        resetForm({});

        setFilter(null);

        setLoading(true);

        const app = await profile.getApp();

        const appBets = await app.getAllBets({ filters: { size: 100 }});

        const bets = appBets.data.message.list;

        if (bets.length > 0) {
            setData(bets);

        } else {
            setData([]);
        }

        setLoading(false);

    }

    handleClickAway = () => {
        this.setState({ open: false });
    };
    

    render() {
        const { open, loading } = this.state;

        return (
            <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end', paddingBottom: 20}}>
                <ClickAwayListener onClickAway={this.handleClickAway}>
                <ExpansionPanel elevation={0} expanded={open} style={{position: 'absolute', zIndex: 10, width: 300, marginTop: '-40px', border: '1px solid rgba(0, 0, 0, 0.2)'}}>
                    <ExpansionPanelSummary
                    onClick={() => this.setState({ open: !open })}
                    expandIcon={<ExpandMoreIcon/>}
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
                            user: "",
                            currency: "",
                            game: "",
                            size: 100
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
                                    <List item key="user">
                                    <TextField
                                        id="user"
                                        name="user"
                                        type="text"
                                        placeholder="User"
                                        onChange={handleChange}
                                        value={values.user}
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
                                        placeholder="Game"
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
                </ClickAwayListener>
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