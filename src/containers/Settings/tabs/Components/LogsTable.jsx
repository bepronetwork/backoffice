import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { TableBody, TableCell, TableHead, TablePagination,TableRow, TableSortLabel } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { TableIcon, JsonIcon } from 'mdi-react';
import moment from 'moment';
import { connect } from "react-redux";
import { compose } from 'lodash/fp';
import _ from 'lodash';
import { CSVLink } from "react-csv";
import { export2JSON } from "../../../../utils/export2JSON";
import { Button as MaterialButton } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import FlagIcon from './FlagIcon';
import LogsFilter from './LogsFilter';
import styled from 'styled-components';

const MobileWrapper = styled.section`

  @media (max-width: 842px) {
   display: none !important;
  }

`;

function getSorting(data, order, orderBy) {

    const sortedData = _.orderBy(data, [orderBy], order)
    .map(row => ({...row, creation_timestamp: moment(row.creation_timestamp).format("lll")}));

    return sortedData;
}

const rows = [ 

    {
        id: '_id',
        label: 'Id',
        numeric: true
    },
    {
        id: 'ip',
        label: 'IP',
        numeric: true
    },
    {
        id: 'process',
        label: 'Process',
        numeric: false
    },
    {
        id: 'countryCode',
        label: 'Country',
        numeric: false
    },
    {
        id: 'route',
        label: 'Route',
        numeric: false
    },
    {
        id: 'creatorId',
        label: 'Creator Id',
        numeric: true
    },
    {
        id: 'creatorType',
        label: 'Creator Type',
        numeric: false
    },
    {
        id: 'code',
        label: 'Code',
        numeric: false
    },
    {
        id: 'createdAt',
        label: 'Created At',
        numeric: true
    },
    {
        id: 'updatedAt',
        label: 'Updated At',
        numeric: true
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
        style={{ paddingLeft: 0 }}
        className={classNames(classes.root, {
            [classes.highlight]: numSelected > 0,
        })}
        >
        <MobileWrapper>
            <div className={classes.title}>
                <Typography style={{ fontSize: 15, width: 300 }}variant="h6" id="tableTitle">
                    Restricted Countries
                </Typography>
            </div>
        </MobileWrapper>
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
            ticker: 'N/A',
            rowsPerPage: 5,
            showFilter: false,
            lastFilter: null
        };
    }


    componentDidMount(){
        this.projectData(this.props)
    }

    projectData = async (props) => {
        const { App } = props.profile;

        this.setLoading(true);

        const appLogs = await App.getLogs({ filters: { limit: 100, offset: 0, filter: 'UNAUTHORIZED_COUNTRY' } });

        const logs = appLogs.data.message.list;

        if (logs.length > 0) {
            this.setState({...this.state, 
                data: logs
            })
        } else {
            this.setState({...this.state, 
                data: []
            })
        }

        this.setLoading(false);
    }

    setLoading = (status) => {
        this.setState(state => ({ isLoading: status }));
    }

    setData = async (data) => {

        this.setState({...this.state, 
            data: data,
            page: 0
        })

    }

    setFilter = (filter) => {
        this.setState({ lastFilter: filter });
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

    handleChangePage = async (event, page) => {
        const { data, rowsPerPage, lastFilter } = this.state;
        const { App } = this.props.profile;

        if (page === Math.ceil(data.length / rowsPerPage)) {

            this.setLoading(true);

            const res = await App.getLogs({ 
                filters: lastFilter ? {...lastFilter, offset: data.length, filter: 'UNAUTHORIZED_COUNTRY' } 
                : { limit: 100, offset: data.length, filter: 'UNAUTHORIZED_COUNTRY' } });
                
            const logs = res.data.message.list;
            
            if (logs.length > 0) {
                this.setState({
                    data: data.concat(logs),
                    page: page
                })

            }

            this.setLoading(false);

        } else {
            this.setState({ page });
        }

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
    const { data, order, orderBy, selected, rowsPerPage, page, isLoading } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const headers = [
        { label: "Id", key: "_id" },
        { label: "IP", key: "ip" },
        { label: "Process", key: "process" },
        { label: "Country Code", key: "countryCode" },
        { label: "Route", key: "route" },
        { label: "Creator Id", key: "creatorId" },
        { label: "Creator Type", key: "creatorType" },
        { label: "Code", key: "code" },
        { label: "Created At", key: "createdAt" },
        { label: "Updated At", key: "updatedAt" }
    ];

    let csvData = [{}];
    let jsonData = [];

    if (!_.isEmpty(data)) {
        csvData = data.map(row => ({...row, 
            createdAt: moment(row.createdAt).format("lll"),
            updatedAt: moment(row.updatedAt).format("lll")}));

        jsonData = csvData.map(row => _.pick(row, ['_id', 'ip', 'process', 'countryCode', 'route', 'creatorId', 'creatorType', 'code', 'createdAt', 'updatedAt']));
    }

    return (
            <>
            <div style={{ display: "flex", justifyContent: "flex-end"}}>
                <CSVLink data={csvData} filename={"bets.csv"} headers={headers}>
                    <MaterialButton variant="contained" size="small" style={{ textTransform: "none", backgroundColor: "#008000", color: "#ffffff", boxShadow: "none", margin: 10}}>
                        <TableIcon style={{marginRight: 7}}/> CSV
                    </MaterialButton>
                </CSVLink>
                <MaterialButton onClick={() => export2JSON(jsonData, "bets")} variant="contained" size="small" style={{ textTransform: "none", boxShadow: "none", margin: 10}}>
                    <JsonIcon style={{marginRight: 7}}/> JSON
                </MaterialButton>
            </div>
            <EnhancedTableToolbar numSelected={selected.length} filterClick={this.handleFilterClick}/>
            <LogsFilter setData={this.setData} setFilter={this.setFilter} reset={this.reset} setLoading={this.setLoading} loading={this.state.isLoading}/>
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
                            <TableCell align="left"><p className='text-small'>{n.ip}</p></TableCell>
                            <TableCell align="left"><p className='text-small'>{n.process}</p></TableCell>
                            <TableCell align="left">                                
                            <div style={{display: 'flex'}}>
                                <FlagIcon code={n.countryCode.toLowerCase()} size={'1x'}/>
                                    <p className='text-small' style={{margin: 5}}>{n.countryCode}</p>
                                </div>
                            </TableCell>
                            <TableCell align="left"><p className='text-small'>{n.route}</p></TableCell>
                            <TableCell align="left"><p className='text-small'>{n.creatorId}</p></TableCell>
                            <TableCell align="left"><p className='text-small'>{n.creatorType}</p></TableCell>
                            <TableCell align="left"><p className='text-small'>{n.code}</p></TableCell>
                            <TableCell align="left"><p className='text-small'>{ moment(n.createdAt).format("lll")}</p></TableCell>
                            <TableCell align="left"><p className='text-small'>{ moment(n.updatedAt).format("lll")}</p></TableCell>
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
                rowsPerPageOptions={[5, 10, 25, 50]}
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
            <br/>
        </>
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

