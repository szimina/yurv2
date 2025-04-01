export interface ButtonUIProps {
  label: string; 
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  href?: string;
  openInNewTab?: boolean;
}