import React from 'react';
import { DropImage } from '@bbki.ng/components';
import { Demo } from "@site/src/components/Demo";

export const DropImageDemo = () => (
  <Demo>
    <DropImage
      placeholder={<span className="text-gray-400">drop image here</span>}
      uploader={async () => {
        return false;
      }}
      ghost
    />
  </Demo>
)
