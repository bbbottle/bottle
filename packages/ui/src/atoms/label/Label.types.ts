import * as LabelPrimitive from '@radix-ui/react-label';
import { LabelVariants } from './Label.variants';

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>, LabelVariants {}
