import React, { PureComponent } from 'react';
import SearchIcon from 'mdi-react/SearchIcon';
import classNames from 'classnames';

export default class TopbarSearch extends PureComponent {
  constructor() {
    super();
    this.state = { inputOpen: false };
  }

  onInputOpen = (e) => {
    e.preventDefault();
    this.setState({ inputOpen: !this.state.inputOpen });
  };

  render() {
    const searchClass = classNames({
      'topbar__search-field': true,
      'topbar__search-field--open': this.state.inputOpen,
    });

    return (
      <form className="topbar__search">
        <input className={searchClass} />
        <button className="topbar__btn topbar__search-btn" onClick={this.onInputOpen}>
          <SearchIcon />
        </button>
      </form>
    );
  }
}
