import React from 'react'
import EmojiPicker from 'emoji-picker-react'

function EmojiPickerComponent({ onEmojiClick }) {
  return (
    <div className="emoji-picker">
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </div>
  )
}

export default EmojiPickerComponent
