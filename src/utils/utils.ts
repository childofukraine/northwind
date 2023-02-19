import moment from "moment";

export const getTS = () => {
  return `${moment().format("L").replaceAll("/", ".")} ${moment()
    .format()
    .slice(11, 19)}`;
};

export const executeQueryTime = (startTime: number, endTime: number) => {
  return `${endTime - startTime}ms`;
};
