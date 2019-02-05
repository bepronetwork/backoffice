import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import Panel from '../../../shared/components/Panel';

const DepositsWidget = ({ t }) => (
  <Panel
    xl={12}
    lg={12}
    md={12}
    xs={12}
    title={'Platforms Currency'}
    subhead="Deposits & Withdrawals"
  >
    <Table responsive striped>
      <thead>
        <tr>
          <th>Currency</th>
          <th>Deposits</th>
          <th>Withdrawals</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><p className="bold-text dashboard__btc">EUR</p></td>
          <td>20,00€</td>
          <td>345€</td>
        </tr>
        <tr>
          <td><p className="bold-text dashboard__btc">ETH</p></td>
          <td>15,00€</td>
          <td>0€</td>
        </tr>
      </tbody>
    </Table>
  </Panel>
);

DepositsWidget.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(DepositsWidget);
