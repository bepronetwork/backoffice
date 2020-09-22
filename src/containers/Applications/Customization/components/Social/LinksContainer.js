import React from 'react';
import { connect } from 'react-redux';
import { Card, Row } from 'reactstrap';
import _ from 'lodash';
import Link from './Link';
import AddLink from './AddLink';
import EditLock from '../../../../Shared/EditLock';

class LinksContainer extends React.Component {
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
        const { links, id } = props;

        this.setState({
            links: links ? links.map(link => ( { ...link, _id: Math.random().toString(36).substr(2, 9) })) : [],
            id: id
        })
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
                        <AddLink setLinks={this.setLinks} links={links} locked={locked}/>
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
    
export default connect(mapStateToProps)(LinksContainer);