import React, { Component } from 'react'
import _ from 'lodash';

import '../styles.css';
import { Container, SectionGrid, Title, Text, Image, BackgroundImage, Location, EditSubSection as EditSubSectionButton, RemoveSubSection, Yes, Cancel, Actions } from './styles';
import { TrashCanOutlineIcon, EditIcon } from 'mdi-react';

const positionsEnum = Object.freeze({
    0: "RightImage",
    1: "LeftImage",
    2: "BottomImage",
    3: "TopImage"
});

const locationsEnum = Object.freeze({
    0: "Before the banners",
    1: "Before the games list",
    2: "Before the data lists",
    3: "Before the footer",
    4: "After the footer"
})

class SubSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            removing: false,
            open: false
        };
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        const { subSection, subSections } = props;

        this.setState({ 
            subSection: !_.isEmpty(subSection) ? subSection : [],
            subSections: !_.isEmpty(subSections) ? subSections : [] 
        });
    }

    setTabs = ({ newTabs }) => {
        this.setState({
            tabs: newTabs
        })
    }

    renderImage = (src) => {
        if(!src.includes("https")){
            src = "data:image;base64," + src;
        }

        return src;
    }

    onChange = ({ type, value }) => {
        this.setState({ [type]: value })
    }

    removeSubSection = ({ _id }) => {
        this.setState({ removing: true })
    }

    cancelRemoveSubSection = ({ _id }) => {
        this.setState({
            removing: false
        })
    }

    handleRemoveSubSection = ({ id }) => {
        const { subSections } = this.state;
        const { setSubSections } = this.props;

        const index = subSections.findIndex(subSection => subSection._id === id);
        const newSubSections = [...subSections];

        newSubSections[index] = {};
        
        this.setState({ removing: false })
        
        setSubSections({
            newSubSections: newSubSections.filter(subSections => !_.isEmpty(subSections))
        })
    }

    handleEditSubSection = () => {
        const { setOpen } = this.props;
        const { _id } = this.state.subSection;

        setOpen({ id: _id });
    }

    render() {
        const { subSection, removing } = this.state;
        const { locked } = this.props;

        if (!subSection) return null;

        const { _id, title, text, image_url, background_url, background_color, position, location } = subSection;

        return (
            <Container>
                <Location>{`Location: ${locationsEnum[location]} `}</Location>
                <SectionGrid className={positionsEnum[position]} backgroundColor={background_color}>
                    <Title>
                        <h1>{title}</h1>
                    </Title>
                    <Text>
                        <p>{text}</p>
                    </Text>

                    { background_url && (
                        <BackgroundImage>
                            <img style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Background" src={this.renderImage(background_url)} /> 
                        </BackgroundImage>
                    )}

                    { image_url && (
                        <Image>
                            <img style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Image" src={this.renderImage(image_url)}/> 
                        </Image>
                    )}
                </SectionGrid>

                { !removing ?  
                <Actions>
                    <EditSubSectionButton disabled={locked} onClick={() => this.handleEditSubSection()}>
                        <EditIcon style={{ margin: "0px 5px" }}/> Edit
                    </EditSubSectionButton>

                    <RemoveSubSection disabled={locked} onClick={() => this.removeSubSection({ id: _id })}>
                        <TrashCanOutlineIcon style={{ margin: "0px 5px" }}/> Remove
                    </RemoveSubSection>
                </Actions> 
                : 
                <Actions>
                    <Yes disabled={locked} onClick={() => this.handleRemoveSubSection({ id: _id })}>
                        Yes
                    </Yes>
                    <Cancel disabled={locked} onClick={() => this.cancelRemoveSubSection({ id: _id })}>
                        Cancel
                    </Cancel>
                </Actions> }
                
            </Container>
        )
    }
}


export default SubSection;
