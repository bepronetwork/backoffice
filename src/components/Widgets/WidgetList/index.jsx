import React from 'react';

import { Container } from './styles';

const WidgetList = props => {
  const { children } = props;
  return <Container>{children}</Container>;
};

export default WidgetList;
