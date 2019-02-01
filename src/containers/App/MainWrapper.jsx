import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CustomizerProps, ThemeProps } from '../../shared/prop-types/ReducerProps';
import YM from './YM';
// todo: delete ym

class MainWrapper extends PureComponent {
  static propTypes = {
    customizer: CustomizerProps.isRequired,
    theme: ThemeProps.isRequired,
    children: PropTypes.element.isRequired,
  };

  render() {
    const { theme, customizer } = this.props;

    const wrapperClass = classNames({
      wrapper: true,
      'squared-corner-theme': customizer.squaredCorners,
      'blocks-with-shadow-theme': customizer.withBoxShadow,
      'top-navigation': customizer.topNavigation,
    });

    return (
      <div className={theme.className}>
        <YM />
        <div className={wrapperClass}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  theme: state.theme,
  customizer: state.customizer,
}))(MainWrapper);
