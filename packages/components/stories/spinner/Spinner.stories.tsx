import React from 'react';

import { Spinner, SpinnerProps } from '@bbki.ng/components';

export default {
  title: 'Spinner',
  component: Spinner,
  argTypes: {
    width: {
      defaultValue: 2,
    },
    color: {
      defaultValue: '#D1D5DB',
    },
  },
};

export const Default = (props: SpinnerProps) => (
  <Spinner {...props} pathClassName="stroke-gray-200" />
);
