/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import EditTable from '../../../shared/components/table/EditableTable';
import Pagination from '../../../shared/components/pagination/Pagination';
import Numbers from '../../../services/numbers';

class Table extends PureComponent {
	constructor(props) {
		super(props);
		this.heads = [
		{
			key: 'id',
			name: 'ID',
			width: 250,
		},
		{
			key: 'name',
			name: 'User Name',
			sortable: true,
		},
		{
			key: 'email',
			name: 'Email',
			sortable: true,
		},
		{
			key: 'turnoverAmount',
			name: 'TurnOver',
			sortable: true,
		},
		{
			key: 'bets',
			name: 'Bets Amount',
			sortable: true,
		},
		{
			key: 'profit',
			name: 'Profit',
			sortable: true,
		}
		];
	}

	onChangePage = (pageOfItems) => {
		console.log(pageOfItems)
		this.setState({ pageOfItems });
	};

	render() {
		let tableData = fromDatabasetoTable(this.props.data);
		console.log(tableData);
		return (
		<Col md={12} lg={12}>
			<Card>
			<CardBody>
				<div className="card__title">
					<h5 className="bold-text">Users</h5>
				</div>
				<EditTable heads={this.heads} rows={tableData} />
				{/* <Pagination items={tableData} onChangePage={this.onChangePage} /> */}
			</CardBody>
			</Card>
		</Col>
		);
	}
}



const fromDatabasetoTable = (data) => {
	return Object.keys(data).map( (key, index) => {
		return {
			id :  data[key]._id,
			name : data[key].name,
			turnoverAmount: Numbers.formatNumber(data[key].betAmount) + ' €',
			bets: Numbers.formatNumber(data[key].bets),
			email: data[key].email,
			profit: Numbers.formatNumber(data[key].profit) + ' €'
		}
	})
}

export default Table;