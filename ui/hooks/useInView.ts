import { useEffect, useRef } from 'react';

export const useInView = <T>(cb: () => void, deps: T[] = [], options?: IntersectionObserverInit) => {
  const observedItem = useRef<HTMLDivElement>(null);

  const itemObserverCallback = (
    observedData: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    if (observedData[0].isIntersecting) {
      observer.disconnect();
      cb();
    }
  };

  useEffect(() => {
    if (!observedItem.current) return;
    const itemObserver = new IntersectionObserver(itemObserverCallback, options);
    itemObserver.observe(observedItem.current);

    return () => {
      itemObserver.disconnect();
    };
  }, deps);

  return {
    observedItem,
  };
};
