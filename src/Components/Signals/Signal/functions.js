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
