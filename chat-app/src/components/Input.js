import React from 'react'
import attachIcon from '../Assets/attach.png'
import addImage from '../Assets/upload.png'
function Input() {
  return (
    <div className='input'>
      <input type="text"  placeholder='Type something...' autoFocus/>
      <div className="icons">
        <input type="file" id='attach' style={{display:'none'}}/>
        <label htmlFor="attach">
       <img src={attachIcon} alt="attach" width={'25px'}/>
       </label>
       <img src={addImage} alt="add-image" width={'25px'}/>
       <button>send</button>
      </div>
    </div>
  )
}

export default Input
