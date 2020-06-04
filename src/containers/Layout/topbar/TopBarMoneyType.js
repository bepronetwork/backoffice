import React from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import styled from 'styled-components';

const MobileWrapper = styled.section`

  @media (max-width: 578px) {
   display: none !important;
  }

`;

class TopBarMoneyType extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { profile } = this.props;
        const { virtual } = profile.getApp().getParams();

        return (
            <MobileWrapper>
                <button className="topbar__btn" onClick={this.toggle}>
                    <span className="topbar__virutal-btn-title" style={{height : 35}}>
                        <p>{ virtual === true ? 'Fake Money' : 'Real Money' }</p>
                    </span>
                </button>
            </MobileWrapper>
        );
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(TopBarMoneyType);

