import React from 'react';
import { Collapse } from 'reactstrap';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { setDataPeriodicity } from '../../../redux/actions/periodicityAction';
import { setLoadingStatus } from '../../../redux/actions/loadingAction';
import { connect } from "react-redux";
import _ from 'lodash';
import store from '../../App/store';

const renderPeriodicity = ({periodicity}) => (
    <span className="topbar__periodicity-btn-title" style={{height : 20}}>
        <p style={{marginTop : -3}}>{periodicity}</p>
    </span>
)

class TopBarPeriodicity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            periodicities : ['all', 'monthly', 'weekly'],
            collapse: false,
            mainButtonContent: null,
        };
    }

    componentDidMount(props){
        this.projectData(this.props);
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData(props){
        var { periodicity } = props; 

        this.setState({
            periodicity,
            mainButtonContent : periodicity ? renderPeriodicity({periodicity : periodicity}) : null
        });
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    };

    changePeriodicity = async ({periodicity}) => {
        const { profile } = this.props;
        store.dispatch(setLoadingStatus(true));
        await store.dispatch(setDataPeriodicity(periodicity));
        this.toggle();
        await profile.getData();
        store.dispatch(setLoadingStatus(false));
    };

    render() {
        const { periodicities } = this.state;
        return (
            <div className="topbar__collapse topbar__collapse--periodicity">
                <button className="topbar__btn" onClick={this.toggle}>
                    {this.state.mainButtonContent}
                    <DownIcon className="topbar__icon" />
                </button>
                <Collapse
                    isOpen={this.state.collapse}
                    className="topbar__collapse-content topbar__collapse-content--periodicity">
                    {periodicities.map( p => {
                        return (
                            <button
                                className="topbar__periodicity-btn"
                                type="button"
                                onClick={() => this.changePeriodicity({periodicity : p})}
                                key={p}
                            >
                                {renderPeriodicity({periodicity : p})}
                            </button>
                        )
                    })}
                </Collapse>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile,
        periodicity : state.periodicity
    };
}

export default connect(mapStateToProps)(TopBarPeriodicity);

