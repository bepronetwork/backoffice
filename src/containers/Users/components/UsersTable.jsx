

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { connect } from "react-redux";
import { compose } from 'lodash/fp';
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
import { FilterListIcon } from 'mdi-react';
import { compareIDS } from '../../../lib/string';
import _ from 'lodash';

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


const fromDatabasetoTable = (data, otherInfo, currency) => {

	return data.map( (key) => {
        var d;
        if(otherInfo){
            d = otherInfo.find( f => f._id == key._id);
        }
        console.log("a", d);
        console.log("key", key);
        console.log("curre", currency._id);
        const wallet = key.wallet.find(w => compareIDS(w.currrency, currency._id));
        console.log(wallet)
        return {
            _id :  key._id,
            full_info : {...d, ...key}, 
			username : key.username,
			wallet: wallet ? parseFloat(wallet.playBalance) : 0,
			bets: parseFloat(key.bets.length),
            email: key.email,
            turnoverAmount: d ? parseFloat(d.betAmount) : 0,
            profit: d ? parseFloat(d.profit) : 0
		}
	})
}

const rows = [
    {
        id: 'avatar',
        label: 'Avatar',
        position: 'center'
    },
    {
        id: '_id',
        label: 'Id',
        numeric: false
    },
    {
        id: 'username',
        label: 'Username',
        numeric: false
    },
    {
        id: 'email',
        label: 'Email',
        numeric: false
    },
    {
        id: 'wallet',
        label: 'Balance',
        numeric: false
    },
    {
        id: 'bets',
        label: 'Bets',
        numeric: false
    },
    {
        id: 'turnoverAmount',
        label: 'Turnover',
        numeric: false
    },
    {
        id: 'profit',
        label: 'Profit',
        numeric: false
    },
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
                        align={row.position ? row.position : 'left'}
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

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
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
                Users
            </Typography>
            )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
            {numSelected > 0 ? (
            <Tooltip title="Delete">
                <IconButton aria-label="Delete">
                </IconButton>
            </Tooltip>
            ) : (
            <Tooltip title="Filter list">
                <IconButton aria-label="Filter list">
                <FilterListIcon />
                </IconButton>
            </Tooltip>
            )}
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
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const defaultProps = {
    profit : '0',
    ticker : 'No Currency Chosen',
}


class UsersTable extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            order: 'asc',
            orderBy: 'id',
            selected: [],
            data: [],
            page: 0,
            rowsPerPage: 5,
            ...defaultProps
        };
    }


    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props)
    }

    projectData = (props) => {
        let data = props.data;
        const { currency } = props;
        this.setState({...this.state, 
            data : fromDatabasetoTable(data.users.data, data.usersOtherInfo.data, currency),
            ticker : currency.ticker ? currency.ticker : defaultProps.ticker,
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

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes, currency } = this.props;
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
                                    key={n.id}
                                    selected={isSelected}
                                >
                                    <TableCell align="left">
                                        <img src={`https://avatars.dicebear.com/v2/avataaars/${n._id}.svg`} className={'avatar-image-small'}/>
                                    </TableCell>
                                    <TableCell align="left">
                                        <p className='text-small'>
                                            {n._id}
                                        </p>
                                    </TableCell>
                                    <TableCell align="left">
                                        <p className='text-small'>
                                            {n.username}
                                        </p>
                                    </TableCell>
                                    <TableCell align="left">
                                        <p className='text-small'>
                                            {n.email}
                                        </p>
                                    </TableCell>
                                    <TableCell align="left">
                                        <p className='text-small'>
                                            {!_.isEmpty(currency) ? n.wallet : null }
                                            <span className={!_.isEmpty(currency) ? 'text-small text-grey' : 'text-small background-soft-grey text-white' } > {this.state.ticker}</span>
                                        </p>
                                    </TableCell>
                                    <TableCell align="left">
                                        <p className='text-small background-grey text-white'>
                                            {n.bets} 
                                        </p>
                                    </TableCell>
                                    <TableCell align="left">
                                        <p className='text-small'>
                                            {!_.isEmpty(currency) ? n.turnoverAmount : null }
                                            <span className={!_.isEmpty(currency) ? 'text-small text-grey' : 'text-small background-soft-grey text-white' } > {this.state.ticker}</span>
                                        </p>
                                    </TableCell>
                                    <TableCell align="left">
                                        <p className='text-small'>
                                            {!_.isEmpty(currency) ? n.profit : null }
                                            <span className={!_.isEmpty(currency) ? 'text-small text-grey' : 'text-small background-soft-grey text-white' } > {this.state.ticker}</span>
                                        </p>
                                    </TableCell>
                                    <TableCell align="left">
                                        <button className={`clean_button button-normal button-hover`} onClick={ () => this.props.goToUserPage({user : n.full_info})}> 
                                            <p className='text-small text-white'>See More</p>
                                        </button>
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




function mapStateToProps(state){
    return {
        profile: state.profile,
        currency : state.currency
    };
}

UsersTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(mapStateToProps))(UsersTable);

