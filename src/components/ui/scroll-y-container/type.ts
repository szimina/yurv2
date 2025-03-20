import { ReactNode } from "react";

export type ScrollYContainerProps = {
  height: number;
  start?: number;
  stop: number;
  children: ReactNode;
};
