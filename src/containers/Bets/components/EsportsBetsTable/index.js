import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import { Container, Header, TableContainer, Filters, Export, Text, BoldText, BetType, WonResult, VideoGameIcon } from './styles';
import { Table, Spin, DatePicker, Select, Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { CSVLink } from "react-csv";
import { Button as MaterialButton } from "@material-ui/core";
import { TableIcon, JsonIcon } from 'mdi-react';

import BetContainer from '../../../../shared/components/BetContainer';
import { export2JSON } from '../../../../utils/export2JSON';

import videogamesEnum from '../../../Applications/EsportsPage/components/Enums/videogames';
import EsportsBetContainer from '../EsportsBetContainer';

const { RangePicker } = DatePicker;
const { Option } = Select;

class EsportsBetsTable extends React.Component {
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
            videogamesArr: null,
            currency: null,
            begin_at: null,
            end_at: null,
            type: null,
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
        const { profile, videogames } = props;
        const { App } = profile;

        this.setState({
            isLoading: true
        })

        if (_.isEmpty(videogames)) {
            await App.getVideoGamesAll();
        }

        const response = await App.getAllBets({ 
            filters: {
                 size: 100, 
                 tag: 'esports' 
                }
        });

        const bets = response.data.message.list;
        const { currencies } = App.params;

        this.setState({
            data: _.isEmpty(bets) ? [] : this.prepareTableData(bets, currencies, videogames),
            columns: this.prepareTableColumns(bets),
            currencies: currencies,
            isLoading: false
        })
    }

    getVideogameObj = id => {
        const { videogames } = this.props;

        const videogame = videogames.find(videgame => videgame._id === id);

        return videogame ? videogamesEnum[videogame.external_id] : {};
    }

    prepareTableData = (bets, currencies, videogames) => {

        if (_.isEmpty(bets) || _.isEmpty(currencies) || _.isEmpty(videogames)) return [];

        return bets.map(bet => {
            const currency = currencies.find(currency => currency._id === bet.currency);
            const videogames = _.uniq(bet.videogames).map(id => this.getVideogameObj(id));

            return {
                key: bet._id, 
                _id: bet._id,
                user: bet.user,
                videogames: videogames,
                currency: currency, 
                app: bet.app,
                ticker: currency.ticker,
                isWon: bet.isWon,
                winAmount: bet.winAmount,
                betAmount: bet.betAmount,
                type: bet.type,
                creation_timestamp: bet.created_at,  
                result: bet.result
            }
        })
    }

    getBetContainer = data => {
        const bet = {...data, creation_timestamp: moment(data.creation_timestamp).format('lll')};

        return (
            <EsportsBetContainer bet={bet} id={bet.currency._id}>
                <BoldText>{bet._id}</BoldText>
            </EsportsBetContainer>
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

    getVideogamesImages = videogames => (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            { videogames.map(videogame => (
                <VideoGameIcon>
                    { videogame.icon }
                </VideoGameIcon>
            ))}
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
            { title: 'Videogame', dataIndex: 'videogames', key: 'videogames', render: videogames => this.getVideogamesImages(videogames) },
            { title: 'Type', dataIndex: 'type', key: 'type', render: type => <BetType>{type}</BetType> },
            { title: 'Won', dataIndex: 'isWon', key: 'isWon', render: isWon => <WonResult isWon={isWon}>{isWon ? 'Yes' : 'No'}</WonResult> },
            { title: 'Bet Amount', dataIndex: 'betAmount', key: 'betAmount', render: (betAmount, currency) => this.getFormatedAmount({ value: betAmount, currency: currency, colorized: false }) },
            { title: 'Win Amount', dataIndex: 'winAmount', key: 'winAmount', render: (winAmount, currency) => this.getFormatedAmount({ value: winAmount, currency: currency, colorized: true }) },
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

    onChangeVideogames = value => {
        this.setState({
            videogamesArr: value ? value : null
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

    onChangeBetType = value => {
        this.setState({
            type: value ? value : null
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

    fetchMoreData = async (dataSize) => {
        const { profile, videogames } = this.props;
        const { App } = profile;
        const { data, game, currency, begin_at, end_at, type, videogamesArr, username, bet } = this.state;

        this.setState({
            isLoading: true
        })

        const response = await App.getAllBets({ 
            filters: {
                 size: 100, 
                 offset: dataSize,
                 tag: 'esports',
                 game: game,
                 currency: currency,
                 begin_at: begin_at,
                 end_at: end_at,
                 type: type,
                 videogames: videogamesArr,
                 bet: bet
                }
        });

        const bets = response.data.message.list;
        const { currencies } = App.params;

        this.setState({
            data: _.isEmpty(bets) ? data : _.concat(data, this.prepareTableData(bets, currencies, videogames)),
            isLoading: false
        })
    }

    fetchFilteredData = _.debounce(async () => {
        const { game, currency, begin_at, end_at, type, videogamesArr, username, bet } = this.state;
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
                 tag: 'esports',
                 game: game,
                 currency: currency,
                 begin_at: begin_at,
                 end_at: end_at,
                 type: type,
                 videogames: videogamesArr,
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
        const { videogames } = this.props;
        const { data, columns, pagination, isLoading, currencies } = this.state;

        const headers = [
            { label: "Id", key: "_id" },
            { label: "User", key: "user" },
            { label: "Currency", key: "currency" },
            { label: "Won", key: "isWon" },
            { label: "Bet Amount", key: "betAmount" },
            { label: "Win Amount", key: "winAmount" },
            { label: "Created At", key: "createdAt" }
        ];
    
        let csvData = [{}];
        let jsonData = [];
    
        if (!_.isEmpty(data)) {
            csvData = data.map(row => ({...row, currency: row.currency.name,
                user: row.user._id, 
                isWon: row.isWon ? 'Yes' : 'No',
                createdAt: moment(row.creation_timestamp).format("lll")}));
    
            jsonData = csvData.map(row => _.pick(row, ['_id', 'user', 'currency', 'isWon', 'betAmount', 'winAmount', 'creation_timestamp']));
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
        profile: state.profile,
        videogames: state.videogames
    };
}


export default connect(mapStateToProps)(EsportsBetsTable);