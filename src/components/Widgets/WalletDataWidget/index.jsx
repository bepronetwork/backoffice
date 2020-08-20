import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Container, Icon, Data, Title, Amount } from './styles';
import { WalletWhite } from '../../Icons';

import AnimationNumber from '../../AnimationNumber';

const WalletDataWidget = props => {
  const { title, data, span } = props;
  return (
    <Container>
      <Icon>
        <WalletWhite />
      </Icon>
      <Data>
        <Amount>
          <AnimationNumber decimals={0} number={100} fontSize={30} />
          <span>ETH</span>
        </Amount>
        <Title>{title}</Title>
      </Data>
    </Container>
  );
};

WalletDataWidget.propTypes = {
  title: PropTypes.string,
  data: PropTypes.number,
  span: PropTypes.string,
};

export default memo(WalletDataWidget);
