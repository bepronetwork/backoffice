/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import { Col, Row, Container } from 'reactstrap';
import scrollToComponent from 'react-scroll-to-component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Features from './components/Features';
import Footer from './components/Footer';
import { changeThemeToDark, changeThemeToLight } from '../../redux/actions/themeActions';
import { ThemeProps } from '../../shared/prop-types/ReducerProps';
import { Link } from 'react-router-dom';
import Customer from './components/Customer';
import Pricing from './components/Pricing';
import NewsLetter from './components/NewsLetter';
import BlogPosts from './components/BlogPosts'
import Products from './components/Products';
import Team from './components/Team';
const back_1 = `${process.env.PUBLIC_URL}/img/landing/back_1.png`;
const back_2 = `${process.env.PUBLIC_URL}/img/landing/back-2.png`;
const logo = `${process.env.PUBLIC_URL}/img/landing/logo.png`;

class TeamLanding extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        theme: ThemeProps.isRequired,
    };
    constructor(props){
        super(props);
        this.state = {};
    }

    changeToDark = () => {
        this.props.dispatch(changeThemeToDark());
    };

    changeToLight = () => {
        this.props.dispatch(changeThemeToLight());
    };

    changeComponent = (key, value) => {
        this.setState({...this.state, [key] : value})
    }

    render() {
        const { theme } = this.props;

        return (
        <div className="landing">
            <div className='landing__heading'>
                <img className="landing_1_back" src={back_1} />
            </div>

            <div className="landing__menu">
            <Container>
                <Row>
                <Col md={12}>
                    <div className="landing__menu-wrap">
                    <p className="landing__menu-logo">
                        <Link to={'/'}>
                            <img src={logo} className={'landing__logo'} style={{marginLeft : 20}} alt="" />
                        </Link>
                    </p>
                    <nav className="landing__menu-nav">
                        {/* <a href={'https://token.betprotocol.com'} target={'__blank'}
                        >
                            <button>
                                BPRO Token
                            </button>
                        </a>
                        */}
                        <Link  to={'/about-us'}
                        >
                            <button>
                                Team
                            </button>
                        </Link>
                        <a href={'https://medium.com/@betprotocol'} target={'__blank'}
                        >
                        <button>
                            Blog
                        </button>
                        </a>
                    
                        <a  href={'https://docs.betprotocol.com'}
                                target={'__blank'}>
                            <button  
                            >
                            API <span className="landing__menu-nav-new" />
                        </button>
                            </a>
                        {/* <Link
                        className={'landing__signin'}
                        to={'/login'}
                        >
                        Sign In
                        </Link> */}
                    </nav>
                    </div>
                </Col>
                </Row>
            </Container>
            </div>
            <Team/>
            {/* <BlogPosts/> */}
            <NewsLetter/>
            <Footer/>
        </div>
        );
    }
}

export default connect(state => ({ theme: state.theme }))(TeamLanding);