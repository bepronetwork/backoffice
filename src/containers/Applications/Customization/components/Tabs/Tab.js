import React from 'react';
import { FormGroup, Col } from 'reactstrap';
import { TabCard, TabCardContent, InputField, TabImage, InputLabel, RemoveTab, Yes, Cancel } from './styles';
import _ from 'lodash';
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

class Tab extends React.Component {
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
        const { tabs, tab } = props;

        if (!_.isEmpty(tab)) {
            this.setState({
                _id: tab._id,
                name: tab.name,
                icon: tab.icon,
                link_url: tab.link_url,
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

    onAddedFile = async ({ id, files }) => {
        const { tabs } = this.state;
        const { setTabs } = this.props;
        const file = files[0];
        
        let blob = await image2base64(file.preview) // you can also to use url

        const index = tabs.findIndex(tab => tab._id === id);
        const newTabs = [...tabs];
        newTabs[index].icon = blob;

        setTabs({
            newTabs: newTabs
        })
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
        const { tabs } = this.state;
        const { setTabs } = this.props;

        if (value) {
            const index = tabs.findIndex(tab => tab._id === id);
            const newTabs = [...tabs];
            newTabs[index].name = value;
    
            setTabs({
                newTabs: newTabs
            })
        } else {
            const index = tabs.findIndex(tab => tab._id === id);
            const newTabs = [...tabs];
            newTabs[index].name = "";
    
            setTabs({
                newTabs: newTabs
            })
        }
    }

    onChangeLink = ({ id, value }) => {
        const { tabs } = this.state;
        const { setTabs } = this.props;

        if (value) {
            const index = tabs.findIndex(tab => tab._id === id);
            const newTabs = [...tabs];
            newTabs[index].link_url = value;
    
            setTabs({
                newTabs: newTabs
            })
        } else {
            const index = tabs.findIndex(tab => tab._id === id);
            const newTabs = [...tabs];
            newTabs[index].link_url = "";
    
            setTabs({
                newTabs: newTabs
            })
        }
    }

    removeImage = ({ id }) => {
        const { tabs } = this.state;
        const { setTabs } = this.props;

        const index = tabs.findIndex(tab => tab._id === id);
        const newTabs = [...tabs];
        newTabs[index].icon = "";

        setTabs({
            newTabs: newTabs
        })
    }

    removeTab = ({ id }) => {
        this.setState({
            removing: true
        })
    }

    cancelRemoveTab = ({ id }) => {
        this.setState({
            removing: false
        })
    }

    removeTabCard = ({ id }) => {
        const { tabs } = this.state;
        const { setTabs } = this.props;

        const index = tabs.findIndex(tab => tab._id === id);
        const newTabs = [...tabs];

        newTabs[index] = {};
        
        this.setState({
            removing: false
        })
        
        setTabs({
            newTabs: newTabs.filter(tab => !_.isEmpty(tab))
        })
    }


    render() {
        const { _id, name, icon, link_url, removing } = this.state;
        const { locked } = this.props;

        return (
            <>
            <Col md={3} style={{ minWidth: 178, maxWidth: 230, padding: 0, margin: "10px 15px" }}>
                <TabCard>
                    <TabCardContent>
                        { !_.isEmpty(icon) ? 
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
                            <img className='application__game__image' style={{ display: 'block', width: 100, height: 100 }} src={this.renderImage(icon)}/> 
                        </>
                        : 
                        <TabImage>
                            { this.renderAddImage({ id: _id }) }
                        </TabImage> }
                        <FormGroup>
                            <InputLabel for="name">Title</InputLabel>
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
                            defaultValue={link_url}
                            disabled={locked}
                            onChange={(e) => this.onChangeLink({ id: _id, value: e.target.value })}
                        />
                        </FormGroup>
                        { !removing ?  
                        <RemoveTab disabled={locked} onClick={() => this.removeTab({ id: _id })}>
                            <TrashCanOutlineIcon/> Remove tab
                        </RemoveTab>
                        : 
                        <div style={{ display: "flex" }}>
                            <Yes disabled={locked} onClick={() => this.removeTabCard({ id: _id })}>
                                Yes
                            </Yes>
                            <Cancel disabled={locked} onClick={() => this.cancelRemoveTab({ id: _id })}>
                                Cancel
                            </Cancel>
                        </div> }
                    </TabCardContent>
                </TabCard>
            </Col>
            </>
        )
    }

}

    
export default Tab;
