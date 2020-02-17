import { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ScrollToTop extends PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    children: PropTypes.array.isRequired,
  };

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
