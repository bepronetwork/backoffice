import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Col } from 'reactstrap';
import { LinkCard, LinkCardContent, InputField, LinkImage, InputLabel, RemoveLink, Yes, Cancel } from './styles';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import Dropzone from 'react-dropzone'
import { TrashCanOutlineIcon } from 'mdi-react';
const upload = `${process.env.PUBLIC_URL}/img/dashboard/upload.png`;
const trash = `${process.env.PUBLIC_URL}/img/dashboard/clear.png`;
const image2base64 = require('image-to-base64');

const dropzoneStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "white"
};

class Link extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            removing: false
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }


    projectData = async (props) => {
        const { link, links } = props;

        if (!_.isEmpty(links)) {
            this.setState({
                _id: link._id,
                name: link.name,
                href: link.href,
                image_url: link.image_url,
                links: links
            })
        }
    }

    renderImage = (src) => {
        if(!src.includes("https")){
            src = "data:image;base64," + src;
        }

        return src;
    }

    onAddedFile = async ({ id, files }) => {
        const { links } = this.state;
        const { setLinks } = this.props;
        const file = files[0];
        
        let blob = await image2base64(file.preview) // you can also to use url

        const index = links.findIndex(l => l._id === id);
        const newLinks = [...links];
        newLinks[index].image_url = blob;

        setLinks({
            newLinks: newLinks
        })
    }

    renderAddImage = ({ id }) => {
        const { locked } = this.props;

        return(
            <Dropzone disabled={locked} style={dropzoneStyle} onDrop={(files) => this.onAddedFile({ id: id, files: files })} ref={(el) => (this.dropzoneRef = el)}>
                <img src={upload} className='image-info' style={{ height: 20, width: 20 }}/>
                <p className='text-center'> Drop the image here</p>
            </Dropzone>
        )
    }

    
    renderImage = (src) => {
        if(!src.includes("https")){
            src = "data:image;base64," + src;
        }

        return src;
    }

    onChangeName = ({ id, value }) => {
        const { links } = this.state;
        const { setLinks } = this.props;

        if (value) {
            const index = links.findIndex(l => l._id === id);
            const newLinks = [...links];
            newLinks[index].name = value;
    
            setLinks({
                newLinks: newLinks
            })
        } else {
            const index = links.findIndex(l => l._id === id);
            const newLinks = [...links];
            newLinks[index].name = null;
    
            setLinks({
                newLinks: newLinks
            })
        }
    }

    onChangeLink = ({ id, value }) => {
        const { links } = this.state;
        const { setLinks } = this.props;

        if (value) {
            const index = links.findIndex(l => l._id === id);
            const newLinks = [...links];
            newLinks[index].href = value;
    
            setLinks({
                newLinks: newLinks
            })
        } else {
            const index = links.findIndex(l => l._id === id);
            const newLinks = [...links];
            newLinks[index].href = null;
    
            setLinks({
                newLinks: newLinks
            })
        }
    }

    removeImage = ({ id }) => {
        const { links } = this.state;
        const { setLinks } = this.props;

        const index = links.findIndex(l => l._id === id);
        const newLinks = [...links];
        newLinks[index].image_url = "";

        setLinks({
            newLinks: newLinks
        })
    }

    removeLink = ({ id }) => {
        this.setState({
            removing: true
        })
    }

    cancelRemoveLink = ({ id }) => {
        this.setState({
            removing: false
        })
    }

    removeLinkCard = ({ id }) => {
        const { links } = this.state;
        const { setLinks } = this.props;

        const index = links.findIndex(l => l._id === id);
        const newLinks = [...links];

        newLinks[index] = {};
        
        this.setState({
            removing: false
        })
        
        setLinks({
            newLinks: newLinks.filter(link => !_.isEmpty(link))
        })
    }


    render() {
        const { _id, name, href, image_url, removing } = this.state;
        const { locked } = this.props;

        return (
            <>
            <Col md={3} style={{ minWidth: 178, margin: 5 }}>
                <LinkCard>
                    <LinkCardContent>
                        { image_url ? 
                        <>  
                            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: -10, marginBottom: -30 }}>
                                <button
                                disabled={locked}
                                onClick={() => this.removeImage({ id: _id })}
                                style={{ position: "inherit", right: 20, top: 6 }}
                                className='carousel-trash button-hover'>
                                    <img src={trash} style={{width : 15, height : 15}}/>
                                </button>
                            </div>
                            <img className='application__game__image' style={{ display: 'block', width: 100, height: 100 }} src={this.renderImage(image_url)}/> 
                        </>
                        : 
                        <LinkImage>
                            { this.renderAddImage({ id: _id }) }
                        </LinkImage> }
                        <FormGroup>
                            <InputLabel for="name">Name</InputLabel>
                        <InputField
                            label="Name"
                            name="name"
                            type="text"
                            defaultValue={name}
                            disabled={locked}
                            onChange={(e) => this.onChangeName({ id: _id, value: e.target.value })}
                        />
                        </FormGroup>
                        <FormGroup>
                            <InputLabel for="link">Link</InputLabel>
                        <InputField
                            label="Link"
                            name="link"
                            type="text"
                            defaultValue={href}
                            disabled={locked}
                            onChange={(e) => this.onChangeLink({ id: _id, value: e.target.value })}
                        />
                        </FormGroup>
                        { !removing ?  
                        <RemoveLink disabled={locked} onClick={() => this.removeLink({ id: _id })}>
                            <TrashCanOutlineIcon/> Remove link
                        </RemoveLink>
                        : 
                        <div style={{ display: "flex" }}>
                            <Yes disabled={locked} onClick={() => this.removeLinkCard({ id: _id })}>
                                Yes
                            </Yes>
                            <Cancel disabled={locked} onClick={() => this.cancelRemoveLink({ id: _id })}>
                                Cancel
                            </Cancel>
                        </div> }
                    </LinkCardContent>
                </LinkCard>
            </Col>
            </>
        )
    }

}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}
    
export default connect(mapStateToProps)(Link);
