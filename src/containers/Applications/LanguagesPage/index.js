import React from 'react';
import { translate } from 'react-i18next';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import LanguageStoreContainer from "./Language";
import { LockWrapper } from "../../../shared/components/LockWrapper";
import { Grid } from '@material-ui/core';

class LanguageStorePageContainer extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            ecosystemLanguages: [],
            appLanguages: []
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

        const ecosystemLanguages = await profile.getApp().getEcosystemLanguages();
        const { languages } = profile.getApp().getCustomization();

        this.setState({ ecosystemLanguages: ecosystemLanguages.data.message, appLanguages: languages });
    }

    addLanguage = async (prefix) => {
        const { profile } = this.props;

        await profile.getApp().addLanguage({ prefix: prefix });
        await profile.getApp().updateAppInfoAsync();
        await profile.update();
    }

    isAdded = (language) => {
        const { appLanguages } = this.state;

        return !!(appLanguages).find(k => language.toLowerCase().replace(/\s+/g, '').includes(k.name.toLowerCase()));
    }

    render() {
        const { ecosystemLanguages } = this.state;
        const { User } = this.props.profile;

        const isSuperAdmin = User.permission.super_admin;

        return (
            <div>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                    {ecosystemLanguages && ecosystemLanguages.map(language => {
                        return (
                            <Grid item style={{ margin: 15, marginTop: 0 }}>
                                <LockWrapper hasPermission={isSuperAdmin}>
                                    <LanguageStoreContainer
                                        language={language}
                                        isAdded={this.isAdded(language.name)}
                                        addLanguage={this.addLanguage}
                                    />
                                </LockWrapper>
                               
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(LanguageStorePageContainer);

