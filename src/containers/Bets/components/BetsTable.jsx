import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableBody, TableCell, TableHead, TablePagination,TableRow, TableSortLabel } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { TableIcon, JsonIcon } from 'mdi-react';
import moment from 'moment';
import { connect } from "react-redux";
import { compose } from 'lodash/fp';
import _ from 'lodash';
import { CSVLink } from "react-csv";
import { export2JSON } from "../../../utils/export2JSON";
import { Button as MaterialButton } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import UserBetsFilter from './UserBetsFilter';

function getSorting(data, order, orderBy) {

    const sortedData = _.orderBy(data, [orderBy], order)
    .map(row => ({...row, creation_timestamp: moment(row.creation_timestamp).format("lll")}));

    return sortedData;
}

const fromDatabasetoTable = (data) => {

	return data.map(key => {

		return {
            _id:  key.bets._id,
            user: key.user,
            currency: key.currency, 
            app: key.app_id,
            game: key.game,
            ticker: key.currency ? key.currency.ticker : '',
            isWon:  key.bets.isWon,
            winAmount: key.bets.winAmount,
            betAmount: key.bets.betAmount,
            nonce: key.bets.nonce,
            fee: key.bets.fee,
			creation_timestamp: key.bets.timestamp
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
        id: 'user',
        label: 'User',
        numeric: false
    },
    {
        id: 'currency',
        label: 'Currency',
        numeric: false
    },
    {
        id: 'game',
        label: 'Game',
        numeric: true
    },
    {
        id: 'isWon',
        label: 'Won',
        numeric: false
    },
    {
        id: 'winAmount',
        label: 'Win Amount',
        numeric: true
    },
    {
        id: 'betAmount',
        label: 'Bet Amount',
        numeric: true
    },
    {
        id: 'creation_timestamp',
        label: 'Created At',
        numeric: false 
    }
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
        color: theme.palette.text.secondary, zIndex: 20
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
            <Typography variant="h6" id="tableTitle">
                Bets
            </Typography>
        </div>
        <div className={classes.spacer} />
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

class EnhancedTable extends React.Component {
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
            rowsPerPage: 5,
            currencyFilter: '',
            statusFilter: '',
            idFilter: null,
            userFilter: null,
            showFilter: false
        };
    }


    componentDidMount(){
        this.projectData(this.props)
    }

    projectData = async (props) => {
        this.setLoading(true);
        
        let app = await props.profile.getApp();
        const variables = await app.getEcosystemVariables()

        const appBets = await app.getAllBets({ filters: {}});
        const currencies = variables.data.message.currencies;

        const bets = appBets.data.message;

        if (bets.length > 0) {
            this.setState({...this.state, 
                data: fromDatabasetoTable(bets, currencies),
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

    handleChangeInputContent = (type, item) => {
        this.setState({[type] : item});
    }

    handleChangeDropDown = event => {
        const field = event.target.name;

        this.setState({ [field]: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleFilterClick = () => {
        const { showFilter } = this.state;
        this.setState({ showFilter: showFilter ? false : true });
    }


  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, userFilter, isLoading } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const headers = [
        { label: "Id", key: "_id" },
        { label: "User", key: "user" },
        { label: "Currency", key: "currency" },
        { label: "Game", key: "game" },
        { label: "Won", key: "isWon" },
        { label: "Win Amount", key: "winAmount" },
        { label: "Bet Amount", key: "betAmount" },
        { label: "Created At", key: "createdAt" }
    ];

    let csvData = [{}];
    let jsonData = [];

    if (!_.isEmpty(data)) {
        csvData = data.map(row => ({...row, currency: row.currency.name,
            user: row.user._id, 
            isWon: row.isWon ? 'Yes' : 'No', 
            game: row.game._id,
            createdAt: moment(row.creation_timestamp).format("lll")}));

        jsonData = csvData.map(row => _.pick(row, ['_id', 'user', 'currency', 'game', 'isWon', 'winAmount', 'betAmount', 'creation_timestamp']));
    }

    return (
        <Paper className={classes.root} style={{ padding: 20}}>
            <EnhancedTableToolbar numSelected={selected.length} filterClick={this.handleFilterClick}/>
            <div style={{ display: "flex", justifyContent: "flex-start"}}>
                <CSVLink data={csvData} filename={"bets.csv"} headers={headers}>
                    <MaterialButton variant="contained" size="small" style={{ textTransform: "none", backgroundColor: "#008000", color: "#ffffff", boxShadow: "none", margin: 10}}>
                        <TableIcon style={{marginRight: 7}}/> CSV
                    </MaterialButton>
                </CSVLink>
                <MaterialButton onClick={() => export2JSON(jsonData, "bets")} variant="contained" size="small" style={{ textTransform: "none", boxShadow: "none", margin: 10}}>
                    <JsonIcon style={{marginRight: 7}}/> JSON
                </MaterialButton>
            </div>
            <UserBetsFilter setData={this.setData} reset={this.reset} setLoading={this.setLoading} loading={this.state.isLoading}/>
            {isLoading ? (
                <>
                <Skeleton variant="rect" height={30} style={{ marginTop: 10, marginBottom: 20 }}/>

                {[...Array(rowsPerPage)].map((e, i) => <Skeleton variant="rect" height={50} style={{ marginTop: 10, marginBottom: 10 }}/>)}
                </>
                ) : (
            <>
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
                            key={n._id}
                            selected={isSelected}
                        >
                            <TableCell align="left"><p className='text-small'>{n._id}</p></TableCell>
                            <TableCell align="left">
                                <div style={{display: 'flex'}}>
                                    <img src={`https://avatars.dicebear.com/v2/avataaars/${n.user._id}.svg`} className={'avatar-image-small'} style={{ width : 25, height : 25}}/>
                                    <p className='text-small' style={{margin: 5}}>{n.user.name}</p>
                                </div>  
                             </TableCell>
                            <TableCell align="left">
                                <img src={n.currency.image} style={{float : 'left', marginRight : 4, width : 20, height : 20}}/>
                                <p className='text-small' style={{margin: 0}}>{n.currency.name}</p>
                            </TableCell>
                            <TableCell align="left">
                                <div style={{display: 'flex'}}>
                                <img src={n.game.image_url} style={{ width : 30, height : 30}}/>
                                    <p className='text-small' style={{margin: 5}}>{n.game.name}</p>
                                </div>  
                             </TableCell>
                            <TableCell align="left"><p className='text-small'>{n.isWon ? <p className='text-small background-green text-white'>Yes</p> : <p className='text-small background-red text-white'>No</p>}</p></TableCell>
                            <TableCell align="left"><p className='text-small'>{`${n.winAmount.toFixed(6)} ${n.ticker}`}</p></TableCell>
                            <TableCell align="left"><p className='text-small'>{`${n.betAmount.toFixed(6)} ${n.ticker}`}</p></TableCell>
                            <TableCell align="left"><p className='text-small'>{n.creation_timestamp}</p></TableCell>
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
            </>)}
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
        currency: state.currency
    };
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps)
)(EnhancedTable);

