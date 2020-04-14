import React, { Component } from 'react'
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import { List, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { ExpandMoreIcon } from 'mdi-react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import _ from 'lodash';

const formFields = [
    {
        id: 0,
        name: "bet",
        placeholder: "Bet ID",
        type: "text"
    },
    {
        id: 1,
        name: "currency",
        placeholder: "Currency",
        type: "text"
    },
    {
        id: 2,
        name: "game",
        placeholder: "Game",
        type: "text"
    },
    {
        id: 3,
        name: "size",
        placeholder: "Size",
        type: "number"
    },
    {
        id: 4,
        name: "size",
        placeholder: "Offset",
        type: "number"
    }
  ];

class UserBetsFilter extends Component {
    constructor(props){
        super(props)
    }


    handler = async (data) => {
        const filters = _.pickBy(data, _.identity);
        const bets = await this.props.profile.getApp().getUserBets({user: this.props.user._id, filters});
        
        if (bets.data.status === 200) {
            this.props.setData(bets.data.message.map(app => app.bets));
        } else {
            this.props.setData([]);
        }
        
    }

    clear = async () => {

        const bets = await this.props.profile.getApp().getUserBets({user: this.props.user._id});

        if (bets.data.status === 200) {
            this.props.setData(bets.data.message.map(app => app.bets));
        } else {
            this.props.setData([]);
        }

    }

    render() {
        return (
            <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
                <ExpansionPanel elevation={0} style={{position: 'absolute', zIndex: 10, width: 300, marginTop: '-65px'}}>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="filters"
                    id="filter-head"
                    >
                    <h6>Show filters</h6>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{backgroundColor: "#f2f4f7", paddingBottom: 0, width: 300}}>
                        <Formik
                        initialValues={{
                            bet: null,
                            currency: null,
                            game: null,
                            size: null,
                            offset: null
                        }}
                        onSubmit={data => this.handler(data)}
                        >
                        {({ handleChange, handleBlur, handleSubmit }) => (
                            <>
                            <Form onSubmit={handleSubmit}>
                            <List style={{width: 250}}>
                                {formFields.map(field => (
                                    <List item key={field.id.toString()}>
                                        <TextField
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        fullWidth
                                        type={field.type}
                                        >
                                        </TextField>
                                    </List>
                                ))}
                            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                <Button className="icon" size="sm" style={{ height: 40, marginLeft: 0, marginTop: 5, marginBottom: 5, alignSelf: 'end' }} onClick={handleSubmit}>
                                    Search
                                </Button>
                                <Button className="icon" size="sm" style={{ height: 40, marginLeft: 0, marginTop: 5, marginBottom: 5, alignSelf: 'end' }} onClick={this.clear}>
                                    Clear
                                </Button>
                            </div>
                            </List>
                            </Form>
                            </>
                            )}
                        </Formik>
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