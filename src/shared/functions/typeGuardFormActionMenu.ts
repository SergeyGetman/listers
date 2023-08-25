export default function typeGuardFormActionMenu<T>(argument: T | boolean): argument is T {
  return typeof argument !== 'boolean' && argument !== 'undefined';
}
