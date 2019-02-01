/* eslint-disable react/no-array-index-key,react/no-unused-state */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import EmailListItem from './EmailListItem';
import Pagination from '../../../shared/components/pagination/Pagination';
import EmailsControls from './EmailsControls';
import { EmailsProps } from '../../../shared/prop-types/EmailProps';

export default class InboxTable extends PureComponent {
  static propTypes = {
    emails: EmailsProps.isRequired,
    onLetter: PropTypes.func.isRequired,
  };

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfItems });
  };

  render() {
    const { emails, onLetter } = this.props;

    return (
      <div className="inbox__content">
        <EmailsControls emails={emails} onChangePage={this.onChangePage} />
        <Table className="table--bordered inbox__emails-table" responsive>
          <tbody>
            {emails.slice(1, 15).map((e, i) =>
              <EmailListItem email={e} key={i} onLetter={onLetter} />)}
          </tbody>
        </Table>
        <Pagination items={emails} pageSize={15} onChangePage={this.onChangePage} />
      </div>
    );
  }
}
