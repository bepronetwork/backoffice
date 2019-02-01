import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SidebarProps } from '../../../shared/prop-types/ReducerProps';

class ToggleCollapsedMenu extends PureComponent {
  static propTypes = {
    sidebar: SidebarProps.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
  };

  render() {
    const { changeSidebarVisibility, sidebar } = this.props;

    return (
      <div className="toggle-btn customizer__toggle">
        <input
          className="toggle-btn__input"
          type="checkbox"
          name="collapse_toggle"
          checked={sidebar.collapse}
          onChange={() => {}}
        />
        <button
          className="toggle-btn__input-label"
          onClick={changeSidebarVisibility}
        >Toggle
        </button>
        <span>Collapsed Menu</span>
      </div>
    );
  }
}

export default ToggleCollapsedMenu;
