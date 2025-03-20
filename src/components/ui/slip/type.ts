export type SlipUIProps = {
  header: string;
  buttons: string[];
  startScroll: number;
  endScroll: number;
  index: number;
};

type EasingParam = 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic'; 

export type CSSEffect = [string, string, EasingParam];


