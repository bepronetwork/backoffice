import React from 'react';
import PropTypes from 'prop-types';

import CountUp from 'react-countup';

import { Container } from './styles';

const AnimationNumber = ({ number, decimals = 2, fontSize }) => {
  return (
    <CountUp
      start={0}
      end={number}
      duration={3}
      delay={0}
      separator=","
      decimals={6}
      decimal="."
    >
      {({ countUpRef, start }) => (
        <Container fontSize={fontSize} number={number}>
          <span ref={countUpRef} />
        </Container>
      )}
    </CountUp>
  );
};

AnimationNumber.propTypes = {
  number: PropTypes.number.isRequired,
  decimals: PropTypes.number,
  fontSize: PropTypes.number,
};

export default AnimationNumber;
