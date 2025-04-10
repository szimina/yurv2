type EasingParam = 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeIn';

export type PapkaUIProps = {
  text: string;
  size: number;
  top?: number;
  left?: number;
  zIndex?: number;
  translateY?: [string, string] | [string, string, EasingParam];
  startScroll?: number;
  endScroll?: number;
  style?: React.CSSProperties;
};