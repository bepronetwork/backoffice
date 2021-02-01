import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import { Container, Header, TableContainer, Filters, Export, Text } from './styles';
import { Table, Spin, Input, Space, Button } from 'antd';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';

import { CSVLink } from "react-csv";
import { Button as MaterialButton } from "@material-ui/core";
import { TableIcon, JsonIcon } from 'mdi-react';
import { export2JSON } from '../../../utils/export2JSON';
import { AddressConcat } from '../../../lib/string';

import Highlighter from 'react-highlight-words';

class WithdrawalsTable extends React.Component {
        constructor(props){
        super(props)
        this.state = {
            data: [],
            currencies: [],
            pagination: {
                current: 1,
                pageSize: 10,
            },
            isLoading: false,
            currency: null,
            searchText: '',
            searchedColumn: '',
            withdraw: null
        };

    }

    componentDidMount() {
        this.projectData(this.props);
    }

    componentWillReceiveProps(props) {
        this.projectData(props);
    }

    projectData = async (props) => {
        const { profile } = props;
        const { App } = profile;

        this.setState({
            isLoading: true
        })

        const usersWithdrawals = await App.getUsersWithdrawals({ size: 100, offset: 0 });

        const withdrawals = usersWithdrawals ? usersWithdrawals : [];
        const { currencies } = App.params;

        this.setState({
            data: _.isEmpty(withdrawals) ? [] : this.prepareTableData(_.orderBy(withdrawals, 'creation_timestamp', ['desc']), currencies),
            columns: this.prepareTableColumns(_.orderBy(withdrawals, 'creation_timestamp', ['desc'])),
            currencies: currencies,
            isLoading: false
        })
    }

    prepareTableData = (withdrawals, currencies) => {

        if (_.isEmpty(withdrawals) || _.isEmpty(currencies)) return [];

        return withdrawals.map(withdraw => {
            const currency = currencies.find(currency => currency._id === withdraw.currency);

            return {
                key: withdraw._id, 
                _id: withdraw._id,
                address: withdraw.address,
                user: withdraw.user,
                currency: currency || { ticker: 'N/A'}, 
                ticker: currency ? currency.ticker : 'NA',
                amount: withdraw.amount,
                timestamp: withdraw.creation_timestamp,
                transactionHash: withdraw.transactionHash,
                link_url: withdraw.link_url,
                status: withdraw.status
            }
        })
    }

    getFormatedAmount = ({ value, currency, colorized }) => (
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            { colorized 
            ? <Text style={{ color: value > 0 ? '#63c965' : '#e6536e' }}>{`${value.toFixed(6)} ${currency.ticker}`}</Text> 
            : <Text>{`${value.toFixed(6)} ${currency.ticker}`}</Text> }
        </div>
    )

    getConfirmedStatus = ({ _id, status }) => (
        <p className={`text-small ${["Canceled", "Queue"].includes(status.status) ? "background-white-red text-red" : "background-white-green text-green"} `}>{status.status}</p> 
    )

    prepareTableColumns = withdrawals => {

        if (_.isEmpty(withdrawals)) return [];

        return [
            { title: 'Id', dataIndex: '_id', key: '_id', render: _id => <Text>{_id}</Text>, ...this.getColumnSearchProps('_id') },
            { title: 'User', dataIndex: 'user', key: 'user', render: user => <Text>{user}</Text>, ...this.getColumnSearchProps('user') },
            { title: 'Transaction Hash', dataIndex: 'transactionHash', key: 'transactionHash', render: (transactionHash, link_url) => transactionHash ? <a href={link_url.link_url} target="_blank" rel="noopener noreferrer"><Text>{AddressConcat(transactionHash)}</Text></a> : <Text>N/A</Text>},
            { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (amount, currency) => this.getFormatedAmount({ value: amount, currency: currency, colorized: false }), sorter: (a, b) => a.amount - b.amount },
            { title: 'Created At', dataIndex: 'timestamp', key: 'timestamp', render: timestamp => <Text>{ moment(timestamp).format("lll") }</Text>, sorter: (a, b) => moment(a.timestamp) - moment(b.timestamp) },
            { title: 'Status', dataIndex: 'status', key: 'status', render: (_id, status) => this.getConfirmedStatus({ _id: _id, status: status }), sorter: (a, b) => a.status.length - b.status.length }
        ]
    }

    handleTableChange = async (pagination, extra) => {
        const { current, pageSize } = pagination;
        const { currentDataSource } = extra;

        this.setState({
            pagination: pagination
        })

        const dataSize = _.size(currentDataSource);

        if (Math.ceil(dataSize / pageSize) === current) {
            await this.fetchMoreData(dataSize);
        }
    }

    fetchMoreData = async (dataSize) => {
        const { profile } = this.props;
        const { App } = profile;
        const { data, _id, user } = this.state;

        this.setState({
            isLoading: true
        })

        const response = await App.getUsersWithdrawals({ size: 100, offset: dataSize, filters: { transactionId: _id, user } });

        const withdrawals = response;
        const { currencies } = App.params;

        this.setState({
            data: _.isEmpty(withdrawals) ? data : _.orderBy(_.concat(data, this.prepareTableData(withdrawals, currencies)), 'timestamp', ['desc']),
            isLoading: false
        })
    }

    getColumnSearchProps = dataIndex => ({ 
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#894798' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select(), 100);
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    
    handleSearch = async (selectedKeys, confirm, dataIndex) => {
        this.setState({
        [dataIndex]: selectedKeys[0],
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });

        await this.fetchMoreData();
        confirm()
      };
    
    handleReset = async clearFilters => {
        clearFilters();
        this.setState({ searchText: '', _id: '', user: '' });
        await this.fetchMoreData();
      };

    render() {
        const { data, columns, pagination, isLoading } = this.state;

        const headers = [
            { label: "Id", key: "_id" },
            { label: "User", key: "user" },
            { label: "Currency", key: "currency" },
            { label: "Status", key: "status" },
            { label: "Transaction Hash", key: "transactionHash"},
            { label: "Amount", key: "amount" },
            { label: "Created At", key: "createdAt" }
        ];
    
        let csvData = [{}];
        let jsonData = [];
    
        if (!_.isEmpty(data)) {
            csvData = data.map(row => ({...row, currency: row.currency.name, transactionHash: row.transactionHash ? row.transactionHash : "N/A", createdAt: moment(row.timestamp).format("lll")}));
    
            jsonData = csvData.map(row => _.pick(row, ['_id', 'user', 'currency', 'confirmed', 'amount', 'bonusAmount', 'transactionHash', 'createdAt']));
        }

        return (
            <>
            <Container>
                <Header>
                    <Filters>
                    </Filters>
                    <Export>
                        <CSVLink data={csvData} filename={"withdrawals.csv"} headers={headers}>
                            <MaterialButton variant="contained" size="small" style={{ textTransform: "none", backgroundColor: "#008000", color: "#ffffff", boxShadow: "none", margin: 10}}>
                                <TableIcon style={{marginRight: 7}}/> CSV
                            </MaterialButton>
                        </CSVLink>
                        <MaterialButton onClick={() => export2JSON(jsonData, "withdrawals")} variant="contained" size="small" style={{ textTransform: "none", boxShadow: "none", margin: 10}}>
                            <JsonIcon style={{marginRight: 7}}/> JSON
                        </MaterialButton>
                    </Export>
                </Header>
                <TableContainer>
                    <Table 
                    dataSource={data} 
                    columns={columns} 
                    size="small" 
                    loading={{ spinning: isLoading, indicator: <Spin indicator={<LoadingOutlined style={{ fontSize: 30, color: '#894798' }} spin />}/> }}
                    pagination={pagination}
                    onChange={(pagination, _filters, _sorter, extra) => this.handleTableChange(pagination, extra)}/>
                </TableContainer>
            </Container>
            </>

        )
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}


export default connect(mapStateToProps)(WithdrawalsTable);