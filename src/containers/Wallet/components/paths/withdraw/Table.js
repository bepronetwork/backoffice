

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
import withdrawStatus from './codes';
import { Button } from "reactstrap";
import Numbers from '../../../../../services/numbers';


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
            done :  data.confirmed,
            transactionHash : data.transactionHash,
            creation_date : new Date(data.creation_timestamp).toDateString(),
            address: data.address,
            nonce : data.nonce
		}
	})
}


const rows = [
    {
        id: 'amount',
        label: 'Amount',
        numeric: true
    },
    {
        id: 'confirmed',
        label: 'Status',
        numeric: false
    },
    {
        id: 'withdraw',
        label: 'Withdraw',
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
                <Typography variant="h6" id="tableTitle">
                    Withdraws
                </Typography>
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

class WithdrawTable extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            order: 'asc',
            orderBy: 'id',
            selected: [],
            data: props.data ? fromDatabasetoTable(props.data) : [],
            page: 0,
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

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
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
                                    <StyledTableCell align="center">{n.amount} {this.props.currency}</StyledTableCell>
                                    <StyledTableCell style={{width : 50}} align="center">
                                        <p styleName={withdrawStatus[n.confirmed.toLowerCase()]}>
                                            {n.confirmed}
                                        </p>
                                    </StyledTableCell>
                                  
                                    <StyledTableCell align="left">
                                        {
                                            !n.done
                                            ?
                                            <Button
                                                name="deposit"
                                                theme="primary"
                                                disabled={this.props.disabled}
                                                variant="small-body"
                                                onClick={ () => this.props.withdraw(n)}
                                            >
                                                <Typography> <strong>Withdraw</strong></Typography>
                                            </Button>
                                         : 'Done'}
                                     </StyledTableCell>
                                     <StyledTableCell style={{width : 50}} align="center">
                                            {n.transactionHash}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{n.creation_date}</StyledTableCell>
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

WithdrawTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WithdrawTable);