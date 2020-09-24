import React from 'react';
import { FormGroup, Col } from 'reactstrap';
import { IconCard, IconCardContent, InputField, IconImage, InputLabel, AddIconButton } from './styles';
import _ from 'lodash';
import Dropzone from 'react-dropzone'
import { PlusIcon } from 'mdi-react';

import enumIcons from './enumIcons';

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
            newName: enumIcons[0].name,
            newLink: "",
            isSVG: false
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
        const { isSVG } = this.state;

        if(!src.includes("https")){
            src = isSVG ? "data:image/svg+xml;base64," + src : "data:image;base64," + src;
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

        this.setState({ isSVG: false })

        if (file.type === 'image/svg+xml') {
            this.setState({ isSVG: true })
        }
        
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
        const { newName, newLink, isSVG } = this.state;
        const { setIcons, icons } = this.props;

        const icon = enumIcons.find(icon => icon.name === newName);
        
        const newIconObj = { _id: Math.random().toString(36).substr(2, 9), name: newName, link: newLink, position: icon.position, isSVG: isSVG };
        const newIcons = icons ? [...icons, newIconObj] : [newIconObj];

        const filteredIcons = _.without(enumIcons.filter(icon => !icons.map(i => i.name).includes(icon.name)), icon);

        this.setState({
            newName: filteredIcons[0] ? filteredIcons[0].name : undefined,
            newLink: ""
        })

        setIcons({ newIcons: newIcons })
    }

    render() {
        const { newName, newLink } = this.state;
        const { locked, icons } = this.props;

        const filteredIcons = _.without(enumIcons.filter(icon => !icons.map(i => i.name).includes(icon.name)), undefined);

        if (_.isEmpty(filteredIcons)) return null

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
                        <FormGroup style={{ width: "-webkit-fill-available" }}>
                            <InputLabel for="name">Name</InputLabel>
                        <InputField
                            label="Name"
                            name="name"
                            type="select"
                            value={newName}
                            disabled={locked}
                            onChange={(e) => this.onChangeNewName({ value: e.target.value })}
                        >
                            { _.sortBy(filteredIcons, ['name']).map(icon => (
                                <option key={icon.name}>{icon.name}</option>
                            ))}
                        </InputField>
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
