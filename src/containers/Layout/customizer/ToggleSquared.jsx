import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CustomizerProps } from '../../../shared/prop-types/ReducerProps';

class ToggleSquared extends PureComponent {
  static propTypes = {
    customizer: CustomizerProps.isRequired,
    changeBorderRadius: PropTypes.func.isRequired,
  };

  render() {
    const { changeBorderRadius, customizer } = this.props;

    return (
      <div className="toggle-btn customizer__toggle">
        <input
          className="toggle-btn__input"
          type="checkbox"
          name="square_toggle"
          checked={customizer.squaredCorners}
          onChange={() => {}}
        />
        <button
          className="toggle-btn__input-label"
          onClick={changeBorderRadius}
        >Toggle
        </button>
        <span>Squared borders</span>
      </div>
    );
  }
}

export default ToggleSquared;
