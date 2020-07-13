import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Col } from 'reactstrap';
import { LinkCard, LinkCardContent, InputField, LinkImage, InputLabel, AddLinkButton } from './styles';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import Dropzone from 'react-dropzone'
import { PlusIcon } from 'mdi-react';
const upload = `${process.env.PUBLIC_URL}/img/dashboard/upload.png`;
const trash = `${process.env.PUBLIC_URL}/img/dashboard/clear.png`;
const image2base64 = require('image-to-base64');

const dropzoneStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "white"
};

class AddLink extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newName: "",
            newLink: "",
            newImage: ""
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }


    projectData = async (props) => {
        const { links } = props;

        if (!_.isEmpty(links)) {
            this.setState({
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

    onChangeNewName = ({ value }) => {
        if (value) {
            this.setState({
                newName: value
            })
        } else {
            this.setState({
                newName: ""
            })
        }
    }

    onChangeNewLink = ({ value }) => {
        if (value) {
            this.setState({
                newLink: value
            })
        } else {
            this.setState({
                newLink: ""
            })
        }
    }

    onAddedNewFile = async ({ files }) => {
        const file = files[0];
        
        let blob = await image2base64(file.preview) // you can also to use url

        this.setState({
            newImage: blob
        })
    }

    renderAddNewImage = () => {
        const { locked } = this.props;

        return(
            <Dropzone disabled={locked} style={dropzoneStyle} onDrop={(files) => this.onAddedNewFile({ files: files })} ref={(el) => (this.dropzoneRef = el)}>
                <img src={upload} className='image-info' style={{ height: 20, width: 20 }}/>
                <p className='text-center'> Drop the image here</p>
            </Dropzone>
        )
    }

    removeNewImage = () => {
        this.setState({
            newImage: ""
        })
    }

    addNewLink = () => {
        const { newName, newLink, newImage } = this.state;
        const { setLinks, links } = this.props;
        
        const newLinkObj = { name: newName, href: newLink, image_url: newImage, _id: Math.random().toString(36).substr(2, 9) }

        const newLinks = links ? [newLinkObj, ...links] : [newLinkObj];

        this.setState({
            newName: "",
            newLink: "",
            newImage: ""
        })

        setLinks({
            newLinks: newLinks,
        })

    }

    render() {
        const { newName, newLink, newImage } = this.state;
        const { locked } = this.props;

        return (
            <>
            <Col md={3} style={{ minWidth: 178, margin: 5 }}>
                <LinkCard>
                    <LinkCardContent>
                        { newImage ? 
                        <>  
                            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: -10, marginBottom: -30 }}>
                                <button
                                disabled={locked}
                                onClick={() => this.removeNewImage()}
                                style={{ position: "inherit", right: 20, top: 6 }}
                                className='carousel-trash button-hover'>
                                    <img src={trash} style={{width : 15, height : 15}}/>
                                </button>
                            </div>
                            <img className='application__game__image' style={{ display: 'block', width: 100, height: 100 }} src={this.renderImage(newImage)}/> 
                        </>
                        : 
                        <LinkImage>
                            { this.renderAddNewImage() }
                        </LinkImage> }
                        <FormGroup>
                            <InputLabel for="name">Name</InputLabel>
                        <InputField
                            label="Name"
                            name="name"
                            type="text"
                            value={newName}
                            disabled={locked}
                            // defaultValue={name}
                            onChange={(e) => this.onChangeNewName({ value: e.target.value })}
                        />
                        </FormGroup>
                        <FormGroup>
                            <InputLabel for="link">Link</InputLabel>
                        <InputField
                            label="Link"
                            name="link"
                            type="text"
                            value={newLink}
                            disabled={locked}
                            // defaultValue={href}
                            onChange={(e) => this.onChangeNewLink({ value: e.target.value })}
                        />
                        </FormGroup>

                        <AddLinkButton disabled={locked} onClick={() => this.addNewLink()}>
                            <PlusIcon/> Add link
                        </AddLinkButton>

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
    
export default connect(mapStateToProps)(AddLink);
