

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { compose } from 'lodash/fp';
import { 
    Table, TableBody, TableCell, TableHead, TablePagination, TableRow, IconButton,
    TableSortLabel, Toolbar, Typography, Paper, Tooltip, FormControl, TextField
      } from '@material-ui/core';
import { Col, Row } from 'reactstrap';
import TextInput from '../../../shared/components/TextInput';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { FilterListIcon, TableIcon, JsonIcon } from 'mdi-react';
import { compareIDS } from '../../../lib/string';
import _, { isObject } from 'lodash';
import { CSVLink } from "react-csv";
import { export2JSON } from "../../../utils/export2JSON";
import { Button as MaterialButton } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';

import { DebounceInput } from 'react-debounce-input';

function getSorting(data, order, orderBy) {

    const sortedData = _.orderBy(data, [orderBy], order);

    return sortedData;
}

const fromDatabasetoTable = (data, otherInfo, currency) => {

	return data.map((key) => {
        var d;
        if(otherInfo){
            d = otherInfo.find( f => f._id == key._id);
        }

        const wallet = key.wallet.find(w => compareIDS(w.currency._id, currency._id));
        
        return {
            _id :  key._id,
            full_info : {...d, ...key}, 
			username : key.username,
			wallet: wallet.playBalance ? parseFloat(wallet.playBalance) : 0,
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
                Users
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
            rowsPerPage: 10,
            usernameFilter: null,
            emailFilter: null,
            idFilter: null,
            showFilter: false,
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

    handleChangeInputContent = event => {

        if (event.target.name) {
            this.setState({
                [event.target.name] : event.target.value ? event.target.value : null
            }, () => {
                this.fetchFilteredData();
            }
            );
        }
    }

    fetchFilteredData = async () => {
        const { profile, currency } = this.props;
        const { usernameFilter, emailFilter, idFilter } = this.state;

        const users = await profile.App.getUsersAsync({ 
            size: 100, 
            offset: 0,
            filters: {
                username: usernameFilter,
                email: emailFilter,
                user: idFilter
            }
        });

        if ((_.isArray(users) || _.isObject(users)) && !_.isString(users)) {
            this.setState({
                data: fromDatabasetoTable(users, this.props.data.usersOtherInfo.data, currency)
            })
        }
    }

    resetData = async () => {
        const { profile, currency } = this.props;

        this.setLoading(true);

        const users = await profile.App.getUsersAsync({ 
            size: 100, 
            offset: 0
        });

        this.setState({
            data: fromDatabasetoTable(users, this.props.data.usersOtherInfo.data, currency)
        })

        this.setLoading(false);
    }

    handleChangePage = async (event, page) => {
        const { data, rowsPerPage, usernameFilter, emailFilter, idFilter } = this.state;
        const { currency } = this.props;
        const { App } = this.props.profile;

        if (page === Math.ceil(data.length / rowsPerPage)) {

            this.setLoading(true);

            const users = await App.getUsersAsync({ 
                size: 100, 
                offset: 
                data.length,
                filters: {
                    username: usernameFilter,
                    email: emailFilter,
                    user: idFilter
                }
            });
            
            if (users.length > 0) {
                this.setState({
                    data: data.concat(fromDatabasetoTable(users, this.props.data.usersOtherInfo.data, currency)),
                    page: page
                })

            }

            this.setLoading(false);

        } else {
            this.setState({ page });
        }
    };

    setLoading = (status) => {
        this.setState(state => ({ loading: status }));
    }
    

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleFilterClick = () => {
        const { showFilter } = this.state;
        this.setState({ showFilter: showFilter ? false : true });
    }

    render() {
        const { classes, currency, isLoading } = this.props;
        const { showFilter, data, order, orderBy, selected, rowsPerPage, page, usernameFilter, emailFilter, idFilter, loading } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        const styles = {
            fitler: {
                padding: '30px 20px', border: "1px solid #d9d9d9", margin: '24px 14px 0 0',
                backgroundColor: "#f2f4f7", borderRadius: 4, width: 400, position: 'absolute',
                top: 0, right: 0, left: 'auto', zIndex: 10, display: showFilter ? 'block' : 'none'
            }
        };

        const headers = [
            { label: "Id", key: "_id" },
            { label: "Username", key: "username" },
            { label: "Email", key: "email" },
            { label: "Balance", key: "wallet" },
            { label: "Bets", key: "bets" },
            { label: "Turnover", key: "turnoverAmount" },
            { label: "Profit", key: "profit"}
        ];

        const jsonData = data.map(row => _.pick(row, ['_id', 'username', 'email', 'wallet', 'bets', 'turnoverAmount', 'profit']));

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} filterClick={this.handleFilterClick}/>
                <div style={{ display: "flex", justifyContent: "flex-end"}}>
                    <CSVLink data={data} filename={"users.csv"} headers={headers}>
                        <MaterialButton variant="contained" size="small" style={{ textTransform: "none", backgroundColor: "#008000", color: "#ffffff", boxShadow: "none", margin: 10}}>
                            <TableIcon style={{marginRight: 7}}/> CSV
                        </MaterialButton>
                    </CSVLink>
                    <MaterialButton onClick={() => export2JSON(jsonData, "users")} variant="contained" size="small" style={{ textTransform: "none", boxShadow: "none", margin: 10}}>
                        <JsonIcon style={{marginRight: 7}}/> JSON
                    </MaterialButton>
                </div>
                {isLoading || loading ? (
                    <>
                    <Skeleton variant="rect" height={50} style={{ marginTop: 10, marginBottom: 20 }}/>
                    { _.times(rowsPerPage, () => <Skeleton variant="rect" height={30} style={{ marginTop: 10, marginBottom: 10 }}/>)}
                    </>
                    ) : (
                    <>
                    <div style={styles.fitler}>
                        <Col>
                            <Row>
                                <FormControl style={{width : '100%', padding: 8 }}>
                                    <DebounceInput        
                                        label={'Username'}
                                        name={'usernameFilter'}
                                        type={'text'} 
                                        debounceTimeout={500}
                                        defaultValue={usernameFilter}
                                        onChange={event => this.handleChangeInputContent(event)}
                                        element={TextField} />
                                </FormControl>
                            </Row>
                            <Row>
                                <FormControl style={{width : '100%', padding: 8 }}>
                                    <DebounceInput  
                                        label={'Email'}
                                        name={'emailFilter'}
                                        type={'text'} 
                                        debounceTimeout={500}
                                        defaultValue={emailFilter}
                                        onChange={event => this.handleChangeInputContent(event)}
                                        element={TextField} />
                                </FormControl>
                            </Row>
                            <Row>
                                <FormControl style={{width : '100%', padding: 8}}>
                                    <DebounceInput
                                        label={'Id'}
                                        name={'idFilter'}
                                        type={'text'} 
                                        debounceTimeout={500}
                                        defaultValue={idFilter}
                                        onChange={event => this.handleChangeInputContent(event)}
                                        element={TextField} />
                                </FormControl>
                            </Row>
                            <Row style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <MaterialButton size="small" variant="outlined" 
                                style={{ marginLeft: 0, marginTop: 15, marginBottom: 5, alignSelf: 'end', textTransform: 'none' }} 
                                onClick={() => this.resetData()}
                                disabled={loading}
                                >
                                    Clear
                                </MaterialButton>
                            </Row>

                        </Col>
                    </div>             
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
                                                    {!_.isEmpty(currency) ? n.wallet.toFixed(6) : null }
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
                                                    {!_.isEmpty(currency) ? n.turnoverAmount.toFixed(6) : null }
                                                    <span className={!_.isEmpty(currency) ? 'text-small text-grey' : 'text-small background-soft-grey text-white' } > {this.state.ticker}</span>
                                                </p>
                                            </TableCell>
                                            <TableCell align="left">
                                                <p className='text-small'>
                                                    {!_.isEmpty(currency) ? n.profit.toFixed(6) : null }
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
                    </>)}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={data.length + rowsPerPage}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to > count - rowsPerPage ? count - rowsPerPage : to} of ${count - rowsPerPage}`}
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


