import React from 'react';
import { FormGroup, Col } from 'reactstrap';
import { TabCard, TabCardContent, InputField, TabImage, InputLabel, AddTabButton } from './styles';
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

class AddTab extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newName: "",
            newLink: "",
            newIcon: ""
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }


    projectData = async (props) => {
        const { tabs } = props;

        if (!_.isEmpty(tabs)) {
            this.setState({
                tabs: tabs
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
            newIcon: blob
        })
    }

    renderAddNewImage = () => {
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
            newIcon: ""
        })
    }

    addNewTab = () => {
        const { newName, newLink, newIcon } = this.state;
        const { setTabs, tabs } = this.props;
        
        const newTabObj = { name: newName, link_url: newLink, icon: newIcon, _id: Math.random().toString(36).substr(2, 9) }

        const newTabs = tabs ? [...tabs, newTabObj] : [newTabObj];

        this.setState({
            newName: "",
            newLink: "",
            newIcon: ""
        })

        setTabs({
            newTabs: newTabs,
        })

    }

    render() {
        const { newName, newLink, newIcon } = this.state;
        const { locked } = this.props;

        const hasEmptyValues = _.isEmpty(newName) || _.isEmpty(newLink);

        return (
            <>
            <Col md={3} style={{ minWidth: 178, maxWidth: 230, padding: 0, margin: "10px 15px" }}>
                <TabCard>
                    <TabCardContent>
                        { newIcon ? 
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
                            <img className='application__game__image' style={{ display: 'block', width: 100, height: 100 }} src={this.renderImage(newIcon)}/> 
                        </>
                        : 
                        <TabImage>
                            { this.renderAddNewImage() }
                        </TabImage> }
                        <FormGroup>
                            <InputLabel for="name">Title</InputLabel>
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

                        <AddTabButton disabled={locked || hasEmptyValues} onClick={() => this.addNewTab()}>
                            <PlusIcon/> Add tab
                        </AddTabButton>

                    </TabCardContent>
                </TabCard>
            </Col>
            </>
        )
    }

}
    
export default AddTab;
