import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableBody, TableCell, TableHead, TablePagination,TableRow, TableSortLabel, InputLabel, Select, Button, SvgIcon } from '@material-ui/core';
import { Col, Row } from 'reactstrap';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import TextInput from '../../../shared/components/TextInput';
import { AddressConcat } from '../../../lib/string';
import { FilterListIcon, TableIcon, JsonIcon } from 'mdi-react';
import moment from 'moment';
import { connect } from "react-redux";
import { compose } from 'lodash/fp';
import _ from 'lodash';
import { CSVLink } from "react-csv";
import { export2JSON } from "../../../utils/export2JSON";
import { Button as MaterialButton } from "@material-ui/core";

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


const fromDatabasetoTable = (data, { currencies=[] }) => {

	return data.map( (key) => {

        const currency = currencies.find(c => new String(c._id).toString() == new String(key.currency).toString());

		return {
            _id :  key._id,
            user : key.user,
            currency : currency, 
            address: key.address,
            ticker : currency ? currency.ticker : '',
            status :  key.status,
			amount: key.amount,
			creation_timestamp: moment(new Date(key.creation_timestamp)).format('lll'),
            isAffiliate: key.isAffiliate ? 'Affiliate' : 'Normal',
            link_url : key.link_url,
            transactionHash : key.transactionHash
		}
	})
}

const rows = [
    {
        id: '_id',
        label: 'Id',
        numeric: false
    },
    {
        id: 'user',
        label: 'User',
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
  const { numSelected, classes, filterClick } = props;

    return (
        <Toolbar
        className={classNames(classes.root, {
            [classes.highlight]: numSelected > 0,
        })}
        >
        <div className={classes.title}>
            <Typography variant="h6" id="tableTitle">
                Transactions
            </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions} onClick={filterClick}>
            <div style={{position: "absolute", right: 0, margin: "14px 70px 0 0", cursor: "pointer"}}><p>Filter List</p></div>
            <Tooltip title="Filter list">
                <IconButton aria-label="Filter list">
                <FilterListIcon />
                </IconButton>
            </Tooltip>
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

class EnhancedTable extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            order: 'asc',
            orderBy: 'id',
            selected: [],
            data: fromDatabasetoTable(props.data.withdraws.data, {currencies : []}),
            page: 0,
            isLoading : {},
            rowsPerPage: 10,
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

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = async (props) => {
        let data = props.data;
        let app = props.profile.getApp();
        const { currencies } = (await app.getEcosystemVariables()).data.message;
        this.setState({...this.state, 
            data : fromDatabasetoTable(data.withdraws.data, { currencies })
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
    const { showFilter, data, order, orderBy, selected, rowsPerPage, page, idFilter, userFilter, currencyFilter, statusFilter } = this.state;
    const dataFiltered = data.filter(n => 
        (_.isEmpty(statusFilter) || n.status == statusFilter) && 
        (_.isEmpty(currencyFilter) || n.currency._id == currencyFilter) &&
        (_.isEmpty(idFilter) || n._id.includes(idFilter)) &&
        (_.isEmpty(userFilter) || n.user.includes(userFilter))
    );
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataFiltered.length - page * rowsPerPage);
    const statusMap = new Map();
    const currencyMap = new Map();
    const styles = {
        fitler: {
            padding: '20px 20px 30px 20px', border: "1px solid #d9d9d9", margin: '24px 14px 0 0',
            backgroundColor: "#f2f4f7", borderRadius: 4, width: 330, position: 'absolute',
            top: 0, right: 0, left: 'auto', zIndex: 10, display: showFilter ? 'block' : 'none'
        }
    };

    const headers = [
        { label: "Id", key: "_id" },
        { label: "User", key: "user" },
        { label: "Transaction Hash", key: "transactionHash" },
        { label: "Created At", key: "creation_timestamp" },
        { label: "Amount", key: "amount" },
        { label: "Status", key: "status" }
    ];

    const csvData = dataFiltered.map(row => ({...row, createdAt: moment(row.creation_timestamp).format("lll")}));
    const jsonData = csvData.map(row => _.pick(row, ['_id', 'user', 'transactionHash', 'creation_timestamp', 'amount', 'status']));

    return (
        <Paper className={classes.root}>
            <EnhancedTableToolbar numSelected={selected.length} filterClick={this.handleFilterClick}/>
            <div style={{ display: "flex", justifyContent: "flex-end"}}>
                <CSVLink data={csvData} filename={"transactions.csv"} headers={headers}>
                <MaterialButton variant="contained" style={{ textTransform: "none", backgroundColor: "#008000", color: "#ffffff", boxShadow: "none", margin: 10}}>
                        <TableIcon style={{marginRight: 7}}/> CSV
                    </MaterialButton>
                </CSVLink>
                <MaterialButton onClick={() => export2JSON(jsonData, "transactions")} variant="contained" size="small" style={{ textTransform: "none", boxShadow: "none", margin: 10}}>
                    <JsonIcon style={{marginRight: 7}}/> JSON
                </MaterialButton>
            </div>
            <div style={styles.fitler}>
                <Row>
                    <Col>
                        <FormControl style={{width : '100%'}}>
                            <TextInput
                                label={'ID'}
                                name={'idFilter'}
                                type={'text'} 
                                defaultValue={idFilter}
                                changeContent={this.handleChangeInputContent} />
                        </FormControl>
                    </Col>
                    <Col>
                        <FormControl style={{width : '100%'}}>
                            <TextInput
                                label={'User'}
                                name={'userFilter'}
                                type={'text'} 
                                defaultValue={userFilter}
                                changeContent={this.handleChangeInputContent} />
                        </FormControl>
                    </Col>
                    <Col>
                        <FormControl style={{width : '100%', marginTop : 13}}>
                            <InputLabel id="currencyFilterLabel">Currency</InputLabel>
                            <Select labelId="currencyFilterLabel" id="currencyFilter" name="currencyFilter" value={currencyFilter} onChange={this.handleChangeDropDown}>
                                <MenuItem value="">All</MenuItem>
                                {
                                    data.map(s => {
                                        if(!currencyMap.has(s.currency) && s.currency){
                                            currencyMap.set(s.currency, true); 
                                            return (<MenuItem value={s.currency._id}>{s.currency.name}</MenuItem>)
                                        }
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Col>
                    <Col>
                        <FormControl style={{width : '100%', marginTop : 13}}>
                            <InputLabel id="statusFilterLabel">Status</InputLabel>
                            <Select labelId="statusFilterLabel" id="statusFilter" name="statusFilter" value={statusFilter} onChange={this.handleChangeDropDown}>
                                <MenuItem value="">All</MenuItem>
                                {
                                    data.map(s => {
                                        if(!statusMap.has(s.status)){
                                            statusMap.set(s.status, true); 
                                            return (<MenuItem value={s.status}>{s.status}</MenuItem>)
                                        }
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Col>
                </Row>
            </div>
            <div className={classes.tableWrapper}>
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onRequestSort={this.handleRequestSort}
                        rowCount={dataFiltered.length}
                    />
                    <TableBody>
                        {stableSort(dataFiltered, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .filter(n => 
                                (_.isEmpty(statusFilter) || n.status == statusFilter) && 
                                (_.isEmpty(currencyFilter) || n.currency._id == currencyFilter) &&
                                (_.isEmpty(idFilter) || n._id.includes(idFilter)) &&
                                (_.isEmpty(userFilter) || n.user.includes(userFilter))
                            )
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
                                    <TableCell align="left"> <p className='text-small'>{n._id}</p></TableCell>
                                    <TableCell align="left"><p className='text-small'>{n.user}</p></TableCell>
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
                                                            <p className='text-small text-white'>{n.status}</p>
                                                        : <img src={loading} style={{width : 20, height : 20}}/>
                                                    }
                                                </button>
                                            :  <p className='text-small background-green text-white'>{n.status}</p>
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
                count={dataFiltered.length}
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

