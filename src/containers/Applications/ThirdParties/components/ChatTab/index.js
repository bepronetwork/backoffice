import React from 'react'
import { Row, Card, CardBody } from 'reactstrap';

import Stream from './Stream';
import Crisp from './Crisp';

class ChatTab extends React.PureComponent {

    render() {
        return (
            <Card>
                <CardBody style={{ margin: 10, borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                    <Stream/>
                    <br/>
                    <hr/>
                    <br/>
                    <Crisp/>
                </CardBody>
            </Card>
            )
        }
}

export default ChatTab;
