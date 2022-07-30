import React from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly';


export const Demo = ({ children, style }: { style?: any; children: any }) => {
  return (
    <BrowserOnly>
      {() => (
        <div className="p-32 grid items-start h-full w-full font-mono" style={{ border: 'dotted 1px #333 ', ...style}}>
          {children}
        </div>
      )}
    </BrowserOnly>
  )
}
