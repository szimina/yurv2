type EasingParam = 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic'; 

export type CircleUIProps = {
  index: number;
  text: string;
  size: number;
  top?: number;
  left?: number;
  translateX?: [string, string, EasingParam]
  translateY?: [string, string, EasingParam]
  startScroll?: number;
  endScroll?: number
};
