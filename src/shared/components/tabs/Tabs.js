import React from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { Grid, ButtonBase } from '@material-ui/core';

import { DesktopWrapper, Icon, MobileIcon, MobileTitle, MobileWrapper, Title } from './styles';

class TabsContainer extends React.PureComponent{

    render() {
        const { items } = this.props;
        const filteredItems = items.filter(item => item.disabled !== true);

        return (
            <>
            <Tab.Container id="left-tabs-example" defaultActiveKey={"item-0"}>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">

                    <DesktopWrapper>
                        <div className="desktop" style={{ display: "block" }}>
                            <Grid item xs style={{ paddingLeft: 0, backgroundColor: "#fafcff", minWidth: 240, maxWidth: 240, borderRadius: "6px", paddingBottom: "30px" }}>
                                <Nav variant="pills" className="flex-column" style={{ borderRight: "solid 1px rgba(164, 161, 161, 0.35)"}}>
                                    {filteredItems.map( (item, index) => {
                                        return (
                                            <Grid>
                                                <Grid item style={{maxWidth: `258px`, minWidth: `190px`}}>
                                                    <Nav.Item key={index} style={{ margin: 7 }}>
                                                    <ButtonBase>
                                                        <Nav.Link eventKey={`item-${index}`} style={{ width: "220px", height: "40px" }}>
                                                            <div style={{ display: "flex" }}>
                                                                {<Icon>{item.icon}</Icon>} &nbsp; <Title>{item.title}</Title>
                                                            </div>
                                                        </Nav.Link>
                                                    </ButtonBase>
                                                    </Nav.Item>
                                                </Grid>
                                            </Grid>
                                        )
                                    })}
                                </Nav>
                            </Grid>
                        </div>
                    </DesktopWrapper>

                    <MobileWrapper>
                        <div className="mobile" style={{ display: "none" }}>
                            <Grid item xs style={{ paddingLeft: 0, backgroundColor: "#fafcff", width: "100%", borderRadius: "6px", marginBottom: "30px" }}>
                                <Nav fill variant="pills" style={{ borderBottom: "solid 1px rgba(164, 161, 161, 0.35)" }}>
                                    {filteredItems.map((item, index) => {
                                        return (
                                            <ButtonBase>
                                                <Nav.Link eventKey={`item-${index}`} style={{ height: "65px", display: "flex", flexDirection: "column", width: "100%", margin: "5px 3px", alignItems: "center" }}>
                                                        {<MobileIcon>{item.icon}</MobileIcon>} &nbsp; <MobileTitle>{item.title}</MobileTitle>
                                                </Nav.Link>
                                            </ButtonBase>
                                        )
                                    })}
                                </Nav>
                            </Grid>
                        </div>
                    </MobileWrapper>

                    <Grid item xs>
                        <Tab.Content style={{ minWidth: 345 }}>
                            {filteredItems.map( (item, index) => {
                                return (
                                    <Tab.Pane eventKey={`item-${index}`} key={index}>
                                        {item.container}
                                    </Tab.Pane>
                                )
                            })}
                        </Tab.Content>
                    </Grid>
                </Grid>
            </Tab.Container>
          </>
        )
    }

}

export default TabsContainer;

