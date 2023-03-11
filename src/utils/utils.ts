import { v4 as uuid } from "uuid";

export const workerId = `primary-${uuid()}.render.db`;

export const getTS = (): string => {
  return new Date().toISOString();
};

export const calcExecutionTime = (start: number, end: number): number =>
  end - start;
