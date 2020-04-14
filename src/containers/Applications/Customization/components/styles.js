export const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'start',
      overflow: 'hidden',
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    }
  };