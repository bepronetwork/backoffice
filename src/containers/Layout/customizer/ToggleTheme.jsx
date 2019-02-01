import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ThemeProps } from '../../../shared/prop-types/ReducerProps';

class ToggleTheme extends PureComponent {
  static propTypes = {
    theme: ThemeProps.isRequired,
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
  };

  render() {
    const { theme, changeToLight, changeToDark } = this.props;

    return (
      <div className="toggle-btn customizer__toggle">
        <input
          className="toggle-btn__input"
          type="checkbox"
          name="theme_toggle"
          checked={theme.className === 'theme-dark'}
          onChange={() => {}}
        />
        <button
          className="toggle-btn__input-label"
          onClick={theme.className === 'theme-dark' ? changeToLight : changeToDark}
        />
        <span>Dark Theme</span>
      </div>
    );
  }
}

export default ToggleTheme;
