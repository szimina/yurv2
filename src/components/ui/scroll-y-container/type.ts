import { ReactNode, RefObject } from "react";

export type ScrollYContainerProps = {
  height: number;
  // start?: number;
  stop: number;
  children: ReactNode;
  marginTop?: number;
};
