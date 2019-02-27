import React, { PureComponent } from 'react';
import { Col, Card, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import WizardFormOne from './WizardFormOne';
import WizardFormThree from './WizardFormThree';

export default class WizardForm extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      page: 1,
    };
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;

    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <div className="wizard">
              <div className="wizard__form-wrapper">
                {page === 1 && <WizardFormOne handleSubmit={(e) => e.preventDefault()} {...this.props} onSubmit={false}  />}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

