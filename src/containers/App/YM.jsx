import React from 'react';
import { YMInitializer } from 'react-yandex-metrika';

const YM = () => (
  <div>
    <YMInitializer accounts={[48874142]} />
  </div>
);

export default YM;
