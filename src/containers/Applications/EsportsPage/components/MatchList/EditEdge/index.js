import React from 'react';
import { connect } from 'react-redux';
import { Slider, InputNumber, Row, Col, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { Container, Header, Actions, SaveButton } from './styles';
import { ButtonBase } from '@material-ui/core';

const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;

class EditEdge extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            edge: 0,
            newEdge: null, 
            isLoading: false
        };
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = (props) => {
        const { profile } = props;
        const { App } = profile;

        const edge = App.params.esports_edge;

        this.setState({
            edge: edge ? edge : 0,
            newEdge: edge
        })
    }

    onChangeEdge = value => {
        this.setState({ newEdge: value });
    };

    resetNewEdge = () => {
        const { edge } = this.state;

        this.setState({ newEdge: edge });
    }

    updateVideogamesEdge = async () => {
        const { newEdge } = this.state;
        const { profile } = this.props;
        const { App } = profile;

        this.setState({ isLoading: true });

        await App.editVideogamesEdge({ esports_edge: newEdge });
        
        await profile.getApp().updateAppInfoAsync();
        await profile.update();

        this.setState({ isLoading: false });
    }

    render() {
        const { edge, newEdge, isLoading } = this.state;
        const { profile } = this.props;
        const app = profile.getApp();

        const hasEsports = app.hasEsportsPermission();

        return (
            <Container>
                <Header>
                    <span>Edge</span>
                </Header>
                <Actions>
                    <Row style={{ width: "100%" }}>
                        <Col>
                        <Slider
                            disabled={!hasEsports}
                            style={{ width: 100 }}
                            defaultValue={edge}
                            min={0}
                            max={20}
                            onChange={this.onChangeEdge}
                            value={newEdge}
                            step={0.1}
                        />
                        </Col>
                        <Col>
                        <InputNumber
                            disabled={!hasEsports}
                            defaultValue={edge}
                            min={0}
                            max={20}
                            style={{ margin: '0 16px', marginRight: 3 }}
                            step={0.1}
                            value={newEdge}
                            formatter={value => `${value}%`}
                            parser={value => value.replace('%', '')}
                            onChange={this.onChangeEdge}
                        />
                         { edge !== newEdge && (
                            <ButtonBase style={{ margin: "0px 5px" }} disabled={isLoading || !hasEsports} onClick={this.resetNewEdge}>
                                <CloseOutlined/>
                            </ButtonBase>) }
                        </Col>
                        <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "5px 8px" }}>
                            { edge !== newEdge && (
                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                                    <SaveButton variant="contained" size="small" disabled={isLoading} onClick={this.updateVideogamesEdge}>
                                        { isLoading ? <img src={loading} alt="Loading..." className={'loading_gif'}/> : "Update" }
                                    </SaveButton>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Actions>
            </Container>

        )
    }


}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(EditEdge);
