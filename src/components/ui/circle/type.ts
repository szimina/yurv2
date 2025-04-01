import { CSSEffect } from "parallax-controller";

type EasingParam = 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeIn';

export type CircleUIProps = {
  index: number;
  text: string;
  size: number;
  top?: number;
  left?: number;
  translateX?: [string, string] | [string, string, EasingParam];
  translateY?: [string, string] | [string, string, EasingParam];
  startScroll?: number;
  endScroll?: number;
  style?: React.CSSProperties;
};