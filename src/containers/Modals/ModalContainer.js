import React from "react";
import { Col, Row } from 'reactstrap';
import PropTypes from "prop-types";
import { CloseIcon } from 'mdi-react';
import _ from 'lodash';

class ModalContainer extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        onClose: PropTypes.func.isRequired
    };

    componentDidMount() {
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.width = `calc(100%)`;
    }

    componentWillUnmount() {
        document.documentElement.style.overflow = null;
        document.documentElement.style.width = null;
    }

    handleOutsideClick = event => {
        const { onClose } = this.props;
        event.stopPropagation();
        if (onClose) onClose();
    };

    handleContentClick = event => {
        event.stopPropagation();
    };

    render() {
        const { children, title, height, width } = this.props;

        return (
            <div>
                <div
                    role="presentation"
                    className="modal-root"
                    id="background"
                    onClick={this.handleOutsideClick}
                />
                <div
                    role="presentation"
                    className="modal-root-relative"
                    id="background"
                    onClick={this.handleOutsideClick}
                >
                    <div
                    role="presentation"
                    className="modal-content"
                    style={{height : !_.isEmpty(height) ? Number(height) : null, width : !_.isEmpty(width) ? Number(width) : null}}
                    onClick={this.handleContentClick}
                    >
                        <div className="flex-container">
                            <dvi style={{flexGrow: 7}}>
                                <p className="dashboard__visitors-chart-title text-left" style={{fontSize : 18, marginBottom : 10}}> {title} </p>
                                <hr></hr>
                            </dvi>
                            <dvi style={{flexGrow: 3}}>
                                <button
                                className="button-hover modal-icon"
                                onClick={this.handleOutsideClick}
                                type="button"
                            >
                                <CloseIcon/>
                                </button>
                            </dvi>
                        </div>
                
                    {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalContainer;
