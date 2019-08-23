import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class TopbarMenuLinks extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
    };

    onClick = () => {
        let { onClick } = this.props;
        if(onClick){
            onClick();
        }
    }

    render() {
        const { title, icon, path } = this.props;

        return (
        <Link className="topbar__link" to={path} onClick={() => this.onClick()}>
            <span className={`topbar__link-icon lnr lnr-${icon}`} />
            <p className="topbar__link-title">{title}</p>
        </Link>
        );
    }
}
