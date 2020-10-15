import React from 'react';
import { connect } from 'react-redux';
import { Card, Row } from 'reactstrap';
import _ from 'lodash';
import Link from './Language';
import AddLink from './AddLink';
import EditLock from '../../../../Shared/EditLock';
import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c';

class LanguagesContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            locked: true
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }


    projectData = async (props) => {
        const { languages } = props;

        this.setState({ languages: languages })
    }

    renderImage = (src) => {
        if(!src.includes("https")){
            src = "data:image;base64," + src;
        }

        return src;
    }

    setLinks = ({ newLinks }) => {
        this.setState({ links: newLinks })
    }

    unlockField = () => {
        this.setState({ locked: false })
    }

    lockField = () => {
        this.setState({ locked: true })
    }

    confirmChanges = async () => {
        const { links, id } = this.state;
        const { profile } = this.props;

        const filteredLinks = links.map(({_id, isSVG, ...rest}) => rest);
        
        this.setState({ isLoading: true })
        
        await profile.getApp().editSocialLinksCustomization({ social_link_id: id, links: filteredLinks });

        await profile.getApp().updateAppInfoAsync();
        await profile.update();

        this.setState({
            isLoading: false,
            locked: true
        })
    }

    render() {
        const { links, isLoading, locked } = this.state;

        if (!links) return null;

        return (
            <EditLock 
                isLoading={isLoading} 
                unlockField={this.unlockField} 
                lockField={this.lockField} 
                confirmChanges={this.confirmChanges} 
                locked={locked}>

                <Card style={{ paddingBottom: 0,  }}>
                    <Row>
                        { !_.isEmpty(links) && links.map(link => {
                            return (
                                <Link setLinks={this.setLinks} links={links} link={link} locked={locked}/>
                            )
                        }) }
                    </Row>
                </Card>
            </EditLock>
        )
    }
};


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}
    
export default connect(mapStateToProps)(LanguagesContainer);