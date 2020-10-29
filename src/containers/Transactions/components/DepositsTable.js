import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import { Container, Header, TableContainer, Filters, Export, Text } from './styles';
import { Table, Spin, DatePicker, Select, Input, Space, Button } from 'antd';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';

import { CSVLink } from "react-csv";
import { Button as MaterialButton } from "@material-ui/core";
import { TableIcon, JsonIcon } from 'mdi-react';
import { export2JSON } from '../../../utils/export2JSON';
import { AddressConcat } from '../../../lib/string';

import Highlighter from 'react-highlight-words';

const { RangePicker } = DatePicker;
const { Option } = Select;

class DepositsTable extends React.Component {
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

        const userDeposits = await App.getUsersDeposits({ size: 100, offset: 0 });

        const deposits = userDeposits.data.message ? userDeposits.data.message : [];
        const { currencies } = App.params;

        this.setState({
            data: _.isEmpty(deposits) ? [] : this.prepareTableData(_.orderBy(deposits, 'timestamp', ['desc']), currencies),
            columns: this.prepareTableColumns(_.orderBy(deposits, 'timestamp', ['desc'])),
            currencies: currencies,
            isLoading: false
        })
    }

    prepareTableData = (deposits, currencies) => {

        if (_.isEmpty(deposits) || _.isEmpty(currencies)) return [];

        return deposits.map(deposit => {
            const currency = currencies.find(currency => currency._id === deposit.currency);

            return {
                key: deposit._id, 
                _id: deposit._id,
                user: deposit.user,
                currency: currency, 
                ticker: currency.ticker,
                confirmed: deposit.confirmed,
                amount: deposit.amount,
                hasBonus: deposit.hasBonus ? deposit.hasBonus : false,
                bonusAmount: deposit.hasBonus ? deposit.bonusAmount : 0,
                timestamp: deposit.timestamp,
                transactionHash: deposit.transactionHash,
                link_url: deposit.link_url
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

    getConfirmedStatus = ({ value }) => (
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <Text style={{ color: value ? '#63c965' : '#e6536e' }}>{value ? "Confirmed" : "Pending"}</Text> 
        </div>
    )

    prepareTableColumns = deposits => {

        if (_.isEmpty(deposits)) return [];

        return [
            { title: 'Id', dataIndex: '_id', key: '_id', render: _id => <Text>{_id}</Text>, ...this.getColumnSearchProps('_id') },
            { title: 'User', dataIndex: 'user', key: 'user', render: user => <Text>{user}</Text>, ...this.getColumnSearchProps('user') },
            { title: 'Transaction Hash', dataIndex: 'transactionHash', key: 'transactionHash', render: (transactionHash, link_url) => <a href={link_url.link_url} target="_blank" rel="noopener noreferrer"><Text>{AddressConcat(transactionHash)}</Text></a> },
            { title: 'Status', dataIndex: 'confirmed', key: 'confirmed', render: confirmed => this.getConfirmedStatus({ value: confirmed }), sorter: (a, b) => a.confirmed - b.confirmed },
            { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (amount, currency) => this.getFormatedAmount({ value: amount, currency: currency, colorized: false }), sorter: (a, b) => a.amount - b.amount },
            { title: 'Bonus', dataIndex: 'bonusAmount', key: 'bonusAmount', render: (bonusAmount, currency) => this.getFormatedAmount({ value: bonusAmount, currency: currency, colorized: false }), sorter: (a, b) => a.bonusAmount - b.bonusAmount },
            { title: 'Created At', dataIndex: 'timestamp', key: 'timestamp', render: timestamp => <Text>{ moment(timestamp).format("lll") }</Text>, sorter: (a, b) => moment(a.timestamp) - moment(b.timestamp) }
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
        const { data } = this.state;

        this.setState({
            isLoading: true
        })

        const response = await App.getUsersDeposits({ size: 100, offset: dataSize });

        const deposits = response.data.message;
        const { currencies } = App.params;

        this.setState({
            data: _.isEmpty(deposits) ? data : _.orderBy(_.concat(data, this.prepareTableData(deposits, currencies)), 'timestamp', ['desc']),
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
    
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };

    render() {
        const { data, columns, pagination, isLoading } = this.state;

        const headers = [
            { label: "Id", key: "_id" },
            { label: "User", key: "user" },
            { label: "Currency", key: "currency" },
            { label: "Confirmed", key: "confirmed" },
            { label: "Transaction Hash", key: "transactionHash"},
            { label: "Amount", key: "amount" },
            { label: "Bonus", key: "bonusAmount"},
            { label: "Created At", key: "createdAt" }
        ];
    
        let csvData = [{}];
        let jsonData = [];
    
        if (!_.isEmpty(data)) {
            csvData = data.map(row => ({...row, currency: row.currency.name, confirmed: row.confirmed ? "Yes" : "No", createdAt: moment(row.timestamp).format("lll")}));
    
            jsonData = csvData.map(row => _.pick(row, ['_id', 'user', 'currency', 'confirmed', 'amount', 'bonusAmount', 'transactionHash', 'createdAt']));
        }

        return (
            <>
            <Container>
                <Header>
                    <Filters>
                        {/* <RangePicker 
                        style={{ margin: 5 }}
                        onChange={this.onChangeDate} 
                        // onOk={this.onOk}
                        ranges={{
                            'Today': [moment().utc(), moment().utc()],
                            'Yesterday': [moment().subtract(1, 'days').utc(), moment().subtract(1, 'days').utc()],
                            'Last 7 days': [moment().subtract(7, 'days').utc(), moment().utc()],
                            'Last month': [moment().subtract(1, 'month').utc(), moment().utc()]
                        }}/>
                        <Input style={{ width: 150, height: 32, margin: 5 }} placeholder="Bet Id" onChange={event => this.onChangeBetId(event)}/>
                        <Select
                        // mode="multiple"
                        style={{ minWidth: 120, margin: 5 }}
                        placeholder="Currency"
                        onChange={this.onChangeCurrency}
                        >   
                            <Option key={''}>All</Option>
                            { currencies.map(currency => (
                                <Option key={currency._id}>{this.getCurrencyImage(currency)}</Option>
                            ))}
                        </Select>
                        <Select
                        mode="multiple"
                        style={{ minWidth: 170, margin: 5 }}
                        placeholder="Videogame"
                        onChange={this.onChangeVideogames}
                        >   
                            { Object.keys(videogames).map(key => (
                                <Option key={videogames[key]._id}>{videogames[key].name}</Option>
                            ))}
                        </Select>
                        <Select
                        // mode="multiple"
                        style={{ minWidth: 100, margin: 5 }}
                        placeholder="Type"
                        onChange={this.onChangeBetType}
                        >   
                            <Option key={''}>All</Option>
                            <Option key="simple">Simple</Option>
                            <Option key="multiple">Multiple</Option>
                        </Select> */}
                    </Filters>
                    <Export>
                        <CSVLink data={csvData} filename={"deposits.csv"} headers={headers}>
                            <MaterialButton variant="contained" size="small" style={{ textTransform: "none", backgroundColor: "#008000", color: "#ffffff", boxShadow: "none", margin: 10}}>
                                <TableIcon style={{marginRight: 7}}/> CSV
                            </MaterialButton>
                        </CSVLink>
                        <MaterialButton onClick={() => export2JSON(jsonData, "deposits")} variant="contained" size="small" style={{ textTransform: "none", boxShadow: "none", margin: 10}}>
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


export default connect(mapStateToProps)(DepositsTable);