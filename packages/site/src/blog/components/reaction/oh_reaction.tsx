import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { GlobalLoadingContext } from '@/context/global_loading_state_provider';
import { BlinkDot, Button, ButtonType } from '@bbki.ng/components';
import { ShareBtn } from '../share/share-btn';

export const Reaction = (props: { title: string; url: string }) => {
  return (
    <div className="flex items-center">
      <ShareBtn
        shareInfo={{
          title: props.title,
          url: props.url,
        }}
      />
    </div>
  );
};
