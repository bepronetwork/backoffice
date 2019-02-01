import React from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import MaskedInput from 'react-text-mask';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

const renderField = ({
  input, placeholder, type, mask,
}) => (
  <MaskedInput {...input} placeholder={placeholder} type={type} mask={mask} />
);

renderField.propTypes = {
  input: PropTypes.shape().isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  mask: PropTypes.func.isRequired,
};

renderField.defaultProps = {
  placeholder: '',
  type: 'text',
};

const all = /[A-Za-z0-9]/;

const MaskExamples = ({ handleSubmit, reset, t }) => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div className="card__title">
          <h5 className="bold-text">{t('forms.mask_form.mask_examples')}</h5>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__form-group">
            <span className="form__form-group-label">Phone <span>(xxx)-xxx-xxxx</span></span>
            <div className="form__form-group-field">
              <Field
                name="phone"
                component={renderField}
                type="text"
                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Phone with code <span>+23 xxx xx xx</span></span>
            <div className="form__form-group-field">
              <Field
                name="phone_code"
                component={renderField}
                type="text"
                mask={['+', '2', '3', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Date <span>dd/mm/yyyy</span></span>
            <div className="form__form-group-field">
              <Field
                name="date"
                component={renderField}
                type="text"
                mask={[/[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Date <span>dd-mm-yyyy</span></span>
            <div className="form__form-group-field">
              <Field
                name="date_another"
                component={renderField}
                type="text"
                mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Currency <span>$xxx,xxx,xxx.xx</span></span>
            <div className="form__form-group-field">
              <Field
                name="currency"
                component={renderField}
                type="text"
                mask={['$', /[1-9]/, /\d/, /\d/, ',', /\d/, /\d/, /\d/, ',', /\d/, /\d/, /\d/, '.', /\d/, /\d/]}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Licence key <span>xxxx-xxxx-xxxx-xxxx</span></span>
            <div className="form__form-group-field">
              <Field
                name="licence"
                component={renderField}
                type="text"
                mask={[all, all, all, all, '-', all, all, all, all, '-', all, all, all, all, '-', all, all, all, all]}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">IP Address <span>xxx.xxx.xxx.xxx</span></span>
            <div className="form__form-group-field">
              <Field
                name="ip"
                component={renderField}
                type="text"
                mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/]}
              />
            </div>
          </div>
          <ButtonToolbar className="form__button-toolbar">
            <Button color="primary" type="submit">Submit</Button>
            <Button type="button" onClick={reset}>
                  Cancel
            </Button>
          </ButtonToolbar>
        </form>
      </CardBody>
    </Card>
  </Col>
);

MaskExamples.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'mask_examples', // a unique identifier for this form
})(translate('common')(MaskExamples));
