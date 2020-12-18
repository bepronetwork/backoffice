import React from 'react';

import { viewportContext } from 'contexts/viewport';

/**
 * Hook to handle viewport changes
 */
function useViewport() {
  const { width, height } = React.useContext(viewportContext);

  return { width, height };
}

export default useViewport;
