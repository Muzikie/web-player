export const greet = (timestamp: number) => {
  const hour = new Date(timestamp).getHours();
  if (hour < 12) {
    return 'Good morning';
  }
  if (hour < 17) {
    return 'Good afternoon';
  }
  return 'Good evening';
};
