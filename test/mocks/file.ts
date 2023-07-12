export const mockFile = ({
  name = 'mock.jpg',
  size = 1024, type = 'image/jpg', 
  lastModified = new Date(),
}): File => {
  const fileContent = new Uint8Array(size).fill(0);

  const value = {
    name,
    type,
    lastModified: lastModified.getTime(),
    size: fileContent.length,
    arrayBuffer: () => Promise.resolve(fileContent.buffer),
  } as File;

  return value;
}
