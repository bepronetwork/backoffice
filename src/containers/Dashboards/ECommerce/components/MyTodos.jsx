import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Panel from '../../../../shared/components/Panel';
import ToDo from './ToDo';

const MyTodos = ({ t }) => (
  <Panel
    md={12}
    lg={5}
    xl={3}
    xs={12}
    title={t('dashboard_commerce.my_todos')}
    subhead="Do not forget to do everything"
  >
    <ToDo id="1" label="Call to Margaret and tell about EasyDEV" checked />
    <ToDo id="2" label="Prepare docs for boss" />
    <ToDo id="3" label="Calculate the company budget" checked />
    <ToDo id="4" label="Find a manager" />
    <ToDo id="5" label="Call to Sarah" />
    <ToDo id="6" label="Make a sandwich" />
    <ToDo id="7" label="Drink a coffee" />
    <ToDo id="8" label="Walk with my dog" />
    <ToDo id="9" label="Buy some milk, bread and a new car" />
  </Panel>
);

MyTodos.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(MyTodos);
