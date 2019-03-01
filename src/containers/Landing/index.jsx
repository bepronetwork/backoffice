/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import { Col, Row, Container } from 'reactstrap';
import scrollToComponent from 'react-scroll-to-component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './components/Header';
import { changeThemeToDark, changeThemeToLight } from '../../redux/actions/themeActions';
import { ThemeProps } from '../../shared/prop-types/ReducerProps';
import { Link } from 'react-router-dom';
const back_1 = `${process.env.PUBLIC_URL}/img/landing/back_1.png`;
const back_2 = `${process.env.PUBLIC_URL}/img/landing/back-2.png`;
const logo = `${process.env.PUBLIC_URL}/img/landing/logo.png`;

class Landing extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    theme: ThemeProps.isRequired,
  };

  changeToDark = () => {
    this.props.dispatch(changeThemeToDark());
  };

  changeToLight = () => {
    this.props.dispatch(changeThemeToLight());
  };

  render() {
    const { theme } = this.props;

    return (
      <div className="landing">
        <div className='landing__heading'>
            <img className="landing_1_back" src={back_1} />
            <img className="landing_2_back" src={back_2} />
        </div>

        <div className="landing__menu">
          <Container>
            <Row>
              <Col md={12}>
                <div className="landing__menu-wrap">
                  <p className="landing__menu-logo">
                    <img src={logo} className={'landing__logo'} style={{marginLeft : 20}} alt="" />
                  </p>
                  <nav className="landing__menu-nav">
                    <button onClick={() => scrollToComponent(this.Features, {
                      offset: -50,
                      align: 'top',
                      duration: 1500,
                    })}
                    >
                      Features
                    </button>
                    < button
                      onClick={() => scrollToComponent(this.Demos, { offset: -50, align: 'top', duration: 2000 })}
                    >
                      Integrations
                    </button>
                    <a  href={'https://docs.betprotocol.com'}
                            target={'__blank'}>
                        <button
                           
                        
                        >
                        Docs <span className="landing__menu-nav-new" />
                    </button>
                        </a>
                    <Link
                      className={'landing__signin'}
                      to={'/login'}
                    >
                      Sign In
                    </Link>
                  </nav>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Header onClick={() => scrollToComponent(this.Demos, { offset: -50, align: 'top', duration: 2000 })} />
        <span ref={(section) => {
          this.About = section;
        }}
        />
      </div>
    );
  }
}

export default connect(state => ({ theme: state.theme }))(Landing);
