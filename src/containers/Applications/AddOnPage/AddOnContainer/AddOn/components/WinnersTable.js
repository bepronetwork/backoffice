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
import Skeleton from '@material-ui/lab/Skeleton';



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


const fromDatabasetoTable = (data, currencies ) => {

	return data.map( (key) => {

        const currency = currencies.filter(c => new String(c._id).toString() == new String(key.currency).toString())[0];

		return {
            user : key.user,
            bet : key.bet,
            currency : currency, 
            ticker : currency ? currency.ticker : '',
            winAmount : key.winAmount
		}
	})
}

const rows = [ 

    {
        id: 'user',
        label: 'User',
        numeric: false
    },
    {
        id: 'bet',
        label: 'Bet',
        numeric: false
    },
    {
        id: 'currency',
        label: 'Currency',
        numeric: false
    },
    {
        id: 'winAmount',
        label: 'Win Amount',
        numeric: true
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

class WinnersTable extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            order: 'asc',
            orderBy: 'id',
            selected: [],
            data: [],
            page: 0,
            isLoading: false,
            ticker : 'N/A',
            rowsPerPage: 5
        };
    }


    componentDidMount(){
        this.projectData(this.props)
    }

    projectData = async (props) => {
        const { winners } = props;

        this.setLoading(true);
        
        const app = await props.profile.getApp();
        const variables = await app.getEcosystemVariables()
        const currencies = variables.data.message.currencies;

        if (winners.length > 0) {
            this.setState({...this.state, 
                data: fromDatabasetoTable(winners, currencies),
                currencies: currencies
            })
        } else {
            this.setState({...this.state, 
                data: [],
                currencies: currencies
            })
        }

        this.setLoading(false);
    }

    setLoading = (status) => {
        this.setState(state => ({ isLoading: status }));
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

    setData = async (data) => {
        let app = this.props.profile.getApp();
        const variables = await app.getEcosystemVariables()
        
        const currencies = variables.data.message.currencies;

        this.setState({...this.state, 
            data : fromDatabasetoTable(data, currencies)
        })
    }

    reset = async () => {
        await this.projectData();
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
    const isLoading = this.state.isLoading;
    
    return (
      <Paper elevation={0} className={classes.root}>
            {isLoading ? (
                <>
                <Skeleton variant="rect" height={30} style={{ marginTop: 10, marginBottom: 20 }}/>
                <Skeleton variant="rect" height={50} style={{ marginTop: 10, marginBottom: 10 }}/>
                <Skeleton variant="rect" height={50} style={{ marginTop: 10, marginBottom: 10 }}/>
                <Skeleton variant="rect" height={50} style={{ marginTop: 10, marginBottom: 10 }}/>
                <Skeleton variant="rect" height={50} style={{ marginTop: 10, marginBottom: 10 }}/>
                <Skeleton variant="rect" height={50} style={{ marginTop: 10, marginBottom: 10 }}/>
                </>
                ) : (
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
                {stableSort(data, getSorting(order, orderBy))
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
                            key={n.user}
                            selected={isSelected}
                        >
                            <TableCell align="left"><p className='text-small'>{n.user}</p></TableCell>
                            <TableCell align="left"><p className='text-small'>{n.bet}</p></TableCell>
                            <TableCell align="left">
                                <img src={n.currency.image} style={{float : 'left', marginRight : 4, width : 20, height : 20}}/>
                                <p className='text-small' style={{margin: 0}}>{n.currency.name}</p>
                            </TableCell>
                            <TableCell align="left"><p className='text-small'>{`${n.winAmount.toFixed(6)} ${n.ticker}`}</p></TableCell>
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
        </div>)}
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

WinnersTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        profile : state.profile
    };
}

export default compose(connect(mapStateToProps))( withStyles(styles)(WinnersTable));