import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import { Collapse } from 'reactstrap';
import DownIcon from 'mdi-react/ChevronDownIcon';
import PropTypes from 'prop-types';

const gb = `${process.env.PUBLIC_URL}/img/language/gb.png`;
const fr = `${process.env.PUBLIC_URL}/img/language/fr.png`;
const de = `${process.env.PUBLIC_URL}/img/language/de.png`;

const GbLng = () => (
  <span className="topbar__language-btn-title">
    <img src={gb} alt="gb" />
    <span>EN</span>
  </span>
);

const FrLng = () => (
  <span className="topbar__language-btn-title">
    <img src={fr} alt="fr" />
    <span>FR</span>
  </span>
);

const DeLng = () => (
  <span className="topbar__language-btn-title">
    <img src={de} alt="de" />
    <span>DE</span>
  </span>
);

class TopbarLanguage extends PureComponent {
  static propTypes = {
    i18n: PropTypes.shape({ changeLanguage: PropTypes.func }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      collapse: false,
      mainButtonContent: <GbLng />,
    };
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  changeLanguage = (lng) => {
    this.props.i18n.changeLanguage(lng);
    switch (lng) {
      case 'en':
        this.setState({ mainButtonContent: <GbLng /> });
        break;
      case 'fr':
        this.setState({ mainButtonContent: <FrLng /> });
        break;
      case 'de':
        this.setState({ mainButtonContent: <DeLng /> });
        break;
      default:
        this.setState({ mainButtonContent: <GbLng /> });
        break;
    }
  };

  render() {
    return (
      <div className="topbar__collapse topbar__collapse--language">
        <button className="topbar__btn" onClick={this.toggle}>
          {this.state.mainButtonContent}
          <DownIcon className="topbar__icon" />
        </button>
        <Collapse
          isOpen={this.state.collapse}
          className="topbar__collapse-content topbar__collapse-content--language"
        >
          <button
            className="topbar__language-btn"
            type="button"
            onClick={() => this.changeLanguage('en')}
          >
            <GbLng />
          </button>
          <button
            className="topbar__language-btn"
            type="button"
            onClick={() => this.changeLanguage('fr')}
          >
            <FrLng />
          </button>
          <button
            className="topbar__language-btn"
            type="button"
            onClick={() => this.changeLanguage('de')}
          >
            <DeLng />
          </button>
        </Collapse>
      </div>
    );
  }
}

export default translate('common')(TopbarLanguage);
