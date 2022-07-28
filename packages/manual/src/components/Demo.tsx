import React from 'react'

export const Demo = ({ children }) => {
  return (
    <div className="p-32 grid items-center h-full w-full" style={{ border: 'dotted 1px #333 '}}>
      {children}
    </div>
  )
}
