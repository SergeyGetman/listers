import { BaseComponent, IBaseProps } from '../../base';
export interface MbscListOptions extends IBaseProps {
  theme?: string;
}
/** @hidden */
export declare class ListBase extends BaseComponent<MbscListOptions, {}> {
  _cssClass: string;
  protected _render(s: MbscListOptions): void;
}
