import React from 'react';
import { FormGroup, Col } from 'reactstrap';
import { IconCard, IconCardContent, InputField, IconImage, InputLabel, AddIconButton } from './styles';
import _ from 'lodash';
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

class AddIcon extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newName: "",
            newLink: ""
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }


    projectData = async (props) => {
        const { icons } = props;

        if (!_.isEmpty(icons)) {
            this.setState({
                icons: icons
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

    onAddedNewFile = async ({ files }) => {
        const file = files[0];
        
        let blob = await image2base64(file.preview) // you can also to use url

        this.setState({
            newLink: blob
        })
    }

    renderAddNewIcon = () => {
        const { locked } = this.props;

        return(
            <Dropzone disabled={locked} style={dropzoneStyle} onDrop={(files) => this.onAddedNewFile({ files: files })} ref={(el) => (this.dropzoneRef = el)}>
                <img src={upload} className='image-info' style={{ height: 20, width: 20 }}/>
                <p className='text-center'> Drop the icon here</p>
            </Dropzone>
        )
    }

    removeNewIcon = () => {
        this.setState({
            newLink: ""
        })
    }

    addNewIcon = () => {
        const { newName, newLink } = this.state;
        const { setIcons, icons } = this.props;
        
        const newIconObj = { _id: Math.random().toString(36).substr(2, 9), name: newName, link: newLink, position: icons.length }

        const newIcons = icons ? [...icons, newIconObj] : [newIconObj];

        this.setState({
            newName: "",
            newLink: ""
        })

        setIcons({ newIcons: newIcons })
    }

    render() {
        const { newName, newLink } = this.state;
        const { locked } = this.props;

        const hasEmptyValues = _.isEmpty(newName) || _.isEmpty(newLink);

        return (
            <>
            <Col md={3} style={{ minWidth: 178, maxWidth: 230, padding: 0, margin: "10px 15px" }}>
                <IconCard>
                    <IconCardContent>
                        { newLink ? 
                        <>  
                            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: -10, marginBottom: -30 }}>
                                <button
                                disabled={locked}
                                onClick={() => this.removeNewIcon()}
                                style={{ position: "inherit", right: 20, top: 6 }}
                                className='carousel-trash button-hover'>
                                    <img src={trash} style={{width : 15, height : 15}}/>
                                </button>
                            </div>
                            <img className='application__game__image' style={{ display: 'block', width: 100, height: 100 }} src={this.renderImage(newLink)}/> 
                        </>
                        : 
                        <IconImage>
                            { this.renderAddNewIcon() }
                        </IconImage> }
                        <br/>
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
                        <AddIconButton disabled={locked || hasEmptyValues} onClick={() => this.addNewIcon()}>
                            <PlusIcon/> Add icon
                        </AddIconButton>

                    </IconCardContent>
                </IconCard>
            </Col>
            </>
        )
    }

}
    
export default AddIcon;
