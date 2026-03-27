import React from 'react';
import { SlotName } from 'src/types/slots';
import { useSlotComp } from '../hooks/useSlotComp';

export interface ISlotProps {
  name: SlotName;
  data?: any;
}

export const Slot: React.FC<ISlotProps> = ({ name, data }) => {
  const components = useSlotComp(name);

  return (
    <>
      {components.map((Component, index) => (
        <Component key={index} {...data} />
      ))}
    </>
  );
};
