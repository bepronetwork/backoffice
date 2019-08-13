import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import store from '../../../App/store';
import { setDataPeriodicity } from '../../../../redux/actions/periodicityAction';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import PropTypes from 'prop-types';

class TimePicker extends React.Component{


    constructor(props){
        super(props);
    }

    change = async (value) => {
        await store.dispatch(setDataPeriodicity(value));
    }

    render = () => {
        const { periodicity } = this.props;

        return (
            <div className='panel-empty'>
                <Grid container spacing={3}>
                    <Grid item>
                        <ButtonGroup size="small" aria-label="small button group">
                            <Button disabled={periodicity == 'weekly'}  onClick={() => this.change('weekly')}> Weekly </Button>
                            <Button disabled={periodicity == 'monthly'}  onClick={() => this.change('monthly')}> Monthly </Button>
                            <Button disabled={periodicity == 'all'} onClick={() => this.change('all')}> All </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </div>
        );
    }   
}

function mapStateToProps(state){
    return {
        periodicity : state.periodicity
    };
}

TimePicker.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    connect(mapStateToProps)
)(TimePicker);

