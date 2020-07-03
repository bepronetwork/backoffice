import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Videogame, Date, Status, Winner } from './styles';
import Match from '../Match';
import _ from 'lodash';

import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from "react-window-infinite-loader";

import MatchSkeleton from '../Skeletons/MatchSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';

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
        const { matches, videogames, seriesSelected } = props;

        const series = _.concat(...videogames.map(videogame => videogame.series));

        this.setState({
            matches: matches,
            series: series,
            seriesSelected: seriesSelected
        })

    }

    fetchMoreData = () => {
        const { seriesSelected, matches } = this.state;
        const { profile } = this.props;
        const { App } = profile;

        const series = _.concat(Object.values(seriesSelected)).flat();

        if (_.isEmpty(series)) {
            App.getMatchesAll({ size: 10, offset: matches.length, isPagination: true });
        } else {
            App.getSeriesMatches({ size: 10, offset: matches.length, serie_id: series, isPagination: true });
        }
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
        const { isLoading, setMatchPage } = this.props;
        const { matches, series } = this.state;
        
        if (_.isEmpty(matches) || _.isEmpty(series)) return null;

        const isItemLoaded = index => !!matches[index];

        return (
            <>
            <Container>
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
                <InfiniteScroll
                dataLength={this.state.matches.length}
                next={this.fetchMoreData}
                hasMore={true}
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