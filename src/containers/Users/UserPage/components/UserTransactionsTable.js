import React from 'react';
import { connect } from "react-redux";
import { compose } from 'lodash/fp';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import _ from 'lodash';
import { CSVLink } from "react-csv";
import { Button as MaterialButton } from "@material-ui/core";
import { AddressConcat } from '../../../../lib/string';
import { export2JSON } from '../../../../utils/export2JSON';
import { TableIcon, JsonIcon } from 'mdi-react';

const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;
const withdraw = `${process.env.PUBLIC_URL}/img/dashboard/withdrawal.png`;
const deposit = `${process.env.PUBLIC_URL}/img/dashboard/deposit.png`;

function getSorting(data, order, orderBy) {

    const sortedData = _.orderBy(data, [orderBy], order)
    .map(row => ({...row, creation_timestamp: moment(row.creation_timestamp).format("lll")}));

    return sortedData;
}

const fromDatabasetoTable = (data, { currencies=[] }) => {

	return data.map(key => {

        const transaction = key._id;

        const currency = currencies.find(c => c._id === transaction.currency);

		return {
            _id :  transaction._id,
            user : transaction.user,
            currency : currency, 
            address: transaction.address,
            ticker : currency ? currency.ticker : '',
            status :  transaction.status,
            amount: transaction.amount,
            transactionHash : transaction.transactionHash,
			creation_timestamp: transaction.creation_timestamp,
            isAffiliate: transaction.isAffiliate ? 'Affiliate' : 'Normal',
            typeIcon: key.isWithdraw ? withdraw : deposit,
            type: key.isWithdraw ? 'Withdraw' : 'Deposit',
            link_url: transaction.link_url,
            confirmed : transaction.confirmed
		}
	})
}

const rows = [ 

    {
        id: '_id',
        label: 'Id',
        numeric: true
    },
    {
        id: 'type',
        label: 'Transaction',
        numeric: true
    },
    {
        id: 'transactionHash',
        label: 'Transaction Hash',
        numeric: true
    },
    {
        id: 'creation_timestamp',
        label: 'Created At',
        numeric: false 
    },
    {
        id: 'isAffiliate',
        label: 'Type',
        numeric: false 
    },
    {
        id: 'amount',
        label: 'Amount',
        numeric: true
    },
    {
        id: 'status',
        label: 'Status',
        numeric: true
    },
];


class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow>
                {rows.map(
                    row => (
                    <TableCell
                        key={row.id}
                        rowSpan={2} 
                        align={'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <Tooltip
                        title="Sort"
                        placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                        enterDelay={300}
                        >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={this.createSortHandler(row.id)}
                        >
                            {row.label}
                        </TableSortLabel>
                        </Tooltip>
                    </TableCell>
                    ),
                    this,
                )}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
    boxShadow : 'none'
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class UserTransactionsTable extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            order: 'asc',
            orderBy: 'id',
            selected: [],
            data: fromDatabasetoTable(props.data, {currencies : []}),
            page: 0,
            isLoading : {},
            ticker : 'N/A',
            rowsPerPage: 5
        };
    }


    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        let app = props.profile.getApp();
        const { currencies } = (await app.getEcosystemVariables()).data.message;
        this.setState({...this.state, 
            data : fromDatabasetoTable(props.data, { currencies }),
            ticker : props.ticker,
        })
    }
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
        order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
        this.setState(state => ({ selected: state.data.map(n => n.id) }));
        return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
        );
        }

        this.setState({ selected: newSelected });
    };

    allowWithdraw = async (withdrawObject) => {
        this.setState({...this.state, isLoading : {
            ...this.state.isLoading, [withdrawObject._id] : true
        }})

        await this.props.allowWithdraw(withdrawObject);

        this.setState({...this.state, isLoading : {
            ...this.state.isLoading, [withdrawObject._id] : false
        }})
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, ticker } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const headers = [
        { label: "Id", key: "_id" },
        { label: "Transaction", key: "type" },
        { label: "Transaction Hash", key: "transactionHash" },
        { label: "Created At", key: "createdAt" },
        { label: "Type", key: "isAffiliate"},
        { label: "Amount", key: "amount" },
        { label: "Status", key: "status" }
    ];

    const csvData = data.map(row => ({...row, createdAt: moment(row.creation_timestamp).format("lll")}));
    const jsonData = csvData.map(row => _.pick(row, ['_id', 'type', 'transactionHash', 'creation_timestamp', 'isAffiliate', 'amount', 'status']));

    return (
      <Paper elevation={0} className={classes.root} style={{ backgroundColor: "#fafcff", marginTop: 0 }}>
            <div style={{ display: "flex", justifyContent: "flex-end"}}>
                <CSVLink data={csvData} filename={"user_transactions.csv"} headers={headers}>
                    <MaterialButton variant="contained" size="small" style={{ textTransform: "none", backgroundColor: "#008000", color: "#ffffff", boxShadow: "none", margin: 10}}>
                       <TableIcon style={{marginRight: 7}}/> CSV
                    </MaterialButton>
                </CSVLink>
                <MaterialButton onClick={() => export2JSON(jsonData, "user_transactions")} variant="contained" size="small" style={{ textTransform: "none", boxShadow: "none", margin: 10}}>
                    <JsonIcon style={{marginRight: 7}}/> JSON
                </MaterialButton>
            </div>
            <div className={classes.tableWrapper}>
            <Table elevation={0} className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={this.handleSelectAllClick}
                    onRequestSort={this.handleRequestSort}
                    rowCount={data.length}
                />
            <TableBody>
                {getSorting(data, order, orderBy)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(n => {
                    const isSelected = this.isSelected(n.id);

                    return (
                        <TableRow
                            hover
                            onClick={event => this.handleClick(event, n.id)}
                            role="checkbox"
                            style={{padding : 0}}
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={n.id}
                            selected={isSelected}
                        >
                            <TableCell align="left"><p className='text-small'>{n._id}</p></TableCell>
                            <TableCell align="left"> 
                                <p className={`text-small text-${n.isAffiliate.toLowerCase()}`} style={{float : 'left', marginRight : 4}}>{n.type}</p>
                                <img src={n.typeIcon} style={{width : 20, height : 20}}/>
                            </TableCell>
                            <TableCell align="left">
                                { 
                                    n.transactionHash ? 
                                        n.link_url ?
                                            <a target={'__blank'} href={`${n.link_url}`}>
                                                <p className='text-small'>{AddressConcat(n.transactionHash)}</p>
                                            </a>
                                        :
                                            <p className='text-small'>{AddressConcat(n.transactionHash)}</p>
                                    : 'N/A'
                                }
                            </TableCell>
                            <TableCell align="left"><p className='text-small'>{n.creation_timestamp}</p></TableCell>
                            <TableCell align="left">
                                <p className={`text-small text-${n.isAffiliate.toLowerCase()}`}>{n.isAffiliate}</p>
                            </TableCell>
                            <TableCell align="left"><p className='text-small'>{n.amount} {n.ticker}</p></TableCell>
                            <TableCell align="left">
                                {n.status == 'Queue'
                                    ?
                                        <button disabled={this.state.isLoading[n._id]} className={`clean_button button-normal button-hover ${this.state.isLoading[n._id] ? 'background-grey' : ''}`} onClick={ () => this.allowWithdraw(n)}> 
                                            {
                                                !this.state.isLoading[n._id] ? 
                                                    <p className='text-small text-white'>To Confirm</p>
                                                : <img src={loading} style={{width : 20, height : 20}}/>
                                            }
                                        </button>
                                    :  
                                        n.status ?
                                            <p className='text-small background-green text-white'>{n.status}</p>
                                        :
                                            n.confirmed || n.type === 'Deposit'?
                                                <p className='text-small background-green text-white'>Confirmed</p>
                                            :
                                                <p className='text-small background-red text-white'>Not Confirmed</p>
                                }
                            </TableCell>
                        </TableRow>
                    );
                    })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
                'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
                'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

UserTransactionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        profile : state.profile
    };
}

export default compose(connect(mapStateToProps))( withStyles(styles)(UserTransactionsTable) );
// export default withStyles(styles)(UserTransactionsTable);