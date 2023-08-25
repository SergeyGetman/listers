import { ComponentType } from 'react';

const NUMBER_OF_ATTEMPTS = 5;
const RETRY_TIMEOUT = 1.5 * 1000;

export const componentLoader = (
  lazyComponent: () => any,
  attemptsLeft = NUMBER_OF_ATTEMPTS,
  retryTimeout = RETRY_TIMEOUT,
) => {
  return new Promise<{ default: ComponentType<any> }>((resolve, reject) => {
    lazyComponent()
      .then(resolve)
      .catch((error: any) => {
        setTimeout(() => {
          if (attemptsLeft === 1) {
            reject(error);
            return;
          }
          componentLoader(lazyComponent, attemptsLeft - 1).then(resolve, reject);
        }, retryTimeout);
      });
  });
};
