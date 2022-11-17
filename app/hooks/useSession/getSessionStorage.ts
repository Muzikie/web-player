export const getSessionStorage = () => {
  if (typeof document === 'undefined') {
    return {
      getItem: (key: string) => {
        console.log(key);
        return null;
      },
      removeItem: (key: string): void => {
        console.log(key);
      },
      setItem: <T>(key: string, value: T): void => {
        console.log(key, value);
      },
    };
  }
  return sessionStorage;
};
