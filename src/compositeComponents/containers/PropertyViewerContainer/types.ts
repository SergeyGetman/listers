export type IPropertyViewerContainerItem = {
  label: string;
  value?: string | number;
  gridConfig?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
}[];
