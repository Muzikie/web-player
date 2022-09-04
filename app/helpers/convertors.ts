export const secondToMinutes = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);

  return `${mins}:${sec}`;
};
