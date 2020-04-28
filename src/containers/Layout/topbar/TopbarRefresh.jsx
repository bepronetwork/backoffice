/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import store from '../../App/store';
import { setLoadingStatus } from '../../../redux/actions/loadingAction';

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
        <button className="topbar__btn" onClick={this.refresh} disabled={disabled}>
          { isLoading ? (
            <i className="fa fa-refresh fa-spin fa-sm" />
          ) : (
            <i className="fa fa-refresh fa-sm" />
          )}

        </button>
    );
  }
}

function mapStateToProps(state){
  return {
      profile: state.profile
  };
}

export default connect(mapStateToProps)(TopbarRefresh);
