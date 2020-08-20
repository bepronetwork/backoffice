import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Container, Description, Title, Subtitle } from './styles';

import AnimationNumber from '../../AnimationNumber';

const DataWidget = props => {
  const { variant, title, data, span } = props;
  return (
    <Container className={variant ? variant : 'secondary'}>
      <AnimationNumber decimals={0} number={10000} fontSize={28} />
      <Description>
        <Title>{title}</Title>
        <Subtitle>Weekly</Subtitle>
      </Description>
    </Container>
  );
};

DataWidget.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
  title: PropTypes.string,
  data: PropTypes.number,
  span: PropTypes.string,
};

export default memo(DataWidget);
