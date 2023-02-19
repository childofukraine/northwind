export const getTS = () => {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
};

export const executeQueryTime = (startTime: number, endTime: number) => {
  return `${endTime - startTime}ms`;
};
