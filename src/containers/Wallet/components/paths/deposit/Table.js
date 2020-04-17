

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import FilterListIcon from 'mdi-react/FilterListIcon';
import depositStatus, { depositStatusArray } from './codes';
import { Button } from "reactstrap";
import Numbers from '../../../../../services/numbers';
import InformationContainer from '../../../../../shared/components/information/InformationContainer';
import { InformationIcon } from 'mdi-react';
import { Row, Col} from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';
import { CSVLink } from "react-csv";
import { Button as MaterialButton } from "@material-ui/core";
import { export2JSON } from '../../../../../utils/export2JSON';
const loading = `${process.env.PUBLIC_URL}/img/loading.gif`;

let counter = 0;


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


const fromDatabasetoTable = (data) => {
	return data.map( (data) => {
        return {
            id :  data._id,
			amount : Numbers.toFloat(data.amount),
            confirmed: data.confirmed ? 'Confirmed' : 'Open',
            isConfirmed :  data.confirmed || data.transactionHash,
            transactionHash : data.transactionHash,
            creation_date : new Date(data.creation_timestamp).toDateString(),
            address: data.address,
            nonce : data.nonce
		}
	})
}


const rows = [
    {
        id: 'id',
        label: 'Id',
        numeric: false
    },
    {
        id: 'amount',
        label: 'Amount',
        numeric: false
    },
    {
        id: 'transactionHash',
        label: 'Tx Hash',
        numeric: false
    },
    {
        id: 'creation_date',
        label: 'Creation Date',
        numeric: false
    },   
    {
        id: 'confirmed',
        label: 'Status',
        numeric: false
    }
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                {rows.map(
                    row => (
                    <StyledTableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
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
                    </StyledTableCell>
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

const toolbarStyles = theme => ({
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

        return (
            <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
            >
            <div className={classes.title}>
                {numSelected > 0 ? (
                <Typography color="inherit" variant="subtitle1">
                    {numSelected} selected
                </Typography>
                ) : (
                    <Row>
                        <Col md={5}>
                            <div style={{marginTop : 5}}>
                                <Typography variant="h6" id="tableTitle">
                                    Deposits
                                </Typography>
                            </div>
                        </Col>
                        <Col md={5}>
                            <InformationContainer icon={<InformationIcon size={20}/>} title={'Whenever a Deposit does not work, please re-send the confirmation by confirming on the below not confirmed transactions'} />
                        </Col>
                    </Row>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              
            </div>
            </Toolbar>
        );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
    },
    head : {

    },
    body: {
    },
    table: {
      
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

const defaultProps = {
    profit : '0',
    ticker : 'N/A',
}
  


const StyledTableCell = withStyles(theme => ({
  
}))(TableCell);

class DepositsTable extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            order: 'asc',
            orderBy: 'id',
            selected: [],
            data: props.data ? fromDatabasetoTable(props.data) : [],
            page: 0,
            isLoading : {},
            rowsPerPage: 5,
            ...defaultProps
        };
    }


    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = (props) => {
        let { data , currency} = props;

        this.setState({...this.state, 
            data : fromDatabasetoTable(data),
            ticker : currency
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

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    confirmDeposit = async depositObject => {
        this.setState({...this.state, isLoading : {
            ...this.state.isLoading, [depositObject.id] : true
        }})

        await this.props.confirmDeposit(depositObject);

        this.setState({...this.state, isLoading : {
            ...this.state.isLoading, [depositObject.id] : true
        }})
    }

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        const headers = [
            { label: "Id", key: "id" },
            { label: "Amount", key: "amount" },
            { label: "Currency", key: "currency" },
            { label: "Tx Hash", key: "transactionHash" },
            { label: "Creation Date", key: "creation_date" },
            { label: "Status", key: "confirmed" }
        ];

        const csvData = data.map(row => ({...row, currency: this.props.currency, creation_date: moment(row.creation_date).format("lll")}));
        const jsonData = csvData.map(row => _.pick(row, ['id', 'amount', 'currency', 'transactionHash', 'creation_date', 'confirmed']));
    

        return (
            <Paper className={classes.root}>
                    <div style={{ display: "flex", justifyContent: "flex-end"}}>
                        <CSVLink data={csvData} filename={"deposits.csv"} headers={headers}>
                            <MaterialButton variant="contained" size="small" style={{ textTransform: "none", backgroundColor: "#008000", color: "#ffffff", boxShadow: "none", margin: 10}}>
                                Export CSV
                            </MaterialButton>
                        </CSVLink>
                        <MaterialButton onClick={() => export2JSON(jsonData, "deposits")} variant="contained" size="small" style={{ textTransform: "none", boxShadow: "none", margin: 10}}>
                            Export JSON
                        </MaterialButton>
                    </div>
                    <EnhancedTableToolbar numSelected={selected.length} />
                        <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                    <TableBody style={{color : 'white'}}>
                        {stableSort(data, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(n => {
                            const isSelected = this.isSelected(n.id);
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    style={{padding : 0, color : 'white'}}
                                    aria-checked={isSelected}
                                    tabIndex={-1}
                                    key={n.id}
                                    selected={isSelected}
                                >
                                    <StyledTableCell align="left"> 
                                        <p className='text-small'>
                                            {n.id}
                                        </p>
                                    </StyledTableCell>
                                    <StyledTableCell align="left"> 
                                        <p className='text-small'>
                                            {parseFloat(n.amount).toFixed(6)} {this.props.currency}
                                        </p>
                                    </StyledTableCell>
                                    <StyledTableCell style={{width : 120}} align="left">
                                        <p className='text-small'>
                                            {
                                                n.transactionHash ?
                                                n.transactionHash
                                                : 'None'
                                            }
                                        </p>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <p className='text-small'>{n.creation_date}</p>
                                    </StyledTableCell>

                                    <StyledTableCell align="left">
                                        {
                                            !n.isConfirmed
                                            ?
                                            <button
                                                className={`clean_button button-normal button-hover ${this.state.isLoading[n.id] ? 'background-grey' : ''}`} 
                                                disabled={this.props.disabled}
                                                onClick={ () => this.confirmDeposit(n)}
                                            >
                                                {
                                                !this.state.isLoading[n.id] ? 
                                                    <p className='text-small text-white'>Confirm Deposit</p>
                                                : <img src={loading} style={{width : 20, height : 20}}/>
                                            }
                                            </button>
                                        : 
                                            <p className='text-small text-green'>Done</p>
                                        }
                                     </StyledTableCell>
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

DepositsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DepositsTable);