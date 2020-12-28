import React from 'react';

import { ViewportContext } from 'contexts/viewport';

/**
 * Hook to handle viewport changes
 * @returns {(number|number)} width and height of viewport
 */
function useViewport() {
  const { width, height } = React.useContext(ViewportContext);

  return { width, height };
}

export default useViewport;
