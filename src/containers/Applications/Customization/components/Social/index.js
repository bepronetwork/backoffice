import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody } from 'reactstrap';
import LinksContainer from './LinksContainer';
import { Title } from './styles';

const cardBodyStyle = {
    margin: 10, 
    borderRadius: "10px", 
    border: "solid 1px rgba(164, 161, 161, 0.35)", 
    backgroundColor: "#fafcff", 
    boxShadow: "none", 
    padding: 30
}

class Social extends React.Component {
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
        const { profile } = props;
        const { socialLink } = profile.getApp().getCustomization();

        const socialLinks = socialLink ? socialLink.ids : [];
        const socialLinksId = socialLink._id;

        this.setState({
            socialLinks: socialLinks.map(link => { return { name: link.name, href: link.href, image_url: link.image_url ? link.image_url : "" } }),
            socialLinksId: socialLinksId
        })
    }

    render() {
        const { socialLinks, socialLinksId } = this.state;
        
        return (
            <>
            <Card>
                <CardBody style={cardBodyStyle}>
                    <Title>Social Links</Title>
                    <hr/>
                    { socialLinks && (
                        <LinksContainer links={socialLinks} id={socialLinksId}/>
                    )}
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
    
export default connect(mapStateToProps)(Social);