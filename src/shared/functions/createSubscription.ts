export interface Subscription {
  unsubscribe(f: Function): void;
  subscribe(f: Function): void;
  emit(payload: any): void;
}

const createSubscription = () => {
  const subscribers: Set<Function> = new Set();

  const unsubscribe: Subscription['unsubscribe'] = (f) => {
    try {
      subscribers.delete(f);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Unable to delete subscriber`, error);
    }
  };

  const subscribe: Subscription['subscribe'] = (f) => {
    try {
      subscribers.add(f);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Unable to add subscriber`, error);
    }

    return () => unsubscribe(f);
  };

  const emit: Subscription['emit'] = (payload) => {
    subscribers.forEach((f) => {
      try {
        f(payload);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`Unable to activate subscriber`, error);
      }
    });
  };

  return { unsubscribe, subscribe, emit };
};

export default createSubscription;
