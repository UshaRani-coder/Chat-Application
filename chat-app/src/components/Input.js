import React from 'react'
import attachIcon from '../Assets/attach.png'
import addImage from '../Assets/upload.png'
function Input() {
  return (
    <div className='input'>
      <input type="text"  placeholder='Type something...'/>
      <div className="icons">
       <img src={attachIcon} alt="attach" width={'25px'}/>
       <img src={addImage} alt="add-image" width={'25px'}/>
       <button>send</button>
      </div>
    </div>
  )
}

export default Input
