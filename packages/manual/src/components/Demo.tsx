import React from 'react'

export const Demo = ({ children }) => {
  return (
    <div className="p-32 grid items-start h-full w-full font-mono" style={{ border: 'dotted 1px #333 '}}>
      {children}
    </div>
  )
}
