export type LabelUIProps = {
  header: string;
  buttons: string[];
  startScroll: number;
  endScroll: number;
  translateX?: [string, string] | [string, string, EasingParam];
  index: number;
};

type EasingParam = 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic'; 

export type CSSEffect = [string, string, EasingParam];
