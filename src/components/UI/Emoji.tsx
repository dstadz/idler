import React, { memo } from 'react'

interface EmojiProps {
  emoji: string
  size?: number
  className?: string
}

const Emoji: React.FC<EmojiProps> = memo(({ emoji, size = 24, className = '' }) => {
  return (
    <span
      className={className}
      style={{
        fontSize: size,
        display: 'inline-block',
        width: size,
        height: size,
        lineHeight: 1,
        textAlign: 'center'
      }}
    >
      {emoji}
    </span>
  )
})

Emoji.displayName = 'Emoji'

export default Emoji
