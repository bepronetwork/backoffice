import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';

const NavigationBottom = ({
  prevLink, prevTitle, nextLink, nextTitle,
}) => (
  <div className="documentation__nav-bottom">
    <div className="documentation__nav-bottom-left">
      {prevLink ?
        <Link to={prevLink}><ChevronLeftIcon /><p>{prevTitle}</p></Link> : ''}
    </div>
    <div className="documentation__nav-bottom-right">
      {nextLink ?
        <Link to={nextLink}><p>{nextTitle}</p><ChevronRightIcon /></Link> : ''}
    </div>
  </div>
);

NavigationBottom.propTypes = {
  prevLink: PropTypes.string,
  prevTitle: PropTypes.string,
  nextLink: PropTypes.string,
  nextTitle: PropTypes.string,
};

NavigationBottom.defaultProps = {
  prevLink: '',
  prevTitle: '',
  nextLink: '',
  nextTitle: '',
};

export default NavigationBottom;
