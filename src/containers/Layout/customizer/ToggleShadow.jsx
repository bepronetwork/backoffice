import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CustomizerProps } from '../../../shared/prop-types/ReducerProps';

class ToggleShadow extends PureComponent {
  static propTypes = {
    customizer: CustomizerProps.isRequired,
    toggleBoxShadow: PropTypes.func.isRequired,
  };

  render() {
    const { toggleBoxShadow, customizer } = this.props;

    return (
      <div className="toggle-btn customizer__toggle">
        <input
          className="toggle-btn__input"
          type="checkbox"
          name="shadow_toggle"
          checked={customizer.withBoxShadow}
          onChange={() => {}}
        />
        <button
          className="toggle-btn__input-label"
          onClick={toggleBoxShadow}
        >
          Toggle
        </button>
        <span>{'Block\'s Shadows'}</span>
      </div>
    );
  }
}

export default ToggleShadow;
