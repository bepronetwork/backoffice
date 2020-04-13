import React from 'react';
import { connect } from "react-redux";
import _ from 'lodash';

class TopBarMoneyType extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { profile } = this.props;
        const { virtual } = profile.getApp().getParams();

        return (
            <div className="topbar__collapse topbar__collapse--language">
                <button className="topbar__btn" onClick={this.toggle}>
                    <span className="topbar__virutal-btn-title" style={{height : 20}}>
                        <p style={{marginTop : -3}}>{ virtual ? 'Fake Money' : 'Real Money' }</p>
                    </span>
                </button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(TopBarMoneyType);

