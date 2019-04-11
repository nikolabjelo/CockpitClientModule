export const typeFullName = (input) => {
  switch (input) {
    case 'M':
      return 'Market';
    case 'L':
      return 'Limit';
    default:
      return 'Stop';
  }
};

export const statusFullName = (input) => {
  switch (input) {
    case 'SIG':
      return 'Signaled';
    case 'MAU':
      return 'Manual Authorized';
    case 'MNA':
      return 'Manual Not Authorized';
    case 'AAU':
      return 'Auto Authorized';
    case 'ANA':
      return 'Auto Not Authorized';
    case 'EXE':
      return 'Executing';
    case 'CAN':
      return 'Cancelled';
    case 'FIL':
      return 'Filled';
    case 'PRT':
      return 'Partially Filled';
    case 'DIS':
      return 'Discarded';
    case 'PLA':
      return 'Placed';
    default:
      return 'Unknown status';
  }
};
