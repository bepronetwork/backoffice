import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import { Container, Text, BoldText, WonResult } from './styles';

import { Table, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

class BetsTable extends React.Component {
        constructor(props){
        super(props)
        this.state = {
            data: [],
            pagination: {
                current: 1,
                pageSize: 10,
            },
            isLoading: false
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
                 isJackpot: false 
                }
        });

        const bets = response.data.message.list;
        const { currencies, games } = App.params;

        this.setState({
            data: _.isEmpty(bets) ? [] : this.prepareTableData(bets, currencies, games),
            columns: this.prepareTableColumns(bets),
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

    prepareTableColumns = bets => {

        if (_.isEmpty(bets)) return [];

        return [
            { title: 'Id', dataIndex: '_id', key: '_id', render: _id => <BoldText>{_id}</BoldText> },
            { title: 'User', dataIndex: 'user', key: 'user', render: user => this.getUserImage(user) },
            { title: 'Currency', dataIndex: 'currency', key: 'currency', render: currency => this.getCurrencyImage(currency) },
            { title: 'Game', dataIndex: 'game', key: 'game', render: game => this.getGameImage(game) },
            { title: 'Won', dataIndex: 'isWon', key: 'isWon', render: isWon => <WonResult isWon={isWon}>{isWon ? 'Yes' : 'No'}</WonResult> },
            { title: 'Win Amount', dataIndex: 'winAmount', key: 'winAmount', render: (winAmount, currency) => <Text>{ `${winAmount.toFixed(6)} ${currency.ticker}` }</Text> },
            { title: 'Fee', dataIndex: 'fee', key: 'fee', render: (fee, currency) => <Text>{ `${fee.toFixed(6)} ${currency.ticker}` }</Text> },
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

    fetchMoreData = async (dataSize) => {
        const { profile } = this.props;
        const { App } = profile;
        const { data } = this.state;

        this.setState({
            isLoading: true
        })

        const response = await App.getAllBets({ 
            filters: {
                 size: 100, 
                 offset: dataSize,
                 isJackpot: false 
                }
        });

        const bets = response.data.message.list;
        const { currencies, games } = App.params;

        this.setState({
            data: _.isEmpty(bets) ? [] : _.concat(data, this.prepareTableData(bets, currencies, games)),
            isLoading: false
        })
    }

    render() {
        const { data, columns, pagination, isLoading } = this.state;

        return (
            <>
            <Container>
                <Table 
                dataSource={data} 
                columns={columns} 
                size="small" 
                loading={{ spinning: isLoading, indicator: <Spin indicator={<LoadingOutlined style={{ fontSize: 30, color: '#894798' }} spin />}/> }}
                pagination={pagination}
                onChange={(pagination, _filters, _sorter, extra) => this.handleTableChange(pagination, extra)}/>
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