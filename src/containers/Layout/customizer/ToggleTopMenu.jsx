import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CustomizerProps } from '../../../shared/prop-types/ReducerProps';

class ToggleTopMenu extends PureComponent {
  static propTypes = {
    customizer: CustomizerProps.isRequired,
    toggleTopNavigation: PropTypes.func.isRequired,
  };

  render() {
    const { toggleTopNavigation, customizer } = this.props;

    return (
      <div className="toggle-btn customizer__toggle">
        <input
          className="toggle-btn__input"
          type="checkbox"
          name="top_menu_toggle"
          checked={customizer.topNavigation}
          onChange={() => {}}
        />
        <button
          className="toggle-btn__input-label"
          onClick={toggleTopNavigation}
        >Toggle
        </button>
        <span>Top Menu</span>
      </div>
    );
  }
}

export default ToggleTopMenu;
