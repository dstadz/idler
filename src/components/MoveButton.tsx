'use client'
import React from 'react'
import { useUnitDivs } from './canvas/Unit'

const MoveButton = () => {
  const {
    updatePosition
  } = useUnitDivs()
  return (
    <div>MoveButton
      <button onClick={() => updatePosition('unit1')}>Move</button>
    </div>
  )
}

export default MoveButton
