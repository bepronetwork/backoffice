import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Videogame, Date, Status, Winner, Filters, DateFilter, StatusFilter, BookedFilter } from './styles';
import Match from '../Match';
import _, { keys } from 'lodash';
import moment from 'moment';

import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from "react-window-infinite-loader";

import MatchSkeleton from '../Skeletons/MatchSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';

import { DatePicker, Select, Checkbox } from 'antd';

import matchStatus from '../Enums/status';
const { RangePicker } = DatePicker;
const { Option } = Select;

class MatchList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            matches: [],
            isLoadingMatches: false
        };
      }

    componentDidMount(){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = (props) => {
        const { matches, videogames, seriesSelected, beginAt, endAt, showOnlyBookedMatches } = props;

        const series = _.concat(...videogames.map(videogame => videogame.series));

        this.setState({
            matches: matches,
            series: series,
            seriesSelected: seriesSelected,
            begin_at: beginAt,
            end_at: endAt,
            showOnlyBookedMatches: showOnlyBookedMatches
        })

    }

    fetchFilteredData = async () => {
        const { seriesSelected, begin_at, end_at, statusSelected, showOnlyBookedMatches } = this.state;
        const { profile } = this.props;
        const { App } = profile;

        const series = _.concat(Object.values(seriesSelected)).flat();

        if (showOnlyBookedMatches) {
            if (_.isEmpty(series)) {
                await App.getBookedMatches({ 
                    filters: { 
                        size: 10,
                        offset: 0, 
                        begin_at: begin_at,
                        end_at: end_at,
                        status: statusSelected
                    }
                });
    
                this.setState({ isLoadingMatches: false });
    
            } else {
                await App.getBookedSeriesMatches({ 
                    filters: {
                        size: 10, 
                        offset: 0,
                        serie_id: series, 
                        begin_at: begin_at,
                        end_at: end_at,
                        status: statusSelected
                    }
                });
    
                this.setState({ isLoadingMatches: false });
            }

        } else {
            if (_.isEmpty(series)) {
                await App.getMatchesAll({ 
                    filters: { 
                        size: 10, 
                        offset: 0,
                        begin_at: begin_at,
                        end_at: end_at,
                        status: statusSelected
                    }
                });
    
                this.setState({ isLoadingMatches: false });
    
            } else {
                await App.getSeriesMatches({ 
                    filters: {
                        size: 10, 
                        offset: 0,
                        serie_id: series, 
                        begin_at: begin_at,
                        end_at: end_at,
                        status: statusSelected
                    }
                });
    
                this.setState({ isLoadingMatches: false });
            }
        }

    }

    fetchMoreData = async () => {
        const { seriesSelected, matches, begin_at, end_at, statusSelected, showOnlyBookedMatches } = this.state;
        const { profile } = this.props;
        const { App } = profile;

        const series = _.concat(Object.values(seriesSelected)).flat();

        if (showOnlyBookedMatches) {
            if (_.isEmpty(series)) {
                await App.getBookedMatches({ 
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
                await App.getBookedSeriesMatches({ 
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

        } else {
            if (_.isEmpty(series)) {
                await App.getMatchesAll({ 
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
                await App.getSeriesMatches({ 
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
            end_at: end_at,
            isLoadingMatches: true
        }, () => this.fetchFilteredData())
    }

    onChangeStatus = (value) => {
        const { setStatusFilter } = this.props;

        setStatusFilter({ statusSelected: value });

        this.setState({
            statusSelected: !_.isEmpty(value) ? value : null,
            isLoadingMatches: true
        }, () => this.fetchFilteredData())
    }
    
    onChangeBookedFilter = () => {
        const { setBookedFilter } = this.props;
        
        setBookedFilter();
    }

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
        const { isLoading, setMatchPage, showOnlyBookedMatches, setBookedFilter } = this.props;
        const { matches, series, isLoadingMatches } = this.state;
        
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
                    <BookedFilter>
                        <Checkbox checked={showOnlyBookedMatches} onChange={setBookedFilter}>Show only Booked Matches</Checkbox>
                    </BookedFilter>
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
                 { isLoading && _.isEmpty(matches) ? (
                    _.times(10, () => <MatchSkeleton/>))
                : (
                    !_.isEmpty(matches) && !_.isEmpty(series) ? (
                        <InfiniteScroll
                        dataLength={this.state.matches.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.matches.length % 10 === 0}
                        loader={<MatchSkeleton/>}
                        style={{ display: "flex", flexDirection: "column", padding: 0 }}
                        >   
                            { isLoading || isLoadingMatches ? (
                                _.times(10, () => <MatchSkeleton/>)
                            ) : (
                                matches.map(match => (
                                    <Match data={match} series={series} setMatchPage={setMatchPage}/>
                                ))
                            )}            
                        </InfiniteScroll>
                    ) : null ) }
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