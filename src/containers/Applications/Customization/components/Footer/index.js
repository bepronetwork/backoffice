import { FormLabel } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import LinksContainer from './LinksContainer';
import { Title } from './styles';

import { Select, Checkbox } from 'antd';
import styled from 'styled-components'

const { Option } = Select;

const labelStyle = {
    fontFamily: "Poppins", 
    fontSize: 16, 
    color: "#646777"
}

const TextImage = styled.span`
    font-family: Poppins;
    font-size: 13px;
`;


class Footer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            language: 'EN'
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }


    projectData = async (props) => {
        const { language } = this.state;

        await this.fetchLanguageData(language);
    }

    fetchLanguageData = async (language) => {
        const { profile } = this.props;
        const { footer } = profile.getApp().getCustomization();

        const languages = footer.languages.map(l => l.language);
        const links = footer.languages.find(l => l.language.prefix === language);

        const { communityLinks, supportLinks, useStandardLanguage } = links;

        this.setState({
            useStandardLanguage,
            language,
            languages,
            supportLinks: supportLinks.map( c => { return { name : c.name, href : c.href, image_url: c.image_url ? c.image_url : "" } } ),
            communityLinks: communityLinks.map( c => { return { name : c.name, href : c.href, image_url: c.image_url ? c.image_url : "" } } )
        })
    }

    getLanguageImage = language => (
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <img src={language.logo} alt={language.logo} style={{ height: 20, width: 20, margin: "0px 5px" }}/>
            <TextImage>{language.name}</TextImage>
        </div>
    )

    onChangeLanguage = async (value) => {
        this.setState({
            language: value ? value : ""
        })

        await this.fetchLanguageData(value)
    }

    render() {
        const { supportLinks, communityLinks, languages, useStandardLanguage, language } = this.state;
        
        return (
            <>
            <Card>
                <CardBody style={{ margin: 10, borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none", padding: 15 }}>
                <FormLabel component="legend" style={labelStyle}>Language</FormLabel>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", margin: "5px 0px", marginTop: 20 }}>
                        <Select
                        defaultValue="EN"
                        style={{ minWidth: 130 }}    
                        placeholder="Language"
                        onChange={this.onChangeLanguage}
                        >
                            { languages && languages.filter(language => language.isActivated).map(language => (
                                <Option key={language.prefix}>{this.getLanguageImage(language)}</Option>
                            ))}
                        </Select>
                        { language !== 'EN' && (
                            <Checkbox style={{ marginLeft: 10 }} checked={useStandardLanguage} onChange={() => this.setState({ useStandardLanguage: !useStandardLanguage})}>Use the English Language Setup</Checkbox>
                        )}
                    </div>
                    <br/>
                    
                    <Title>Support Links</Title>
                    <LinksContainer links={supportLinks} type={"supportLinks"} complement={communityLinks} language={language} useStandardLanguage={useStandardLanguage} languages={languages}/>
                    <Title>Community Links</Title>
                    <LinksContainer links={communityLinks} type={"communityLinks"} complement={supportLinks} language={language} useStandardLanguage={useStandardLanguage} languages={languages}/>
                </CardBody>
            </Card>
            </>
        )
    }

};


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}
    
export default connect(mapStateToProps)(Footer);