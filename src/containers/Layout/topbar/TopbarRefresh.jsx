/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import store from '../../App/store';
import { setLoadingStatus } from '../../../redux/actions/loadingAction';
import { ButtonBase } from '@material-ui/core';
import styled from "styled-components";

const MobileWrapper = styled.section`

  @media (max-width: 756px) {
   display: none !important;
  }

`;

class TopbarRefresh extends PureComponent {
    state = {
      isLoading: false,
      disabled: false
    };

  refresh = async () => {
    const { profile } = this.props;

    store.dispatch(setLoadingStatus(true));
    this.setState({ isLoading: true, disabled: true });

    await profile.getData();
    
    this.setState({ isLoading: false, disabled: false })
    store.dispatch(setLoadingStatus(false));
    
  }

  render() {
    const { isLoading, disabled } = this.state;

    return (
      <MobileWrapper>
        <ButtonBase style={{ height: "100%" }} onClick={this.refresh} disabled={disabled}>
          { isLoading ? (
            <i className="fas fa-sync fa-spin fa-lg" style={{ margin: 7, color: '#646777' }}/>

          ) : (
            <i className="fas fa-sync fa-lg" style={{ margin: 7, color: '#646777' }}/>
          )}

        </ButtonBase>
      </MobileWrapper>
        
    );
  }
}

function mapStateToProps(state){
  return {
      profile: state.profile
  };
}

export default connect(mapStateToProps)(TopbarRefresh);
