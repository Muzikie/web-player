export const greet = () => {
  const hours = (new Date()).getHours();
  if (hours > 4 && hours < 12) {
    return 'Good morning';
  }
  if (hours > 12 && hours < 17) {
    return 'Good afternoon';
  }
  return 'Good evening';
};
