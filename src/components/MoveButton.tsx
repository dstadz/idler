'use client'
import React from 'react'
import { useUnits } from './canvas/Unit'

const MoveButton = () => {
  const {
    updatePosition
  } = useUnits()
  return (
    <div>MoveButton
      <button onClick={() => updatePosition('unit1')}>Move</button>
    </div>
  )
}

export default MoveButton
