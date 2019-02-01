/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import NewOrderEditForm from './components/NewOrderEditForm';
import { changeNewOrderTableData, loadNewOrderTableData } from '../../../redux/actions/newOrderTableActions';

class ECommerceDashboardEdit extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(loadNewOrderTableData(this.props.match.params.index));
  }

  handleSubmit = (formValues) => {
    this.props.dispatch(changeNewOrderTableData(formValues, this.props.match.params.index));
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/dashboard_e_commerce" />;
    }

    return (
      <Container className="dashboard">
        <Row>
          <NewOrderEditForm onSubmit={this.handleSubmit} />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  newOrder: state.newOrder,
});

export default connect(mapStateToProps)(ECommerceDashboardEdit);
