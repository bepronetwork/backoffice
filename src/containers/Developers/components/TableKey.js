/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';

class TableKey extends PureComponent {
	constructor(props) {
		super(props);
	}

	onChangePage = (pageOfItems) => {
		this.setState({ pageOfItems });
    };

	render() {
        const { type, value } = this.props;

		return (
		<Col md={12} lg={12}>
			<Card>
                <CardBody>
                    <div className="card__title">
                        <h5 className="bold-text">{type}</h5>
                    </div>
                    <hr></hr>
                    <h6>
                        {value}
                    </h6>
                </CardBody>
			</Card>
		</Col>
		);
	}
}


export default TableKey;