/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import EditTable from '../../../shared/components/table/EditableTable';

class BearerTokenTableApiKeys extends PureComponent {
	constructor(props) {
		super(props);
		this.heads = [
        {
            key: 'index',
            name: '#',
            width: 200,
        },
		{
			key: 'bearerToken',
			name: 'Bearer Token',
			width: 1000,
		}
		];
	}

	onChangePage = (pageOfItems) => {
		this.setState({ pageOfItems });
    };
    
	render() {
		return (
		<Col md={12} lg={12}>
			<Card>
                <CardBody style={{ borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }}>
                    <div className="card__title">
                        <h5 className="bold-text">Bearer Token</h5>
                    </div>
                    <hr></hr>
                    <h6>
                        {this.props.data}
                    </h6>
                </CardBody>
			</Card>
		</Col>
		);
	}
}


export default BearerTokenTableApiKeys;