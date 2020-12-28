import React from 'react';

import styles from './loading.module.scss';

import loading from './assets/loading.gif';

/**
 * BetProtocol loading GIF
 */
export default function Loading() {
  return (
    <div className={styles.container}>
      <img className={styles.icon} src={loading} alt="loading" />
    </div>
  );
}
