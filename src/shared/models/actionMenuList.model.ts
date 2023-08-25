export type ActionMenuListModel = {
  label: string;
  callback: () => void;
  disableCallback?: () => void;
  isDisabled?: boolean;
  tooltipTitle?: string;
  isContainStartIcon?: boolean;
  startIcon?: any;
}[];
