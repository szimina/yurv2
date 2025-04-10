export type LabelUIProps = {
  header: string;
  buttons: string[];
  startScroll: number;
  endScroll: number;
  translateX?: [string, string] | [string, string, EasingParam];
};

type EasingParam = 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic'; 

