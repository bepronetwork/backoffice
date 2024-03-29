import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import { Container, Header, TableContainer, Filters, Export, Text, BoldText, WonResult } from './styles';
import { Table, Spin, DatePicker, Select, Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { CSVLink } from "react-csv";
import { Button as MaterialButton } from "@material-ui/core";
import { TableIcon, JsonIcon, AlarmLightIcon } from 'mdi-react';

import BetContainer from '../../../../shared/components/BetContainer';
import { export2JSON } from '../../../../utils/export2JSON';

const { RangePicker } = DatePicker;
const { Option } = Select;

class BetsTable extends React.Component {
        constructor(props){
        super(props)
        this.state = {
            data: [],
            games: [],
            currencies: [],
            pagination: {
                current: 1,
                pageSize: 10,
            },
            isLoading: false,
            game: null,
            currency: null,
            begin_at: null,
            end_at: null,
            username: null,
            bet: null
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

        const response = await App.getAllBets({ 
            filters: {
                 size: 100, 
                 isJackpot: false,
                 tag: 'cassino'
                }
        });

        const bets = response.data.message.list;
        const { currencies, games } = App.params;

        this.setState({
            data: _.isEmpty(bets) ? [] : this.prepareTableData(bets, currencies, games),
            columns: this.prepareTableColumns(bets),
            currencies: currencies,
            games: games,
            isLoading: false
        })
    }

    prepareTableData = (bets, currencies, games) => {

        if (_.isEmpty(bets) || _.isEmpty(currencies) || _.isEmpty(games)) return [];

        return bets.map(bet => {
            const currency = currencies.find(currency => currency._id === bet.currency);
            const game = games.find(game => game._id === bet.game);

            return {
                key: bet._id, 
                _id: bet._id,
                user: bet.user,
                currency: currency, 
                app: bet.app,
                game: game,
                ticker: currency.ticker,
                isWon: bet.isWon,
                winAmount: bet.winAmount,
                betAmount: bet.betAmount,
                nonce: bet.nonce,
                fee: bet.fee,
                creation_timestamp: bet.timestamp,
                clientSeed: bet.clientSeed,
                serverSeed: bet.serverSeed,
                serverHashedSeed: bet.serverHashedSeed
            }
        })
    }

    getBetContainer = data => {
        const bet = {...data, creation_timestamp: moment(data.creation_timestamp).format('lll')};

        return (
            <BetContainer bet={bet} id={bet.currency._id}>
                <BoldText>{bet._id}</BoldText>
            </BetContainer>
        )
    }

    getUserImage = user => (
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <img src={`https://avatars.dicebear.com/v2/avataaars/${user._id}.svg`} alt={user.username} style={{ height: 30, width: 30, margin: "0px 10px" }}/>
            <Text>{user.username}</Text>
        </div>
    )

    getCurrencyImage = currency => (
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <img src={currency.image} alt={currency.name} style={{ height: 25, width: 25, margin: "0px 10px" }}/>
            <Text>{currency.name}</Text>
        </div>
    )

    getGameImage = game => (
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <img src={game.image_url} alt={game.name} style={{ height: 40, width: 50, margin: "0px 10px" }}/>
            <Text>{game.name}</Text>
        </div>
    )

    getFormatedAmount = ({ value, currency, colorized }) => (
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            { colorized 
            ? <Text style={{ color: value > 0 ? '#63c965' : '#e6536e' }}>{`${value.toFixed(6)} ${currency.ticker}`}</Text> 
            : <Text>{`${value.toFixed(6)} ${currency.ticker}`}</Text> }
        </div>
    )

    prepareTableColumns = bets => {

        if (_.isEmpty(bets)) return [];

        return [
            { title: 'Id', dataIndex: '_id', key: '_id', render: (_id, data, _length) => this.getBetContainer(data) },
            { title: 'User', dataIndex: 'user', key: 'user', render: user => this.getUserImage(user) },
            { title: 'Currency', dataIndex: 'currency', key: 'currency', render: currency => this.getCurrencyImage(currency) },
            { title: 'Game', dataIndex: 'game', key: 'game', render: game => this.getGameImage(game) },
            { title: 'Won', dataIndex: 'isWon', key: 'isWon', render: isWon => <WonResult isWon={isWon}>{isWon ? 'Yes' : 'No'}</WonResult> },
            { title: 'Bet Amount', dataIndex: 'betAmount', key: 'betAmount', render: (betAmount, currency) => this.getFormatedAmount({ value: betAmount, currency: currency, colorized: false }) },
            { title: 'Win Amount', dataIndex: 'winAmount', key: 'winAmount', render: (winAmount, currency) => this.getFormatedAmount({ value: winAmount, currency: currency, colorized: true }) },
            { title: 'Fee', dataIndex: 'fee', key: 'fee', render: (fee, currency) => this.getFormatedAmount({ value: fee, currency: currency, colorized: false }) },
            { title: 'Created At', dataIndex: 'creation_timestamp', key: 'creation_timestamp', render: creation_timestamp => <Text>{ moment(creation_timestamp).format("lll") }</Text> }
        ]
    }

    handleTableChange = async (pagination, extra) => {
        const { current, pageSize } = pagination;
        const { currentDataSource } = extra;

        this.setState({
            pagination: pagination
        })

        const dataSize = _.size(currentDataSource);

        if (parseInt(dataSize / pageSize) === current) {
            await this.fetchMoreData(dataSize);
        }
    }

    onChangeDate = (_value, dateString) => {
        const [begin_at, end_at] = dateString;

        this.setState({
            begin_at: begin_at,
            end_at: end_at
        }, () => {
            this.fetchFilteredData()
        })
    }

    onChangeGame = value => {
        this.setState({
            game: value ? value : null
        }, () => {
            this.fetchFilteredData()
        })
    }

    onChangeCurrency = value => {
        this.setState({
            currency: value ? value : null
        }, () => {
            this.fetchFilteredData()
        })
    }

    onChangeBetId = event => {
        this.setState({
            bet: event.target.value ? event.target.value : null
        }, () => {
            this.fetchFilteredData()
        })
    }

    onChangeUsername = event => {
        this.setState({
            username: event.target.value ? event.target.value : null
        }, () => {
            this.fetchFilteredData()
        })
    }

    fetchMoreData = async (dataSize) => {
        const { profile } = this.props;
        const { App } = profile;
        const { data, game, currency, begin_at, end_at, username, bet } = this.state;

        this.setState({
            isLoading: true
        })

        const response = await App.getAllBets({ 
            filters: {
                 size: 100, 
                 offset: dataSize,
                 isJackpot: false,
                 tag: 'cassino',
                 game: game,
                 currency: currency,
                 begin_at: begin_at,
                 end_at: end_at,
                 username: username,
                 bet: bet
                }
        });

        const bets = response.data.message.list;
        const { currencies, games } = App.params;

        this.setState({
            data: _.isEmpty(bets) ? data : _.concat(data, this.prepareTableData(bets, currencies, games)),
            isLoading: false
        })
    }

    fetchFilteredData = _.debounce(async () => {
        const { game, currency, begin_at, end_at, username, bet } = this.state;
        const { profile } = this.props;
        const { App } = profile;

        this.setState({
            isLoading: true
        })

        const response = await App.getAllBets({ 
            filters: {
                 size: 100, 
                 offset: 0,
                 isJackpot: false,
                 tag: 'cassino',
                 game: game,
                 currency: currency,
                 begin_at: begin_at,
                 end_at: end_at,
                 username: username,
                 bet: bet
            }
        });

        const bets = response.data.message.list;
        const { currencies, games } = App.params;

        this.setState({
            data: _.isEmpty(bets) ? [] : this.prepareTableData(bets, currencies, games),
            isLoading: false
        })
    }, 700);

    render() {
        const { data, columns, pagination, isLoading, games, currencies } = this.state;

        const headers = [
            { label: "Id", key: "_id" },
            { label: "User", key: "user" },
            { label: "Currency", key: "currency" },
            { label: "Game", key: "game" },
            { label: "Won", key: "isWon" },
            { label: "Win Amount", key: "winAmount" },
            { label: "Bet Amount", key: "betAmount" },
            { label: "Fee", key: "fee" },
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
    
            jsonData = csvData.map(row => _.pick(row, ['_id', 'user', 'currency', 'game', 'isWon', 'winAmount', 'betAmount', 'fee', 'creation_timestamp']));
        }

        return (
            <>
            <Container>
                <Header>
                    <Filters>
                        <RangePicker 
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
                        <Input style={{ width: 150, height: 32, margin: 5 }} placeholder="Username or E-mail" onChange={event => this.onChangeUsername(event)}/>
                        <Select
                        // mode="multiple"
                        style={{ minWidth: 150, margin: 5 }}
                        placeholder="Game"
                        onChange={this.onChangeGame}
                        >   
                            <Option key={''}>All</Option>
                            { games.map(game => (
                                <Option key={game._id}>{game.name}</Option>
                            ))}
                        </Select>
                        <Select
                        // mode="multiple"
                        style={{ minWidth: 150, margin: 5 }}
                        placeholder="Currency"
                        onChange={this.onChangeCurrency}
                        >   
                            <Option key={''}>All</Option>
                            { currencies.map(currency => (
                                <Option key={currency._id}>{this.getCurrencyImage(currency)}</Option>
                            ))}
                        </Select>
                    </Filters>
                    <Export>
                        <CSVLink data={csvData} filename={"bets.csv"} headers={headers}>
                            <MaterialButton variant="contained" size="small" style={{ textTransform: "none", backgroundColor: "#008000", color: "#ffffff", boxShadow: "none", margin: 10}}>
                                <TableIcon style={{marginRight: 7}}/> CSV
                            </MaterialButton>
                        </CSVLink>
                        <MaterialButton onClick={() => export2JSON(jsonData, "bets")} variant="contained" size="small" style={{ textTransform: "none", boxShadow: "none", margin: 10}}>
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


export default connect(mapStateToProps)(BetsTable);