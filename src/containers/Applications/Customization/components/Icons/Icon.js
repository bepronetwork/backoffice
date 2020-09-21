import React from 'react';
import { FormGroup, Col } from 'reactstrap';
import { Cancel, IconCard, IconCardContent, IconImage, InputField, InputLabel, RemoveIcon, Yes } from './styles';
import _ from 'lodash';
import Dropzone from 'react-dropzone'
import { TrashCanOutlineIcon } from 'mdi-react';
import enumIcons from './enumIcons';

const upload = `${process.env.PUBLIC_URL}/img/dashboard/upload.png`;
const trash = `${process.env.PUBLIC_URL}/img/dashboard/clear.png`;
const image2base64 = require('image-to-base64');

const dropzoneStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "white"
};

class Icon extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            removing: false,
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
        const { icons, icon } = props;

        if (!_.isEmpty(icons)) {
            this.setState({
                icons: icons,
                _id: icon._id,
                name: icon.name,
                link: icon.link,
                position: icon.position,
                isSVG: icon.isSVG
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

    onAddedFile = async ({ id, files }) => {
        const { icons } = this.state;
        const { setIcons } = this.props;
        const file = files[0];

        this.setState({ isSVG: false })

        if (file.type === 'image/svg+xml') {
            this.setState({ isSVG: true })
        }
        
        let blob = await image2base64(file.preview) // you can also to use url

        const index = icons.findIndex(icon => icon._id === id);
        const newIcons = [...icons];
        newIcons[index].link = blob;

        setIcons({ newIcons: newIcons })
    }

    renderAddImage = ({ id }) => {
        const { locked } = this.props;

        return(
            <Dropzone disabled={locked} style={dropzoneStyle} onDrop={(files) => this.onAddedFile({ id: id, files: files })} ref={(el) => (this.dropzoneRef = el)}>
                <img src={upload} className='image-info' style={{ height: 20, width: 20 }}/>
                <p className='text-center'> Drop the icon here</p>
            </Dropzone>
        )
    }

    onChangeName = ({ id, value }) => {
        const { icons } = this.state;
        const { setIcons } = this.props;

        const icon = enumIcons.find(icon => icon.name === value);

        if (value) {
            const index = icons.findIndex(icon => icon._id === id);
            const newIcons = [...icons];
            newIcons[index].name = value;
            newIcons[index].position = icon.position;
        
            setIcons({ newIcons: newIcons })
        } else {
            const index = icons.findIndex(icon => icon._id === id);
            const newIcons = [...icons];
            newIcons[index].name = "";
    
            setIcons({ newIcons: newIcons })
        }
    }

    onChangeLink = ({ id, value }) => {
        const { icons } = this.state;
        const { setIcons } = this.props;

        if (value) {
            const index = icons.findIndex(icon => icon._id === id);
            const newIcons = [...icons];
            newIcons[index].link = value;
    
            setIcons({ newIcons: newIcons })
        } else {
            const index = icons.findIndex(icon => icon._id === id);
            const newIcons = [...icons];
            newIcons[index].link = "";
    
            setIcons({ newIcons: newIcons })
        }
    }

    removeImage = ({ id }) => {
        const { icons } = this.state;
        const { setIcons } = this.props;

        const index = icons.findIndex(icon => icon._id === id);
        const newIcons = [...icons];
        newIcons[index].link = "";

        setIcons({ newIcons: newIcons })
    }

    removeIcon = ({ id }) => {
        this.setState({ removing: true })
    }

    cancelRemoveIcon = ({ id }) => {
        this.setState({ removing: false })
    }

    removeIconCard = ({ id }) => {
        const { icons } = this.state;
        const { setIcons } = this.props;

        const index = icons.findIndex(icon => icon._id === id);
        const newIcons = [...icons];

        newIcons[index] = {};
        
        this.setState({ removing: false })
        
        setIcons({
            newIcons: newIcons.filter(icon => !_.isEmpty(icon))
        })
    }


    render() {
        const { _id, name, link, removing } = this.state;
        const { locked, icons } = this.props;

        if (!name || !icons) return null

        const filteredIcons = _.without(enumIcons.filter(icon => !icons.map(i => i.name).includes(icon.name)).concat([enumIcons.find(i => i.name === name)]), undefined);

        return (
            <>
            <Col md={3} style={{ minWidth: 178, maxWidth: 230, padding: 0, margin: "10px 15px" }}>
                <IconCard>
                    <IconCardContent>
                        { !_.isEmpty(link) ? 
                        <>  
                            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginBottom: -30 }}>
                                <button
                                disabled={locked}
                                onClick={() => this.removeImage({ id: _id })}
                                style={{ position: "inherit", right: 20, top: 6 }}
                                className='carousel-trash button-hover'>
                                    <img src={trash} style={{width : 15, height : 15}}/>
                                </button>
                            </div>
                            <img className='application__game__image' style={{ display: 'block', width: 100, height: 100 }} src={this.renderImage(link)}/> 
                        </>
                        : 
                        <IconImage>
                            { this.renderAddImage({ id: _id }) }
                        </IconImage> }
                        <br/>
                        <FormGroup>
                            <InputLabel for="name">Name</InputLabel>
                        <InputField
                            label="Name"
                            name="name"
                            type="select"
                            value={name}
                            disabled={locked}
                            onChange={(e) => this.onChangeName({ id: _id, value: e.target.value })}
                        >
                            { filteredIcons && filteredIcons.map(icon => (
                                <option key={icon.name}>{icon.name}</option>
                            ))}
                        </InputField>
                        </FormGroup>
                        { !removing ?  
                        <RemoveIcon disabled={locked} onClick={() => this.removeIcon({ id: _id })}>
                            <TrashCanOutlineIcon/> Remove icon
                        </RemoveIcon>
                        : 
                        <div style={{ display: "flex" }}>
                            <Yes disabled={locked} onClick={() => this.removeIconCard({ id: _id })}>
                                Yes
                            </Yes>
                            <Cancel disabled={locked} onClick={() => this.cancelRemoveIcon({ id: _id })}>
                                Cancel
                            </Cancel>
                        </div> }
                    </IconCardContent>
                </IconCard>
            </Col>
            </>
        )
    }

}

    
export default Icon;
