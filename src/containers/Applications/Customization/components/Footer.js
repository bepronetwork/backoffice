import React, { Component } from 'react'
import { connect } from "react-redux";
import { EditableTable } from '../../../../components/index.js';
import { Card, CardBody, Row, Col } from 'reactstrap';

const defaultState = {
    supportLinks : [],
    communityLinks : []
}

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }


    projectData = async (props) => {
        const { footer } = props.profile.getApp().getCustomization();
        const { communityLinks, supportLinks } = footer;

        this.setState({...this.state, 
            supportLinks    : supportLinks.map( c => { return { name : c.name, href : c.href}}),
            communityLinks  : communityLinks.map( c => { return { name : c.name, href : c.href}})
        })
    }

    onChange = async (new_data, type) => {
        const { profile } = this.props;
        const { communityLinks, supportLinks } = this.state;
        switch(type){
            case 'supportLinks': {
                let res = await profile.getApp().editFooterCustomization({communityLinks, supportLinks});
                break;
            };
            case 'communityLinks': {
                await profile.getApp().editFooterCustomization({communityLinks, supportLinks});
                break;
            };

        }

        await profile.getData();
    }


    confirmChanges = async () => {
        var { profile } = this.props;
        const { item } = this.state;

        this.setState({...this.state, isLoading : true});
        
        const postData = {
            logo : item
        }

        await profile.getApp().editLogoCustomization(postData);

        this.setState({...this.state, isLoading : false, locked: true});

        this.projectData(this.props);
    }

    handleOnDragStart = (e) => e.preventDefault()

    render() {
        const { supportLinks, communityLinks } = this.state; 

        return (
            <Card>
                <CardBody>
                    <Row>
                        <Col md={6}>
                            <EditableTable
                                title={'Support Links'}
                                onChange={ (data) => this.onChange(data, 'supportLinks')}
                                compareField={'name'}
                                columns={[
                                    { title: 'Name', field: 'name', type : 'string'},
                                    { title: 'Link', field: 'href', type : 'string'}
                                ]}
                                rawData={supportLinks}
                                data={supportLinks}
                            />
                        </Col>
                        <Col md={6}>
                            <EditableTable
                                title={'Community Links'}
                                onChange={ (data) => this.onChange(data, 'communityLinks')}
                                compareField={'name'}
                                columns={[
                                    { title: 'Name', field: 'name', type : 'string'},
                                    { title: 'Link', field: 'href', type : 'string'}
                                ]}
                                rawData={communityLinks}
                                data={communityLinks}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            )
        }
}

function mapStateToProps(state){
  return {
      profile: state.profile
  };
}

export default connect(mapStateToProps)(Footer);
