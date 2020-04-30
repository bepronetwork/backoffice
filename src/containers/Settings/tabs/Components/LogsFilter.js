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

class LogsFilter extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            currencies: [],
            open: false
        }
    }

    setLoadingStatus = (status) => {
        this.setState(state => ({ loading: status }));
    }


    handleData = async (data) => {
        const { setLoading, setData, setFilter, profile } = this.props;

        if (data.limit && data.limit > 200) {
            data.limit = 200;
        }

        const formData = Object.assign({}, data);

        this.setLoadingStatus(true);
        setLoading(true);

        const filters = _.pickBy(formData, _.identity);

        setFilter(filters);

        const appLogs = await profile.getApp().getLogs({ filters: { ...filters, offset: 0, filter: 'UNAUTHORIZED_COUNTRY' } });
        
        const logs = appLogs.data.message.list;

        if (logs.length > 0) {
            setData(logs);

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

        const appLogs = await app.getLogs({ filters: { limit: 100, offset: 0, filter: 'UNAUTHORIZED_COUNTRY' } });

        const logs = appLogs.data.message.list;

        if (logs.length > 0) {
            setData(logs);

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
                            limit: 100
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
                            <h6>Limit</h6>
                            <List style={{width: 250, paddingTop: 0}}>
                                    <List item key="limit">
                                    <TextField
                                        id="limit"
                                        name="limit"
                                        type="number"
                                        placeholder="Limit"
                                        onChange={handleChange}
                                        value={values.limit}
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

export default compose(connect(mapStateToProps))(LogsFilter);