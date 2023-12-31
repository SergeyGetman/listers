import { BaseComponent, IBaseProps } from '../../base';
export interface MbscSwitchOptions extends IBaseProps {
  checked?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
  defaultChecked?: boolean;
  description?: string;
  disabled?: boolean;
  onChange?: any;
  inputStyle?: 'underline' | 'box' | 'outline';
  label?: string;
  position?: 'start' | 'end';
}
/** @hidden */
export interface MbscSwitchState {
  checked?: boolean;
  disabled?: boolean;
  hasFocus?: boolean;
  isActive?: boolean;
  dragging?: boolean;
}
/** @hidden */
export declare class SwitchBase extends BaseComponent<MbscSwitchOptions, MbscSwitchState> {
  static defaults: MbscSwitchOptions;
  protected static _name: string;
  _checked: boolean;
  _cssClass: string;
  _disabled: boolean;
  _input: HTMLInputElement;
  _handle: HTMLSpanElement;
  _handleCont: HTMLSpanElement;
  _handleContClass: string;
  _handleClass: string;
  _handleLeft: number;
  private _unlisten;
  private _inputUnlisten;
  _onChange: (ev: any) => void;
  /**
   * The click events default behavior on labels are to also trigger a change event.
   * We need to disable this behavior because we trigger the change events manually to be consistent.
   *
   * The main reason for this is that on touch devices when there is a drag, there is no click triggered,
   * but when there's only a tap, there's also a click, so that would result in multiple change events
   * that would cancel out each other.
   */
  protected _onLabelClick: (ev: any) => void;
  protected _change(checked: boolean): void;
  /**
   * Sets the handle position
   * @param left The left position of the handle element in percent
   */
  protected _setHandleLeft(left: number): void;
  protected _mounted(): void;
  protected _render(s: MbscSwitchOptions, state: MbscSwitchState): void;
  protected _destroy(): void;
}
