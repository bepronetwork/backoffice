import React from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

const WizardFormTwo = ({ handleSubmit, previousPage }) => (
  <form className="form form--horizontal wizard__form" onSubmit={handleSubmit}>
    <h3 className="wizard__title">What’s your address</h3>
    <ButtonToolbar className="form__button-toolbar wizard__toolbar">
      <Button color="primary" type="button" className="previous" onClick={previousPage}>Back</Button>
      <Button color="primary" type="submit" className="next">Next</Button>
    </ButtonToolbar>
  </form>
);

WizardFormTwo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(WizardFormTwo);
