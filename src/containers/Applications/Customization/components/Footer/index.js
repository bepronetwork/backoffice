import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import LinksContainer from './LinksContainer';
import { Title } from './styles';

class Footer extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }


    projectData = async (props) => {
        const { profile } = this.props;
        const { footer } = profile.getApp().getCustomization();
        const { communityLinks, supportLinks } = footer;

        this.setState({
            supportLinks: supportLinks.map( c => { return { name : c.name, href : c.href, image_url: c.image_url ? c.image_url : "" } } ),
            communityLinks: communityLinks.map( c => { return { name : c.name, href : c.href, image_url: c.image_url ? c.image_url : "" } } )
        })
    }

    render() {
        const { supportLinks, communityLinks } = this.state;
        
        return (
            <>
            <Card>
                <CardBody style={{ margin: 10, borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none", padding: 15 }}>
                    <Title>Support Links</Title>
                    <LinksContainer links={supportLinks} type={"supportLinks"} complement={communityLinks}/>
                    <Title>Community Links</Title>
                    <LinksContainer links={communityLinks} type={"communityLinks"} complement={supportLinks}/>
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