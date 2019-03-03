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
    
    generateBearerToken = async () => {
        this.props.generateBearerToken();
    }

	render() {
		return (
		<Col md={12} lg={12}>
			<Card>
                <CardBody>
                    <div className="card__title">
                        <h5 className="bold-text">Bearer Token</h5>
                    </div>
                    <button style={{margin : 'auto',  maxWidth : 200, marginBottom : 30}} className="btn btn-primary account__btn" outline onClick={() => this.generateBearerToken()} > Generate API Token </button>
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