import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Videogame, Date, Status, Winner, Filters, DateFilter, StatusFilter } from './styles';
import Match from '../Match';
import _, { keys } from 'lodash';
import moment from 'moment';

import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from "react-window-infinite-loader";

import MatchSkeleton from '../Skeletons/MatchSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';

import { DatePicker, Select } from 'antd';

import matchStatus from '../Enums/status';
const { RangePicker } = DatePicker;
const { Option } = Select;

class MatchList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            matches: []
        };
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = (props) => {
        const { matches, videogames, seriesSelected, beginAt, endAt } = props;

        const series = _.concat(...videogames.map(videogame => videogame.series));

        this.setState({
            matches: matches,
            series: series,
            seriesSelected: seriesSelected,
            begin_at: beginAt,
            end_at: endAt
        })

    }

    fetchFilteredData = () => {
        const { seriesSelected, begin_at, end_at, statusSelected } = this.state;
        const { profile } = this.props;
        const { App } = profile;

        const series = _.concat(Object.values(seriesSelected)).flat();

        if (_.isEmpty(series)) {
            App.getMatchesAll({ 
                filters: { 
                    size: 10, 
                    begin_at: begin_at,
                    end_at: end_at,
                    status: statusSelected
                }
            });

        } else {
            App.getSeriesMatches({ 
                filters: {
                    size: 10, 
                    serie_id: series, 
                    begin_at: begin_at,
                    end_at: end_at,
                    status: statusSelected
                }
            });
        }
    }

    fetchMoreData = () => {
        const { seriesSelected, matches, begin_at, end_at, statusSelected } = this.state;
        const { profile } = this.props;
        const { App } = profile;

        const series = _.concat(Object.values(seriesSelected)).flat();

        if (_.isEmpty(series)) {
            App.getMatchesAll({ 
                filters: { 
                    size: 10, 
                    offset: matches.length,
                    begin_at: begin_at,
                    end_at: end_at,
                    status: statusSelected
                }, 
                isPagination: true 
            });

        } else {
            App.getSeriesMatches({ 
                filters: {
                    size: 10, 
                    offset: matches.length, 
                    serie_id: series, 
                    begin_at: begin_at,
                    end_at: end_at,
                    status: statusSelected
                },
                isPagination: true 
            });
        }
    }

    onChangeDate = (_value, dateString) => {
        const { setDateFilter } = this.props;

        const [begin_at, end_at] = dateString;

        setDateFilter({
            begin_at: begin_at,
            end_at: end_at
        })

        this.setState({
            begin_at: begin_at,
            end_at: end_at
        }, () => this.fetchFilteredData())
    }

    onChangeStatus = (value) => {
        const { setStatusFilter } = this.props;

        setStatusFilter({ statusSelected: value });

        this.setState({
            statusSelected: !_.isEmpty(value) ? value : null
        }, () => this.fetchFilteredData())
    }
      
    // onOk = (value) => {
    //     console.log('onOk: ', value);
    //   }

    Row = ({ index, key, style }) => {
        const { setMatchPage } = this.props;
        const { matches, series } = this.state;

        return (
            <div key={key} style={style}>
                <Match data={matches[index]} series={series} setMatchPage={setMatchPage} key={key} style={style}/>
            </div>
        )
    }

    render() {
        const { isLoading, setMatchPage } = this.props;
        const { matches, series } = this.state;

        // const isItemLoaded = index => !!matches[index];

        return (
            <>
            <Container>
                <Filters>
                    <DateFilter>
                    <RangePicker 
                    onChange={this.onChangeDate} 
                    // onOk={this.onOk}
                    ranges={{
                        'Today': [moment().utc(), moment().utc()],
                        'Yesterday': [moment().subtract(1, 'days').utc(), moment().subtract(1, 'days').utc()],
                        'Tomorrow': [moment().add(1, 'days').utc(), moment().add(1, 'days').utc()],
                        'Last 7 days': [moment().subtract(7, 'days').utc(), moment().utc()],
                        'Next 7 days': [moment().utc(), moment().add(7, 'days').utc()]
                      }}/>
                    </DateFilter>
                    <StatusFilter>
                    <Select
                        mode="multiple"
                        style={{ minWidth: 150 }}
                        placeholder="Match Status"
                        onChange={this.onChangeStatus}
                    >   
                        { Object.keys(matchStatus).map(key => (
                            <Option key={key}>{matchStatus[key].text}</Option>
                        ))}
                    </Select>
                    </StatusFilter>
                    
                </Filters>
                <Header>
                    <Videogame>
                        <span>VG</span>
                    </Videogame>
                    <Date>
                        <span>Date</span>
                    </Date>
                    <Status>
                        <span>Status</span>
                    </Status>
                    <Winner>
                        <span>Match winner</span>
                    </Winner>
                </Header>
                {/* { isLoading ? (
                    _.times(10, () => <MatchSkeleton/>)
                ) : (
                    <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    itemCount={matches.length + 10}
                    loadMoreItems={this.fetchMoreData}
                    placeholder={<MatchSkeleton/>}
                  >
                    {({ onItemsRendered, ref }) => (
                        <List
                        className="List"
                        height={1100}
                        itemCount={matches.length}
                        itemSize={110}
                        width="100%"
                        ref={ref}
                        onItemsRendered={onItemsRendered}
                        >
                            {this.Row}
                        </List>
                    )}
                    </InfiniteLoader>)} */}
                { !_.isEmpty(matches) && !_.isEmpty(series) ? (
                    <InfiniteScroll
                    dataLength={this.state.matches.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.matches.length % 10 === 0}
                    loader={<MatchSkeleton/>}
                    style={{ display: "flex", flexDirection: "column", padding: 0 }}
                    >   
                        { isLoading ? (
                            _.times(10, () => <MatchSkeleton/>)
                        ) : (
                            matches.map(match => (
                                <Match data={match} series={series} setMatchPage={setMatchPage}/>
                            ))
                        )}            
                    </InfiniteScroll>
                ) : null }
                
            </Container>
            </>
        )
    }

}

     

function mapStateToProps(state){
    return {
        profile: state.profile,
        matches: state.matches,
        videogames: state.videogames
    };
}


export default connect(mapStateToProps)(MatchList);