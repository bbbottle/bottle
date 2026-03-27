import { SlotName } from 'src/types/slots';
import { useEffect, useState } from 'react';
import { registry } from '../registry';

export const useSlotComp = (slotName: SlotName) => {
  const [components, setComponents] = useState<React.ComponentType<any>[]>([]);

  useEffect(() => {
    const unsubscribe = registry.subscribe(() => {
      const comps = registry.getComponents(slotName);
      setComponents(comps);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return components;
};
