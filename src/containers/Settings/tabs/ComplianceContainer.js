import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import { Paper, Typography, Chip, TextField } from '@material-ui/core';
import CountryMap from './Components/CountryMap';
import ReactTooltip from 'react-tooltip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import EditLock from './Components/EditLock';

import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
const countriesObj = countries.getNames('en');

let allCountries = [];
        
Object.keys(countriesObj).forEach((key) => {
     allCountries.push({ code: key, label: countriesObj[key] })
});

class ComplianceContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            restrictedCountries: [],
            content: "",
            lock: true,
            loading: false
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }
  
    componentWillReceiveProps(props){
        this.projectData(props);
    }
  
    projectData = async (props) => {
        const { profile } = props;

        const app = profile.App;

        this.setState({
            restrictedCountries: app.params.restrictedCountries
        })
    }

    addCountry = (country) => {
        const { restrictedCountries } = this.state;
        
        if (!restrictedCountries.includes(country)) {
            restrictedCountries.push(country);

            this.setState({
                restrictedCountries: restrictedCountries
            })

        }
    }

    removeCountry = (country) => {
        const { restrictedCountries } = this.state;

        if (restrictedCountries.includes(country)) {
            restrictedCountries.splice(restrictedCountries.indexOf(country), 1)

            this.setState({
                restrictedCountries: restrictedCountries
            })
        }
    }

    setContent = (content) => {
        this.setState({
            content: content
        })
    }

    
    unlock = () => {
        this.setState({...this.state, lock: false })
    }

    lock = () => {
        this.setState({...this.state, lock: true })
    }

    confirmChanges = async (currency) => {
        const { profile } = this.props;
        const { restrictedCountries } = this.state;

        const app = profile.App;

        this.setState({...this.state, loading: true })

        await app.editRestrictedCountries({ countries: restrictedCountries })
        await profile.getApp().updateAppInfoAsync();
        await profile.update();

        this.setState({...this.state, loading: false })

        this.lock()

    }

    onChangeDate = (_value, dateString) => {
        const [begin_at, end_at] = dateString;

        console.log(begin_at, end_at)
    }

    render = () => {
        const { restrictedCountries, content, lock } = this.state;

        if (!restrictedCountries) { return null}

        return (
            <div style={{ margin: 10 }}>               
                <p className="dashboard__visitors-chart-title text-left" style={{fontSize : 18, marginBottom : 10}}> Compliance </p>
                <RangePicker 
                    onChange={this.onChangeDate} 
                    // onOk={this.onOk}
                    ranges={{
                        'Today': [moment().utc(), moment().utc()],
                        'Yesterday': [moment().subtract(1, 'days').utc(), moment().subtract(1, 'days').utc()],
                        'Last 7 days': [moment().subtract(7, 'days').utc(), moment().utc()],
                        'Last 15 days': [moment().subtract(15, 'days').utc(), moment().utc()],
                        'Last month': [moment().subtract(1, 'month').utc(), moment().utc()]
                      }}/>
                <hr/>
                <Paper style={{ padding: 15, borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }} >
                    <Typography style={{ fontSize: 17 }} variant="h6" id="tableTitle">Restricted Countries</Typography>
                    <EditLock 
                        style={{ width: "100%"}}
                        unlockField={this.unlock} 
                        lockField={this.lock} 
                        confirmChanges={() => this.confirmChanges()} 
                        isLoading={this.state.loading}
                        locked={lock}>
                        
                        <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
                            <div style={{ display: "flex", flexDirection: "row", width: "100%", flexWrap: 'wrap'}}>
                                <div style={{ display: "flex", flexDirection: "column", width: 250, padding: 15, alignSelf: "flex-end" }}>
                                    <Typography style={{ fontSize: 15 }} variant="h6" id="tableTitle">Search country</Typography>
                                    <br/>
                                    <Autocomplete
                                        id="country-select"
                                        options={allCountries}
                                        disabled={lock}
                                        autoHighlight
                                        onChange={(event, newValue) => {
                                            if (newValue) {
                                                this.addCountry(newValue.code)
                                            }
                                        }}
                                        getOptionLabel={(option) => option.label}
                                        renderOption={(option) => (
                                        <>
                                            {option.label}
                                        </>
                                        )}
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            size="small"
                                            label="Choose a country"
                                            variant="filled"
                                            inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                        />
                                        )}
                                    />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: "wrap", alignItems: "center", margin: "0px 10px" }}>
                                    { restrictedCountries.map(country => (
                                        <Chip
                                        disabled={lock}
                                        label={countriesObj[country]}
                                        onDelete={() => this.removeCountry(country)}
                                        style={{ backgroundColor: "#8c449b", color: "#ffffff", margin: 5 }}
                                        />))}
                                </div>
                            </div>
                            
                            <div style={{ width: "100%", height: "100%" }}>
                                <CountryMap 
                                lock={lock}
                                restrictedCountries={restrictedCountries} 
                                add={this.addCountry} 
                                remove={this.removeCountry} 
                                setContent={this.setContent}/>

                                <ReactTooltip>{content}</ReactTooltip>
                            </div>
                        </div>
                    </EditLock>
                </Paper>
                <br/>
          </div>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

ComplianceContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(ComplianceContainer);

